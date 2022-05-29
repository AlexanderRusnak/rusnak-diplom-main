<template>
  <div>
    <VueFinalModal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
      @closed="handleModalClose"
    >
      <CrossIcon class="modal__close" @click="showModal = false" />
      <slot></slot>
    </VueFinalModal>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { VueFinalModal } from "vue-final-modal";
import CrossIcon from "@/assets/icons/CrossIcon.vue";

const props = defineProps(["isModalShown"]);

const emit = defineEmits(["modal-closed"]);

const showModal = ref(false);

const handleShowModal = () => {
  if (props.isModalShown) {
    showModal.value = true;
  } else {
    showModal.value = false;
  }
};

watch(
  () => props.isModalShown,
  () => handleShowModal()
);

const handleModalClose = () => {
  emit("modal-closed");
};
</script>

<style lang="scss" scoped>
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>
