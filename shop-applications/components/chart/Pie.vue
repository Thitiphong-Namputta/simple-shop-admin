<template>
  <div>
    <v-card
      v-if="series.length > 0 && options"
      variant="flat"
      color="transprent"
    >
      <ClientOnly>
        <apexchart
          id="chart-pie"
          type="pie"
          :options="options"
          :series="series"
        ></apexchart>
      </ClientOnly>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    series: Array,
    options: Object,
  },
  data() {
    return {};
  },
};
</script>
