<template>
  <v-menu offset-y min-width="100%">
    <template v-slot:activator="{ props }">
      <v-list-item-title v-bind="props" style="cursor: pointer; width: 100%">
        {{ currentLocale === "th" ? "ภาษา" : "Language" }}
      </v-list-item-title>
    </template>

    <v-list density="compact" :elevation="1">
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        :value="locale.code"
        @click="switchLanguage(locale.code)"
      >
        <template v-slot:prepend>
          <v-icon>
            {{ currentLocale === locale.code ? "mdi-check" : "" }}
          </v-icon>
        </template>
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  setup() {
    const { locale, locales, setLocale } = useI18n();
    const availableLocales = computed(() => {
      //   return locales.value.filter((i) => i.code !== locale.value);
      return locales.value;
    });
    return {
      setLocale,
      availableLocales,
      locale,
    };
  },
  data() {
    return {};
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    async switchLanguage(code) {
      await this.setLocale(code).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>
