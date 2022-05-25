<template>
  <BaseContainer>
    <div class="categories">
      <CategoriesControlPanel
        :search="search"
        @updateSearch="handleSearchChanges"
        @updateFormStatus="handleFormIsClosedChanges"
      />
      <div class="categories__content">
        <div class="categories__table">Table</div>
        <div class="categories__edit-form">Edit Form</div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import FirebaseService from "@/services/FirebaseService";
import BaseContainer from "@/components/base/BaseContainer.vue";
import CategoriesControlPanel from "@/components/tabs/controlPanels/CategoriesControlPanel.vue";

// ! Init: Refs & Handlers

const search = ref("");

const handleSearchChanges = (newValue) => {
  search.value = newValue;
};

const formIsClosed = ref("none");

const handleFormIsClosedChanges = () => {
  if (formIsClosed.value === "none") {
    formIsClosed.value = "block";
  }
};

// const categoryName = ref("");
// const loading = ref(false);
// const categories = ref([]);
// const selectedCategory = ref("Основная");
// const isFormatting = ref(false);
// const selectedObject = ref({});

// ! Init: Router

// создание роутера
const router = useRouter();

// ! Block: Auth

// проверка авторизации
const authListener = FirebaseService.checkAuthStateChanged(function (user) {
  if (!user) {
    router.push("/");
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

  &__content {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #ccc;
  }

  &__table {
    width: 100%;
  }
}
</style>
