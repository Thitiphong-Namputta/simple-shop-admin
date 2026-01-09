<template>
  <div>
    <v-container>
      <TablesItems
        title="คำสั่งซื้อ"
        :page="page"
        :headers="headers"
        :items="items"
        :itemsPerPage="perPage"
        :loading="loading"
        :show-select="true"
        :detail_able="true"
        :delete_able="true"
        :edit_able="true"
        :export_able="true"
        :import_able="true"
        :search_able="true"
        :ordering_able="true"
        :change_table_able="true"
        select_table="list"
        component_name="order"
        @toDetail="toDetail"
        @toDelete="toDelete"
        @toEdit="toEdit"
        @changeOrdering="changeOrdering"
        @getListByPerPage="getListByPerPage"
        @searchTable="searchTable"
      />
      <TablesPagination
        ref="pagination"
        :perPage="perPage"
        :records="records"
        :length="length"
        @paginationCallback="paginationCallback"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      items: [],
      perPage: 10,
      page: 1,
      records: 0,
      loading: false,
      ordering: { value: "-id", text: "ล่าสุด" },
      headers: [
        {
          title: "#รหัส",
          align: "start",
          sortable: true,
          key: "code",
        },
        {
          title: "วันที่ทำรายการ",
          align: "start",
          sortable: true,
          key: "created_at",
        },
        {
          title: "สถานะ",
          align: "start",
          sortable: true,
          key: "status",
        },
        {
          title: "actions",
          align: "center",
          sortable: false,
          key: "actions",
        },
      ],
    };
  },
  computed: {
    length() {
      let length = this.records / this.perPage;
      if (length >= 1) {
        return Math.ceil(length);
      } else {
        return 1;
      }
    },
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      // this.loading = true;
      // let search = "";
      // if (this.search) {
      //   search = `&search=${this.search}`;
      // }
      // await this.$api
      //   .get(
      //     `/orders/?limit=${this.perPage}&offset=${
      //       (this.page - 1) * this.perPage
      //     }&ordering=${this.ordering.value}&${search}`
      //   )
      //   .then((res) => {
      //     this.records = res.data.count;
      //     this.items = res.data.results;
      //     this.loading = false;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.loading = false;
      //   });
    },
    paginationCallback(page) {
      this.page = page;
      this.getOrders();
    },
    changeOrdering(ordering) {
      this.page = 1;
      this.ordering = ordering;
      this.getOrders();
    },
    getListByPerPage(perPage) {
      this.perPage = perPage;
      this.getOrders();
    },
    searchTable(search) {
      this.page = 1;
      this.search = search;
      this.getOrders();
    },
    toDetail(id) {
      // this.$router.push(`/orders/detail/?id=${id}`);
    },
    toEdit(id) {
      console.log(id);
    },
    toDelete(id) {
      console.log(id);
    },
  },
};
</script>
