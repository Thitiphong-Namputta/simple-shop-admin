<template>
  <div>
    <v-app-bar :elevation="0" class="border-b-md">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Logo</v-app-bar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
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
};
</script>
