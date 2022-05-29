<template>
  <BaseContainer>
    <div class="waiters">
      <WaitersControlPanel
        :search="search"
        @updateSearch="handleSearchChanges"
        @updateModalStatus="handleModalOpen"
      />
      <WaitersTable
        class="waiters__table"
        :waiters="waiters"
        :search="search"
        @row-clicked="handleRowClicked"
      />
      <WaitersModal
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
import WaitersControlPanel from "@/components/tabs/controlPanels/WaitersControlPanel.vue";
import WaitersTable from "@/components/tabs/tables/WaitersTable.vue";
import WaitersModal from "@/components/tabs/modals/WaitersModal.vue";

// ! Init: Refs & Handlers
const waiters = ref([]);

onMounted(() => {
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
  FirebaseService.waiters().off();
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

// ! Init: Router
const router = useRouter();

// ! Block: Auth
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
.waiters {
  display: flex;
  flex-direction: column;

  &__table {
    border-top: 1px solid #ccc;

    padding-top: 8px;
    width: 100%;
  }
}
</style>
