<template>
  <BaseContainer>
    <div class="categories">
      <CategoriesControlPanel
        :search="search"
        @updateSearch="handleSearchChanges"
        @updateModalStatus="handleModalOpen"
      />
      <CategoriesTable
        class="categories__table"
        :categories="categories"
        :search="search"
        @row-clicked="handleRowClicked"
      />
      <CategoriesModal
        :is-modal-shown="isModalShown"
        :is-formatting="isFormatting"
        :selected-object="selectedObject"
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
import CategoriesControlPanel from "@/components/tabs/controlPanels/CategoriesControlPanel.vue";
import CategoriesTable from "@/components/tabs/tables/CategoriesTable.vue";
import CategoriesModal from "@/components/tabs/modals/CategoriesModal.vue";

// ! Init: Refs & Handlers
const categories = ref([]);

onMounted(() => {
  FirebaseService.categories().on("value", (snapshot) => {
    const categoriesObject = snapshot.val();

    let categoriesList = [];

    if (categoriesObject) {
      categoriesList = Object.keys(categoriesObject).map((key) => ({
        ...categoriesObject[key],
      }));
    }

    categories.value = categoriesList;
  });
});

onUnmounted(() => {
  FirebaseService.categories().off();
});

const isFormatting = ref(false);

const search = ref("");

const handleSearchChanges = (newValue) => {
  search.value = newValue;
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

// ! Init: Router

// создание роутера
const router = useRouter();

// ! Block: Auth

// проверка авторизации
const authListener = FirebaseService.checkAuthStateChanged(function (user) {
  if (!user) {
    router.push("/sign-in");
  }
});

// вызов проверки авторизации
onBeforeUnmount(() => {
  authListener();
});
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;

  &__table {
    border-top: 1px solid #ccc;

    padding-top: 8px;
    width: 100%;
  }
}
</style>
