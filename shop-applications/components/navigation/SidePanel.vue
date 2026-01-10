<template>
  <div>
    <v-menu offset-y :nudge-width="150">
      <template v-slot:activator="{ props }">
        <v-btn dark text v-bind="props" class="black--text mx-2">
          <strong>User</strong>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-card variant="flat" class="pa-2 mt-2" min-width="300">
        <div class="border-box">
          <div class="d-flex align-center pa-2">
            <v-avatar color="primary" size="56">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
            <div class="pl-2">
              <strong>Demo</strong>
              <p class="ma-0">demo@mail.com</p>
            </div>
          </div>
          <v-list dense>
            <v-list-item @click="">
              <template v-slot:prepend>
                <v-icon>mdi-account-outline</v-icon>
              </template>
              <v-list-item-title>profile</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-cog-outline</v-icon>
              </template>
              <v-list-item-title>setting</v-list-item-title>
            </v-list-item>
            <v-list-item @click="toggleTheme">
              <template v-slot:prepend>
                <v-icon>
                  {{
                    theme.global.current.value.dark
                      ? "mdi-white-balance-sunny"
                      : "mdi-weather-night"
                  }}
                </v-icon>
              </template>
              {{ theme.global.current.value.dark ? "Dark" : "Light" }}
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-translate</v-icon>
              </template>
              <LanguageSwitcher />
            </v-list-item>
          </v-list>
        </div>
        <div class="border-box my-2">
          <v-list-item @click="logOut">
            <template v-slot:prepend>
              <v-icon>mdi-exit-run</v-icon>
            </template>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { useTheme, useDisplay } from "vuetify";
export default {
  setup() {
    const theme = useTheme();
    const { locale, locales, setLocale } = useI18n();
    const availableLocales = computed(() => {
      return locales.value.filter((i) => i.code !== locale.value);
    });
    function toggleTheme() {
      theme.global.name.value = theme.global.current.value.dark
        ? "light"
        : "dark";
    }
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
      setLocale,
      availableLocales,
      locale,
      toggleTheme,
      theme,
      height,
    };
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {},
  },
};
</script>

<style scoped>
.border-box {
  border: 1px solid #ddd;
}
</style>
