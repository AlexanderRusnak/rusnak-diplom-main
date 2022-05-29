<template>
  <BaseContainer>
    <div class="positions">
      <PositionsControlPanel
        :search="search"
        @updateSearch="handleSearchChanges"
        @updateModalStatus="handleModalOpen"
      />
      <PositionsTable
        class="positions__table"
        :positions="positions"
        :search="search"
        @row-clicked="handleRowClicked"
      />
      <PositionsModal
        :is-modal-shown="isModalShown"
        :is-formatting="isFormatting"
        :selected-object="selectedObject"
        :categories="categories"
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
import PositionsControlPanel from "@/components/tabs/controlPanels/PositionsControlPanel.vue";
import PositionsTable from "@/components/tabs/tables/PositionsTable.vue";
import PositionsModal from "@/components/tabs/modals/PositionsModal.vue";

// ! Init: Refs & Handlers
const positions = ref([]);
const categories = ref([]);

onMounted(() => {
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
  FirebaseService.positions().off();
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

<style lang="scss" scoped>
.positions {
  display: flex;
  flex-direction: column;

  &__table {
    border-top: 1px solid #ccc;

    padding-top: 8px;
    width: 100%;
  }
}
</style>
