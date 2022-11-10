<template>
  <li class="list-group-item">
    Contract address:
    <input v-model="contractAddress" type="text" class="form-control formy my-3 mr-2 shadow"
      placeholder="0x035ee021f94d527939c991b0ee27023046fbe218483befb350326bcb935831d6" />
    To address:
    <input v-model="toAddress" type="text" class="form-control formy my-3 mr-2 shadow"
      placeholder="0x779b989d7358acd6ce64237f16bbef09f35f6ecc" />

    Entrypoint selector:
    <input v-model="entryPointSelector" type="text" class="form-control formy my-3 mr-2 shadow"
      placeholder="0x2d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5" />

    Calldata (separate each value using ","):
    <input v-model="callData" type="text" class="form-control formy my-3 mr-2 shadow" placeholder="a, b, c, ..." />
    <!-- 1393428179030720295440092695193628168230707649901849797435563042612822742693, 11819812303435348947619, 0 -->
    Nonce:
    <input v-model="nonce" type="number" class="form-control formy my-3 mr-2 shadow" placeholder="69106" />
    <button class="btn" @click="computeAndOpenL2Tx">
      Open transaction
    </button>
    <div class="alertMessage">
      {{ txMessage }}
    </div>
  </li>
</template>

<script>
import { hash } from "starknet";
import { constants } from "starknet";

export default {
  name: "ManualInput",
  props: {
    isMainnet: Boolean,
  },
  data() {
    return {
      contractAddress: "",
      toAddress: "",
      entryPointSelector: "",
      nonce: "",
      callData: "",
      txMessage: "",
    };
  },
  methods: {
    // TODO Refactor it all
    computeAndOpenL2Tx() {
      const allCalldata = this.callData.split(",");
      const chaindId = this.isMainnet
        ? constants.StarknetChainId.MAINNET
        : constants.StarknetChainId.TESTNET;
      allCalldata.unshift(this.toAddress);
      const url = this.isMainnet
        ? "https://starkscan.co/tx/"
        : "https://testnet.starkscan.co/tx/";
      const txHash = hash.calculateTransactionHashCommon(
        constants.TransactionHashPrefix.L1_HANDLER, // txHashPrefix
        "0", // version
        this.contractAddress,
        this.entryPointSelector,
        allCalldata, // toAddress + calldata
        "0", // maxFee
        chaindId, // chainId
        [this.nonce]
      );
      window.open(url + txHash, "_blank");
      this.txMessage = "If the transaction isn't found check your metamask network"
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

.alertMessage {
  text-align: center;
  color: var(--secondary-color);
  margin-top: 24px;
  font-size: 1.25rem;

}
</style>