<template>
  <Toggle class="float-right togglePar" v-model="isMainnet" onLabel="Mainnet" offLabel="Testnet" />
  Transaction hash:
  <input v-model="txHash" type="text" class="form-control formy my-3 mr-2 shadow"
    placeholder="0x035ee021f94d527939c991b0ee27023046fbe218483befb350326bcb935831d6" />
  <div v-if="shouldAskLogIndex">
    <!-- TODO Add animation -->
    Log index (between 1 and {{ numberOfLogs }}):
    <input v-model="logIndex" type="number" class="form-control formy my-3 mr-2 shadow" placeholder="1" />
  </div>
  <button class="btn btn-sm btn-success" @click="retrieveInfo">
    Retrieve info
    <i class="fa fa-arrow-circle-down" aria-hidden="true"></i>
  </button>
</template>

<script>
import { hash } from "starknet";
import Web3 from "web3";
import { constants } from "starknet";
import Toggle from "@vueform/toggle";


export default {
  name: "AutomatedInput",
  components: {
    Toggle,
  },
  data() {
    return {
      txHash: "",
      contractAddress: "",
      toAddress: "",
      entryPointSelector: "",
      nonce: "",
      callData: "",
      isMainnet: false,
      shouldAskLogIndex: false,
      logIndex: 1,
      numberOfLogs: "",
      txHashSectionExtended: true,
      inputSectionExtended: false,
    };
  },
  methods: {
    // TODO Refactor it all
    computeAndOpenL2Tx() {
      // TODO si erreur ==> log some message like "Check network"
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
    },
    async retrieveInfo() {
      if (!this.txHash) return;
      let web3 = this.getProvider();
      if (!web3) return;
      let result = await web3.eth.getTransactionReceipt(this.txHash);
      const log2Selector =
        "0x9592d37825c744e33fa80c469683bbd04d336241bb600b574758efd182abe26a"; // ConsumedMessageToL2 selector
      let allLog2Logs = result.logs.filter(
        (log) => log.topics[0] == log2Selector
      );
      if (allLog2Logs.length > 1 && !this.shouldAskLogIndex) {
        this.shouldAskLogIndex = true;
        return;
      }
      if (this.logIndex > allLog2Logs.length) {
        alert("Log index incorrect");
        return;
      }
      let currentLog = allLog2Logs[this.logIndex - 1];
      this.toAddress = currentLog.topics[1];
      this.contractAddress = currentLog.topics[2];
      this.entryPointSelector = currentLog.topics[3];

      let data = web3.eth.abi.decodeLog(
        [
          {
            type: "uint256[]",
            name: "payload",
          },
          {
            type: "uint256",
            name: "nonce",
          },
        ],
        currentLog.data
      );
      this.callData = data.payload.toString();
      this.nonce = data.nonce;
      this.shouldAskLogIndex = false;
    },
    getProvider() {
      // TODO better handle this
      if (!window.ethereum) {
        alert("Please install metamask");
        return;
      }
      if (this.isMainnet && window.ethereum.chainId == "0x5") {
        alert("Please switch your wallet to mainnet");
        return;
      }
      if (!this.isMainnet && window.ethereum.chainId == "0x1") {
        alert("Please switch your wallet to goerli");
        return;
      }
      return new Web3(window.ethereum);
    },
  },
};
</script>
<style scoped>
.list-group-item {
  overflow-x: hidden !important;
}

button {
  width: 100%;
  height: 3rem;
  font-size: 110%;
}



/deep/ .toggle {
  width: 75px;
}

/deep/ .toggle-label {
  width: 57px;
}
</style>
