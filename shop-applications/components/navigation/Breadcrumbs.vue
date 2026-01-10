<template>
  <div>
    <v-breadcrumbs class="mx-0 px-0" :items="items">
      <template v-slot:item="{ item }">
        <v-btn
          variant="text"
          :disabled="item.disabled"
          class="mx-0 px-0"
          @click="toPage(item.href, item.disabled)"
        >
          <div :class="item.disabled ? '' : 'primary--text'">
            {{ item.title }}
          </div>
        </v-btn>
      </template>
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    toPage(href, disabled) {
      if (!disabled) {
        if (href === "back") {
          this.$router.back();
          //   this.$router.go(-1);
        } else {
          this.$router.push(href);
        }
      }
    },
  },
};
</script>
