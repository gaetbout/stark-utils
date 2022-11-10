<template>
  <li class="list-group-item">
    Transaction hash:
    <input v-model="txHash" type="text" v-on:input="fetchL2Logs" class="form-control formy my-3 mr-2 shadow"
      placeholder="Paste here your transaction hash..." />
    <a v-for="txHashUrl in allTxs" :key="txHashUrl" :href="txHashUrl" target="_blank">
      {{ txHashUrl }}
    </a>
  </li>
</template>

<script>
import { hash } from "starknet";
import Web3 from "web3";
import { constants } from "starknet";


export default {
  name: "AutomatedInput",
  props: {
    isMainnet: Boolean,
  },
  data() {
    return {
      txHash: "",
      allTxs: [],
    };
  },
  methods: {
    async fetchL2Logs() {
      this.allTxs = [];
      if (!this.txHash) return;
      // TODO Set loading state
      // TODO merge automated and manual input in 1 file 
      let web3 = new Web3(window.ethereum);
      let result = await web3.eth.getTransactionReceipt(this.txHash);
      const log2Selector =
        "0x9592d37825c744e33fa80c469683bbd04d336241bb600b574758efd182abe26a"; // ConsumedMessageToL2 selector
      let allLog2Logs = result.logs.filter(
        (log) => log.topics[0] == log2Selector
      );
      const url = this.getUrl();
      const chaindId = this.getChaindId();
      allLog2Logs.forEach(currentLog => {
        let data = web3.eth.abi.decodeLog(
          [{
            type: "uint256[]",
            name: "payload",
          },
          {
            type: "uint256",
            name: "nonce",
          },],
          currentLog.data
        );
        const claculatedHash = hash.calculateTransactionHashCommon(
          constants.TransactionHashPrefix.L1_HANDLER, // txHashPrefix
          "0", // version
          currentLog.topics[2], // contractAddress
          currentLog.topics[3], // entryPointSelector
          [currentLog.topics[1], ...data.payload.toString().split(",")], // toAddress + calldata
          "0", // maxFee
          chaindId, // chainId
          [data.nonce]
        );
        this.allTxs.push(url + claculatedHash)
      })
    },
    getUrl() {
      return this.isMainnet ? "https://starkscan.co/tx/" : "https://testnet.starkscan.co/tx/";
    },
    getChaindId() {
      return this.isMainnet ? constants.StarknetChainId.MAINNET : constants.StarknetChainId.TESTNET;
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
</style>
