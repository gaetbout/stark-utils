<template>
  <li class="list-group-item">
    Transaction hash:
    <input v-model="txHash" type="text" v-on:input="fetchL2Logs" class="form-control formy my-3 mr-2 shadow"
      placeholder="Paste here your transaction hash..." />
    <h2 v-show="isLoading">Loading....</h2>
    <h2 v-show="hashError">Incorrect tx hash</h2>
    <div v-show="showWrongNetworkMessage">
      <h2>You might be using the wrong network</h2>
      <h3> Change your current metamask chain</h3>
    </div>

    <div v-show="allTxs.length">
      <h2 v-if="allTxs.length == 1">Found 1 message to l2</h2>
      <h2 v-else>Found {{ allTxs.length }} messages to l2</h2>
      <a v-for="txHashUrl in allTxs" :key="txHashUrl" :href="getUrl() + txHashUrl" target="_blank">
        {{ txHashUrl }}
        <br />
      </a>
    </div>
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
      isLoading: false,
      hashError: false,
      showWrongNetworkMessage: false,
    };
  },
  methods: {
    hasTxs() {
      return this.allTxs.size > 0
    },
    fetchL2Logs() {
      this.allTxs = [];
      this.hashError = false;
      this.showWrongNetworkMessage = false;
      if (!this.txHash) return;
      this.isLoading = true;
      const web3 = new Web3(window.ethereum);
      web3.eth.getTransactionReceipt(this.txHash, (error, txReceipt) => {
        if (error) {
          this.isLoading = false;
          this.hashError = true;
          return;
        }
        if (!txReceipt) {
          this.isLoading = false;
          this.showWrongNetworkMessage = true;
          return;
        }
        const log2Selector =
          "0x9592d37825c744e33fa80c469683bbd04d336241bb600b574758efd182abe26a"; // ConsumedMessageToL2 selector
        let allLog2Logs = txReceipt.logs.filter(log => log.topics[0] == log2Selector);
        const chaindId = this.getChaindId();
        allLog2Logs.forEach(currentLog => {
          const data = web3.eth.abi.decodeLog(
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
          this.allTxs.push(claculatedHash);
          this.isLoading = false;
        })
      });
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
h2 {
  text-align: center;
}

h3 {
  text-align: center;
}

button {
  width: 100%;
  height: 3rem;
  font-size: 110%;
}

body:before {
  content: '';
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}

a {
  display: block;
  text-align: center;
  background: var(--secondary-color);
  padding: 14px;
  margin: 14px;
  height: 3rem;
  color: var(--font-white-color);
  font-size: clamp(12px, .9vw, 18px);
  border: none;
  position: relative;
  transition: 800ms ease all;
  outline: none;
  text-transform: uppercase;
}

a:hover {
  background: var(--font-white-color);
  color: var(--secondary-color);
}

a:before,
a:after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: var(--secondary-color);
  transition: 400ms ease all;
}

a:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}

a:hover:before,
a:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
</style>
