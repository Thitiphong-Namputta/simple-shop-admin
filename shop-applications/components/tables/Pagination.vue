<template>
  <div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :per-page="perPage"
        :records="records"
        :length="length"
        :total-visible="4"
        density="compact"
        rounded="circle"
        @update:model-value="paginationCallback"
      ></v-pagination>
    </div>
    <div v-if="records">ทั้งหมด {{ $formatDigit(records) }} รายการ</div>
  </div>
</template>
<script>
export default {
  props: ["perPage", "records", "length"],
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    paginationCallback() {
      this.$emit("paginationCallback", this.page);
    },
  },
};
</script>
