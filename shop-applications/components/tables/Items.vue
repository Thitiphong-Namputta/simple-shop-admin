<template>
  <div>
    <v-card variant="flat" color="transparent">
      <h2>{{ title }}</h2>
      <v-row align="center">
        <v-col v-if="search_able" cols="12" md="4">
          <v-text-field
            v-model="search"
            label="ค้นหา"
            variant="underlined"
            rounded="lg"
            hide-details
            @keydown.enter="searchTable(search)"
          >
            <template v-slot:append-inner>
              <v-btn
                size="small"
                density="compact"
                variant="text"
                icon="mdi-magnify"
                rounded="lg"
                @click="searchTable(search)"
              ></v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col v-if="ordering_able" cols="12" md="4">
          <v-select
            v-model="ordering"
            :items="orderItems"
            item-title="text"
            item-value="value"
            label="เรียงจาก"
            variant="underlined"
            prepend-inner-icon="mdi-filter-variant"
            rounded="lg"
            hide-details
            return-object
            @update:model-value="changeOrdering"
          >
          </v-select>
        </v-col>
        <v-col v-if="change_table_able" cols="12" md="4" class="text-end">
          <v-btn-toggle v-model="tableStyles" mandatory>
            <v-btn value="table">
              <v-icon size="large">mdi-table-large</v-icon>
            </v-btn>
            <v-btn value="list">
              <v-icon size="large">mdi-table-of-contents</v-icon>
            </v-btn>
            <v-btn value="chart">
              <v-icon size="large">mdi-chart-line</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" class="d-flex justify-end align-center">
          <v-btn v-if="export_able" variant="outlined" class="ms-2" @click="">
            <v-img
              v-if="theme.global.current.value.dark"
              :aspect-ratio="1"
              :width="24"
              alt="excel"
              src="~/assets/images/microsoft-excel-custom-white.png"
              cover
            ></v-img>
            <v-img
              v-else
              :aspect-ratio="1"
              :width="24"
              alt="excel"
              src="~/assets/images/microsoft-excel-custom.png"
              cover
            ></v-img>
            <span class="mx-1"> EXPORT .csv </span>
          </v-btn>
          <div v-if="import_able">
            <input
              ref="import"
              type="file"
              accept=".csv"
              style="display: none"
              @change=""
            />
            <v-btn
              variant="outlined"
              class="ms-2"
              @click="handelFileInputClick"
            >
              <v-img
                v-if="theme.global.current.value.dark"
                :aspect-ratio="1"
                :width="24"
                alt="excel"
                src="~/assets/images/microsoft-excel-custom-white.png"
                cover
              ></v-img>
              <v-img
                v-else
                :aspect-ratio="1"
                :width="24"
                alt="excel"
                src="~/assets/images/microsoft-excel-custom.png"
                cover
              ></v-img>
              <span class="mx-1"> IMPORT .csv </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <v-data-table
        v-if="tableStyles == 'table'"
        v-model="selected"
        :page="page"
        :show-select="showSelect"
        :headers="headers"
        :items="items"
        item-value="name"
        :items-per-page="itemsPerPage"
        :loading="loading"
        return-object
        :mobile="height < 400 ? true : false"
        hide-default-footer
        show-current-page
        :header-props="{
          class: theme.global.current.value.dark
            ? 'custom-header-dark'
            : 'custom-header-light',
        }"
        class="my-3"
        no-data-text="ไม่พบรายการ"
      >
        <template v-slot:item.index="{ index }">
          {{ index + 1 }}
        </template>
        <template v-slot:item.id="{ value }">
          {{ value }}
        </template>
        <template v-slot:item.created_at="{ value }">
          {{ $formatDateTH(value) }}
        </template>
        <template v-slot:item.updated_at="{ value }">
          {{ $formatDateTH(value) }}
        </template>
        <template v-slot:item.sell_price="{ value }">
          {{ $formatPrice(value) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-space-evenly">
            <v-btn
              v-if="detail_able"
              variant="text"
              icon="mdi-eye"
              @click="toDetail(item.id)"
            >
            </v-btn>
            <v-btn
              v-if="edit_able"
              color="warning"
              variant="text"
              icon="mdi-pencil-box-outline"
              @click="toEdit(item.id)"
            >
            </v-btn>
            <v-btn
              v-if="delete_able"
              color="error"
              variant="text"
              icon="mdi-trash-can"
              @click="toDelete(item.id)"
            >
            </v-btn>
          </div>
        </template>
      </v-data-table>

      <v-data-iterator
        v-if="tableStyles == 'list'"
        :items="items"
        :page="page"
        :items-per-page="itemsPerPage"
        :loading="loading"
      >
        <template v-slot:default="{ items }">
          <v-row v-if="!component_name" dense>
            <v-col v-for="item in items" :key="item.raw.id" cols="12" md="6">
              <v-card hover variant="outlined" class="pa-3 border-round-10">
                <v-list>
                  <v-list-item v-for="(header, i) in headerCard" :key="i">
                    {{ header.title }} {{ item.raw[header.key] }}
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:loader>
          <v-row>
            <v-col v-for="(_, k) in [0, 1]" :key="k" cols="12" sm="6">
              <v-skeleton-loader
                class="border"
                type="image, article"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="perPage"
            label="จำนวน"
            variant="underlined"
            rounded="lg"
            class="mt-2"
            type="number"
            :max-width="100"
            :rules="[rules.min, rules.isNumber]"
          >
            <template v-slot:append-inner>
              <v-btn
                size="small"
                density="compact"
                variant="text"
                icon="mdi-magnify"
                @click="getListByPerPage(perPage)"
              ></v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { useTheme, useDisplay } from "vuetify";
export default {
  props: [
    "title",
    "headers",
    "items",
    "showSelect",
    "page",
    "itemsPerPage",
    "loading",
    "edit_able",
    "delete_able",
    "detail_able",
    "export_able",
    "import_able",
    "search_able",
    "ordering_able",
    "change_table_able",
    "component_name",
    "select_table",
  ],
  setup() {
    const theme = useTheme();
    const { name } = useDisplay();
    const height = computed(() => {
      switch (name.value) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
        case "xxl":
          return 1200;
      }
    });
    return { theme, height };
  },
  data() {
    return {
      search: "",
      selected: [],
      perPage: 10,
      tableStyles: "table",
      csvFile: null,
      ordering: { value: "-id", text: "ล่าสุด" },
      rules: {
        min: (v) => v > 0 || "กรุณาใส่ค่าที่มากกว่า 0 ",
        isNumber: (v) =>
          Number.isInteger(Number(v)) || "กรุณาใส่ค่าที่เป็นตัวเลข",
      },
    };
  },
  computed: {
    orderItems() {
      let items = [
        { value: "name", text: "ชื่อ" },
        { value: "-id", text: "ล่าสุด" },
        { value: "id", text: "เก่าสุด" },
      ];
      return items;
    },
    headerCard() {
      let header = this.headers;
      header.pop();
      return header;
    },
  },
  watch: {
    selected(val) {
      if (val) {
        this.$emit("onSelect", val);
      }
    },
  },
  mounted() {
    if (this.select_table) {
      this.tableStyles = this.select_table;
    }
  },
  methods: {
    toDetail(id) {
      this.$emit("toDetail", id);
    },
    toDelete(id) {
      this.$emit("toDelete", id);
    },
    toEdit(id) {
      this.$emit("toEdit", id);
    },
    changeOrdering() {
      this.$emit("changeOrdering", this.ordering);
    },
    searchTable(search) {
      this.$emit("searchTable", search);
    },
    getListByPerPage(perPage) {
      this.$emit("getListByPerPage", perPage);
    },
    handelFileInputClick() {
      this.$refs.import.click();
    },
  },
};
</script>

<style scoped>
.custom-header-light {
  background-color: #e0e0e0 !important;
}
.custom-header-dark {
  background-color: black !important;
}
</style>
