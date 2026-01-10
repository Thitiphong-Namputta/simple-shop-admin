<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="6">
          <ChartPie :series="series" :options="options" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [3, 5],
      options: {
        chart: {
          type: "pie",
          width: 100,
          height: 100,
          fontFamily: "Prompt, sans-serif",
        },
        colors: ["#4CAF50", "#FF9900"],
        labels: ["ชำระเงินแล้ว", "ค้างชำระ"],
        title: {
          text: "",
          align: "left",
        },
        legend: {
          position: "top",
        },
      },
    };
  },
};
</script>
