<template>
  <div>
    <NavigationNavbar />
    <NavigationDrawer />
    <v-main
      :class="
        theme.global.current.value.dark
          ? 'background-page-dark'
          : 'background-page'
      "
    >
      <div>
        <slot />
      </div>
    </v-main>
  </div>
</template>

<script>
import { useTheme } from "vuetify";
export default {
  setup() {
    const theme = useTheme();
    return {
      theme,
    };
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
