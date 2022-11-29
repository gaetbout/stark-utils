<template>
  <button class="collapsible" @click="$emit('toggle')">
    {{ title }}
    <i
      v-if="isOpened"
      class="fa fa-arrow-circle-up float-right"
      aria-hidden="true"
    ></i>
    <i
      v-else
      class="fa fa-arrow-circle-down float-right"
      aria-hidden="true"
    ></i>
  </button>
</template>

<script>
export default {
  name: "ExpandableSection",
  props: {
    isOpened: Boolean,
    title: String,
  },
};
</script>

<style scoped>
button {
  width: 100%;
  height: 3rem;
  font-size: 110%;
}

.collapsible {
  background-color: #eee !important;
  color: #444 !important;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
}

.collapsible:hover {
  background-color: #ccc !important;
}
</style>
