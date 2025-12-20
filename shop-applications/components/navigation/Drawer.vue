<template>
  <div>
    <v-navigation-drawer
      v-if="menus.length > 0"
      v-model="drawer"
      :rail="rail"
      rail-width="56"
      :temporary="height < 400 ? true : false"
      :elevation="0"
      floating
      class="border-e-md"
      @click="rail = false"
    >
      <v-list v-model:opened="open">
        <div v-for="item in menus" :key="item.id">
          <v-list-item
            v-if="!item.sub_menus[0]"
            :disabled="!item.action"
            @click="toPage(item.route)"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <span>
              {{ item.name }}
            </span>
          </v-list-item>
          <v-list-group v-else :value="item.name">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="item.name"
                :disabled="!item.action"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(sub_menu, index) in item.sub_menus"
              :key="index + 'sub'"
              @click="toPage(sub_menu.route)"
            >
              <template v-slot:prepend>
                <v-icon :icon="sub_menu.icon"></v-icon>
              </template>
              <span>
                {{ sub_menu.name }}
              </span>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { useTheme, useDisplay } from "vuetify";
export default {
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
    return {
      theme,
      height,
    };
  },
  data() {
    return {
      open: [],
      drawer: true,
      rail: true,
      menus: [
        {
          id: 0,
          sub_menus: [],
          name: "สินค้า",
          name_en: "products",
          text_key: "products",
          route: "/",
          action: true,
          base_url: "/",
          icon: "mdi-package-variant-plus",
        },
        {
          id: 1,
          sub_menus: [
            {
              id: 1,
              name: "สรุปใบสั่งซื้อ",
              name_en: "orders",
              text_key: "orders",
              route: "/orders",
              action: true,
              base_url: "/",
              icon: "mdi-chart-line",
            },
            {
              id: 2,
              name: "รายการใบสั่งซื้อ",
              name_en: "orders",
              text_key: "orders",
              route: "/orders",
              action: true,
              base_url: "/",
              icon: "mdi-clipboard-list-outline",
            },
          ],
          name: "ใบสั่งซื้อ",
          name_en: "orders",
          text_key: "orders",
          route: "/orders",
          action: true,
          base_url: "/",
          icon: "mdi-invoice-list-outline",
        },
        {
          id: 2,
          sub_menus: [],
          name: "การชำระ",
          name_en: "transaction",
          text_key: "transaction",
          route: "/transaction",
          action: true,
          base_url: "/",
          icon: "mdi-wallet-outline",
        },
      ],
    };
  },
  watch: {
    rail(val) {
      if (val == true) {
        this.open = [];
      }
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  methods: {
    toPage(page) {
      this.$router.push(page);
    },
  },
};
</script>
