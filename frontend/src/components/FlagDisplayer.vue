<template>
  <div class="wrapper">
    <img
      :src="assembleFlagSrc()"
      width="80"
      height="50"
      class="flag"
      alt="South Africa"
    />
    <span>{{ nation.name.common }}</span>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from "vue";
import { Nation } from "../Models/Nation";
export default defineComponent({
  props: {
    nation: Object as PropType<Nation>,
  },

  methods: {
    assembleFlagSrc(): string {
      return (
        "https://flagcdn.com/256x192/" +
        this.nation!.cca2.toLowerCase() +
        ".png"
      );
    },
  },
});
</script>

<style scoped>
.flag {
  padding: 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flag:hover {
  width: 150;
  height: 130;
  cursor: pointer;
}
</style>