<template>
  <div class="card bg-secondary shadow border-0">
    <div class="card-header text-center">
      <h2>L1 &rarr; L2 <i class="fas fa-archway"></i></h2>
    </div>
    <!-- This uses
    https://stackoverflow.com/questions/72239816/checking-result-of-an-l1-l2-message-invoke-in-starknet  
    https://alpha4.starknet.io/feeder_gateway/get_transaction?transactionHash=0x56b7c13c0008f78d4cb4e39f993d7ed9921bf140f54966574d84d9c7dd80702
    https://docs.starknet.io/documentation/develop/L1-L2_Communication/messaging-mechanism/
    -->
    <div class="card-body px-lg-5">
      <ToggleSection @toggle="toggleSections" :isOpened="firstSectionOpened" title="Automated input"></ToggleSection>
      <div v-if="firstSectionOpened">
        <AutomatedInput />
      </div>
      <ToggleSection @toggle="toggleSections" :isOpened="!firstSectionOpened" title="Manual input"></ToggleSection>
      <div v-if="!firstSectionOpened">
        <ManualInput />
      </div>
      <button class="btn" @click="computeAndOpenL2Tx">
        Open transaction
        <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>
<script>
import ManualInput from '@/components/l1l2/ManualInput.vue';
import AutomatedInput from '@/components/l1l2/AutomatedInput.vue';
import ToggleSection from '@/components/l1l2/ToggleSection.vue';

export default {
  components: {
    ManualInput,
    AutomatedInput,
    ToggleSection,
  },
  data() {
    return {
      firstSectionOpened: true,
    };
  },
  methods: {
    toggleSections() {
      this.firstSectionOpened = !this.firstSectionOpened;
    },
  },
};
</script>
<style scoped>
button {
  width: 100%;
  height: 3rem;
  font-size: 110%;
}


.list-group-item {
  overflow-x: hidden;
}

.btn {
  margin-top: 24px;
}
</style>
