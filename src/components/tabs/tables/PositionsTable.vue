<template>
  <div>
    <TableLite
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      :is-hide-paging="true"
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

const props = defineProps(["positions", "search", "positionTypeFilter"]);

// клик на строку таблицы
const handleRowClicked = (rowData) => {
  emit("row-clicked", rowData);
};

// Table config
const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "Позиция",
      field: "name",
      width: "5%",
      sortable: false,
      isKey: true,
    },
    {
      label: "Категория",
      field: "category",
      width: "5%",
      sortable: false,
    },
    {
      label: "Цена",
      field: "price",
      width: "5%",
      sortable: false,
    },
  ],
  rows: [],
  totalRecordCount: 0,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const filterPositions = () => {
  let filteredPositions = [];

  if (props.positions.length > 0) {
    filteredPositions = props.positions
      .filter((item) => {
        return item?.name
          ?.toLowerCase()
          .startsWith(props?.search?.toLowerCase());
      })
      .filter((item) => {
        return (
          props.positionTypeFilter === "Все типы" ||
          item.type === props.positionTypeFilter
        );
      });
  }

  return filteredPositions;
};

/**
 * Search Event
 */
const doSearch = (offset, limit, order, sort) => {
  table.isLoading = true;
  table.isReSearch = offset == undefined ? true : false;
  if (offset >= 10 || limit >= 20) {
    limit = 20;
  }
  table.rows = filterPositions();
  table.totalRecordCount = 20;
  table.sortable.order = order;
  table.sortable.sort = sort;
};
// First get data
doSearch(0, 10, "id", "asc");

watch(
  () => props.positions,
  () => doSearch(0, 10, "id", "asc")
);

watch(
  () => props.search,
  () => doSearch(0, 10, "id", "asc")
);

watch(
  () => props.positionTypeFilter,
  () => doSearch(0, 10, "id", "asc")
);
</script>
