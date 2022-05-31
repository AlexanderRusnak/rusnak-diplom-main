<template>
  <div>
    <BaseModal
      @modal-closed="handleModalClose"
      :is-modal-shown="props.isModalShown"
    >
      <span class="modal__title">Редактор</span>
      <div class="modal__content">
        <div class="modal__input-container">
          <BaseInput
            title="Стол"
            :disabled="
              props.selectedObject !== undefined &&
              props.selectedObject?.status == 'Закрытый'
            "
            v-model="form.orderTable.value"
            placeholder="Название/номер стола"
            type="text"
            :isOpened="false"
            :class="{
              modal__input: true,
              invalid: !form.orderTable.valid && form.orderTable.touched,
            }"
            @blur="form.orderTable.blur"
          />

          <BaseInputError
            v-if="form.orderTable.touched && form.orderTable.errors.required"
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>

        <div class="modal__input-container">
          <BaseInput
            title="Количество гостей"
            :disabled="
              props.selectedObject !== undefined &&
              props.selectedObject?.status == 'Закрытый'
            "
            v-model="form.orderGuestsNumber.value"
            placeholder="Количество гостей"
            type="text"
            :isOpened="false"
            :class="{
              modal__input: true,
              invalid:
                !form.orderGuestsNumber.valid && form.orderGuestsNumber.touched,
            }"
            @blur="form.orderGuestsNumber.blur"
          />

          <BaseInputError
            v-if="
              form.orderGuestsNumber.touched &&
              form.orderGuestsNumber.errors.required
            "
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>

        <div class="modal__input-container">
          <div class="modal__select-label">
            <div>Официант:</div>
            <BaseSelect
              v-model="form.orderWaiter.value"
              :class="{
                modal__select: true,
                invalid: !form.orderWaiter.valid && form.orderWaiter.touched,
              }"
              :disabled="
                props.selectedObject !== undefined &&
                props.selectedObject?.status == 'Закрытый'
              "
              @blur="form.orderWaiter.blur"
            >
              <option v-for="waiter in props.waiters" :key="waiter.id">
                {{ waiter.name }}
              </option>
            </BaseSelect>
          </div>

          <BaseInputError
            v-if="form.orderWaiter.touched && form.orderWaiter.errors.required"
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>

        <!-- TODO -->
        <OrderContentMaker
          @content-item-add="handleContentItemAddition"
          @content-position-delete="handleContentItemDeletion"
          @content-position-changed="handleContentPositionChanges"
          @content-amount-changed="handleContentAmountChanges"
          :order-content="orderContent"
          :positions="props.positions"
          :selected-object="selectedObject"
        />

        <div class="modal__checkbox-container">
          <input
            v-if="
              props.selectedObject !== undefined &&
              props.selectedObject?.status !== 'Закрытый'
            "
            type="checkbox"
            v-model="isStatusClosed"
          />
          <div
            v-if="
              props.selectedObject !== undefined &&
              props.selectedObject?.status !== 'Закрытый'
            "
            class="modal__checkbox-text"
          >
            Изменить статус заказа на закрытый
          </div>
        </div>

        <div class="modal__buttons">
          <BaseButton
            v-if="
              props.selectedObject !== undefined &&
              props.selectedObject?.status !== 'Закрытый'
            "
            @click="submitForm"
            :class="{
              modal__button: true,
              button_disabled: !form.valid || !isContentValid,
            }"
            :isWhite="false"
            :size="'large'"
            :disabled="!form.valid || !isContentValid"
          >
            сохранить
          </BaseButton>

          <BaseButton
            @click="handleModalClose"
            class="modal__button"
            :isWhite="true"
            :size="'large'"
          >
            {{
              props.selectedObject !== undefined &&
              props.selectedObject?.status == "Закрытый"
                ? "закрыть"
                : "отменить"
            }}
          </BaseButton>
        </div>
        <div
          :hidden="!props.isFormatting"
          @click="deleteOrder"
          class="modal__delete"
          v-if="
            props.selectedObject !== undefined &&
            props.selectedObject?.status == 'Закрытый'
          "
        >
          удалить заказ
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { useForm } from "@/use/form";
import FirebaseService from "@/services/FirebaseService";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputError from "@/components/base/BaseInputError.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import OrderContentMaker from "@/components/tabs/contentMakers/OrderContentMaker.vue";

const props = defineProps([
  "isModalShown",
  "isFormatting",
  "selectedObject",
  "waiters",
  "positions",
]);

const emit = defineEmits(["modal-closed"]);

const handleModalClose = () => {
  cleanForm();

  emit("modal-closed");
};

// содержимое заказа
const orderContent = ref([{ id: 1, position: "", amount: 0, sum: 0 }]);

const orderContentIDCounter = ref(1);

if (props.selectedObject) {
  orderContentIDCounter.value = ref(props.selectedObject.content.length);
}

