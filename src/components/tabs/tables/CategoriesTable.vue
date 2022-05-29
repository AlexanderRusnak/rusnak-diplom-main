<template>
  <div>
    <TableLite
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      @do-search="doSearch"
      @is-finished="table.isLoading = false"
      @row-clicked="handleRowClicked"
    />
  </div>
</template>

<script setup>
import { reactive, defineEmits, defineProps, watch } from "vue";
import TableLite from "vue3-table-lite";

const emit = defineEmits(["row-clicked"]);

const props = defineProps(["categories"]);

// клик на строку таблицы
const handleRowClicked = (rowData) => {
  emit("row-clicked", rowData);
};

// Table config
const table = reactive({
  isLoading: false,
  columns: [
    // {
    //   label: "ID",
    //   field: "id",
    //   width: "3%",
    //   sortable: true,
    //   isKey: true,
    // },
    {
      label: "Категория",
      field: "name",
      width: "5%",
      sortable: false,
    },
    // {
    //   label: "Email",
    //   field: "email",
    //   width: "10%",
    //   sortable: true,
    // },
  ],
  rows: [],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});
/**
 * Search Event
 */
const doSearch = (offset, limit, order, sort) => {
  table.isLoading = true;
  setTimeout(() => {
    table.isReSearch = offset == undefined ? true : false;
    if (offset >= 10 || limit >= 20) {
      limit = 20;
    }
    table.rows = props.categories;
    table.totalRecordCount = 20;
    table.sortable.order = order;
    table.sortable.sort = sort;
  }, 600);
};
// First get data
doSearch(0, 10, "id", "asc");

watch(
  () => props.categories,
  () => doSearch(0, 10, "id", "asc")
);
</script>

<style lang="scss" scoped></style>
