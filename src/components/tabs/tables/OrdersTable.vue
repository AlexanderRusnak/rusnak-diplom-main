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

const props = defineProps([
  "orders",
  "search",
  "orderStatusFilter",
  "orderWaiterFilter",
]);

// клик на строку таблицы
const handleRowClicked = (rowData) => {
  emit("row-clicked", rowData);
};

// Table config
const table = reactive({
  isLoading: false,
  columns: [
    {
      label: "№ заказа",
      field: "id",
      width: "5%",
      sortable: false,
      isKey: true,
    },
    {
      label: "Стол",
      field: "table",
      width: "5%",
      sortable: false,
    },
    {
      label: "Официант",
      field: "waiter",
      width: "5%",
      sortable: false,
    },
    {
      label: "Статус",
      field: "status",
      width: "5%",
      sortable: false,
    },
    {
      label: "Сумма",
      field: "sum",
      width: "5%",
      sortable: false,
    },
  ],
  rows: [],
  totalRecordCount: 0,
  sortable: {
    order: "idf",
    sort: "asc",
  },
});

const filterOrders = () => {
  let filteredOrders = [];

  if (props.orders.length > 0) {
    filteredOrders = props.orders
      .filter((item) => {
        return item.table
          .toString()
          .toLowerCase()
          .startsWith(props.search.toLowerCase());
      })
      .filter((item) => {
        return (
          props.orderStatusFilter === "Все заказы" ||
          item.status === props.orderStatusFilter
        );
      })
      .filter((item) => {
        return (
          props.orderWaiterFilter === "Все официанты" ||
          item.waiter === props.orderWaiterFilter
        );
      });
  }

  return filteredOrders;
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
  table.rows = filterOrders();
  table.totalRecordCount = 20;
  table.sortable.order = order;
  table.sortable.sort = sort;
};
// First get data
doSearch(0, 10, "idf", "asc");

watch(
  () => props.orders,
  () => doSearch(0, 10, "idf", "asc")
);

watch(
  () => props.search,
  () => doSearch(0, 10, "idf", "asc")
);

watch(
  () => props.orderStatusFilter,
  () => doSearch(0, 10, "idf", "asc")
);

watch(
  () => props.orderWaiterFilter,
  () => doSearch(0, 10, "idf", "asc")
);
</script>