const handleContentItemAddition = () => {
  orderContentIDCounter.value += 1;

  orderContent.value = [
    ...orderContent.value,
    {
      id: orderContentIDCounter.value,
      position: "",
      amount: 0,
      sum: 0,
    },
  ];
};

const handleContentItemDeletion = (deletedItemID) => {
  if (orderContent.value.length > 1) {
    orderContent.value = orderContent.value.filter((item) => {
      return item.id !== deletedItemID;
    });
  }
};

const handleContentPositionChanges = (changedPositionID, newPosition) => {
  orderContent.value.map((item) => {
    if (item.id == changedPositionID) {
      item.position = newPosition;
      return item;
    } else {
      return item;
    }
  });
};

const handleContentAmountChanges = (changedPositionID, newAmount) => {
  orderContent.value.map((item) => {
    if (item.id == changedPositionID) {
      item.amount = newAmount;
      return item;
    } else {
      return item;
    }
  });
};

// валидация содержимого заказа
const isContentValid = computed(() => {
  let isAdditionValid = true;

  // валидация всех позиций в заказе
  orderContent.value.forEach((item) => {
    if (!item.position || item.amount <= 0) {
      isAdditionValid = false;
    }
  });

  return isAdditionValid;
});

// валидаторы
const required = (value) => !!value;

// использование хука useForm для передачи
// хуку useField в дальнейшем и валидации полей
const form = useForm({
  orderTable: {
    value: "",
    validators: { required },
  },
  orderGuestsNumber: {
    value: "",
    validators: { required },
  },
  orderWaiter: {
    value: "",
    validators: { required },
  },
});

const isStatusClosed = ref(false);

//очистка формы
const cleanForm = () => {
  for (let prop in form) {
    if (form[prop].value !== undefined) {
      form[prop].value = "";
      form[prop].touched = false;
    }
  }

  orderContent.value = [{ id: 1, position: "", amount: 0, sum: 0 }];
  isStatusClosed.value = false;
};

const submitForm = () => {
  if (!props.isFormatting) {
    console.log("Создание заказа");

    let totalSum = 0;

    orderContent.value.map((item) => {
      totalSum +=
        props?.positions?.find((posItem) => {
          return posItem?.name == item?.position;
        })?.price * item?.amount;
    });

    console.log(totalSum);

    let statusAlias = isStatusClosed.value == true ? "Закрытый" : "Открытый";

    let order = {
      id: new Date().getTime().toString(),
      table: form.orderTable.value,
      guestsNumber: form.orderGuestsNumber.value,
      waiter: form.orderWaiter.value,
      content: orderContent.value,
      status: statusAlias,
      sum: totalSum,
    };

    FirebaseService.order(order.id).set(order);
  } else {
    console.log("Редактирование заказа");

    let changedOrder = {};

    Object.assign(changedOrder, props.selectedObject);

    let totalSum = 0;

    orderContent.value.map((item) => {
      totalSum +=
        props?.positions?.find((posItem) => {
          return posItem?.name == item?.position;
        })?.price * item?.amount;
    });

    let statusAlias = isStatusClosed.value == true ? "Закрытый" : "Открытый";

    if (changedOrder.status == "Закрытый") {
      statusAlias = "Закрытый";
    }

    changedOrder.table = form.orderTable.value;
    changedOrder.guestsNumber = form.orderGuestsNumber.value;
    changedOrder.waiter = form.orderWaiter.value;
    changedOrder.content = orderContent.value;
    changedOrder.status = statusAlias;
    changedOrder.sum = totalSum;

    FirebaseService.order(`${changedOrder.id}`).set(changedOrder);
  }

  handleModalClose();
};

const deleteOrder = () => {
  FirebaseService.order(`${props.selectedObject.id}`).remove();

  handleModalClose();
};

watch(
  () => props.selectedObject,
  () => {
    if (props.selectedObject !== null) {
      form.orderTable.value = props.selectedObject.table;
      form.orderGuestsNumber.value = props.selectedObject.guestsNumber;
      form.orderWaiter.value = props.selectedObject.waiter;
      orderContent.value = props.selectedObject.content;
    }
  }
);
</script>

<style lang="scss" scoped>
.modal {
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  &__content {
    margin-top: 30px;
    overflow-y: auto;
  }

  &__input {
    width: 404px;
    height: 31px;
    padding: 0px 10px;

    &-container {
      margin-top: 15px;
      text-align: center;

      &:first-child {
        margin-top: 0px;
      }
    }
  }

  &__select {
    width: 280px;

    &-label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__checkbox {
    &-container {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    &-text {
      margin-left: 10px;
    }
  }

  &__buttons {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__button {
    &:last-child {
      margin-top: 10px;
    }
  }

  &__delete {
    margin-top: 30px;
    text-align: center;
    cursor: pointer;
  }
}

.button_disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
}

.invalid {
  border-bottom: 2px solid red;
  outline: none;
}
</style>
