<template>
  <li class="list-group-item">
    {{ title }}
    <!-- TODO Emit toggle to update data and get rid of the 2 datas being passed! -->
    <Toggle v-model="selectorHex" onLabel="hex" offLabel="dec" class="float-right" />
    <br />
    <div v-if="selectorHex">
      <CopyComponent :key="item" v-for="item in dataBag.hexValues" :valueToCopy="item" :isValid="dataBag.valid"
        :inFormat="dataBag.inFmt" />
    </div>
    <div v-else>
      <CopyComponent :key="item" v-for="item in dataBag.intValues" :valueToCopy="item" :isValid="dataBag.valid"
        :inFormat="dataBag.inFmt" />
    </div>
  </li>
</template>

<script>
import CopyComponent from "./CopyComponent";
import Toggle from "@vueform/toggle";

export default {
  name: "ToggleComponent",
  components: {
    CopyComponent,
    Toggle,
  },
  props: {
    dataBag: {
      intValues: [String],
      hexValues: [String],
      valid: {
        type: Boolean,
        default: true,
      },
      inFmt: {
        type: Boolean,
        default: true,
      },
    },
    title: String,
  },
  data() {
    return {
      selectorHex: false,
    };
  },
};
</script>

<style src="@vueform/toggle/themes/default.css">

</style>
