<template>
  <BaseContainer>
    <div class="positions">
      <OrdersControlPanel
        :search="search"
        :order-status-filter="orderStatusFilter"
        :order-waiter-filter="orderWaiterFilter"
        :waiters="waiters"
        @updateOrderStatusFilter="handleOrderStatusFilterChanges"
        @updateOrderWaiterFilter="handleOrderWaiterFilterChanges"
        @updateSearch="handleSearchChanges"
        @updateModalStatus="handleModalOpen"
      />
      <OrdersTable
        class="positions__table"
        :orders="orders"
        :positions="positions"
        :search="search"
        :order-status-filter="orderStatusFilter"
        @row-clicked="handleRowClicked"
      />
      <OrdersModal
        :is-modal-shown="isModalShown"
        :is-formatting="isFormatting"
        :selected-object="selectedObject"
        :waiters="waiters"
        @modal-closed="handleModalClose"
      />
    </div>
  </BaseContainer>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import FirebaseService from "@/services/FirebaseService";
import BaseContainer from "@/components/base/BaseContainer.vue";
import OrdersControlPanel from "@/components/tabs/controlPanels/OrdersControlPanel.vue";
import OrdersTable from "@/components/tabs/tables/OrdersTable.vue";
import OrdersModal from "@/components/tabs/modals/OrdersModal.vue";

// ! Init: Refs & Handlers
const orders = ref([]);
const positions = ref([]);
const waiters = ref([]);

onMounted(() => {
  FirebaseService.orders().on("value", (snapshot) => {
    const ordersObject = snapshot.val();

    let ordersList = [];

    if (ordersObject) {
      ordersList = Object.keys(ordersObject).map((key) => ({
        ...ordersObject[key],
      }));
    }

    positions.value = ordersList;
  });

  FirebaseService.positions().on("value", (snapshot) => {
    const positionsObject = snapshot.val();

    let positionsList = [];

    if (positionsObject) {
      positionsList = Object.keys(positionsObject).map((key) => ({
        ...positionsObject[key],
      }));
    }

    positions.value = positionsList;
  });

  FirebaseService.waiters().on("value", (snapshot) => {
    const waitersObject = snapshot.val();

    let waitersList = [];

    if (waitersObject) {
      waitersList = Object.keys(waitersObject).map((key) => ({
        ...waitersObject[key],
      }));
    }

    waiters.value = waitersList;
  });
});

onUnmounted(() => {
  FirebaseService.orders().off();
  FirebaseService.positions().off();
  FirebaseService.waiters().off();
});

const isFormatting = ref(false);

const search = ref("");

const handleSearchChanges = (newValue) => {
  search.value = newValue;
};

const orderStatusFilter = ref("Все заказы");

const handleOrderStatusFilterChanges = (newValue) => {
  orderStatusFilter.value = newValue;
};

const orderWaiterFilter = ref("Все официанты");

const handleOrderWaiterFilterChanges = (newValue) => {
  orderWaiterFilter.value = newValue;
};

const isModalShown = ref(false);

const handleModalOpen = () => {
  isModalShown.value = true;
};

const handleModalClose = () => {
  isModalShown.value = false;
  isFormatting.value = false;
  selectedObject.value = null;
};

const selectedObject = ref(null);

const handleRowClicked = (rowData) => {
  selectedObject.value = rowData;
  isModalShown.value = true;
  isFormatting.value = true;
};

// ! Auth Check

const router = useRouter();
const authListener = FirebaseService.checkAuthStateChanged(function (user) {
  if (!user) {
    router.push("/sign-in");
  }
});
onBeforeUnmount(() => {
  authListener();
});
</script>

<style lang="scss" scoped></style>
