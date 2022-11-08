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
            <ul class="list-group mb-4">
                <li class="list-group-item">
                    <Toggle class="float-right togglePar" v-model="isMainnet" onLabel="Mainnet" offLabel="Testnet" />
                    Transaction hash:
                    <input v-model="txHash" type="text" class="form-control formy my-3 mr-2  shadow"
                        placeholder="0x035ee021f94d527939c991b0ee27023046fbe218483befb350326bcb935831d6" />
                    <button class="btn btn-sm btn-success" @click="test">
                        Retrieve info <i class="fa fa-external-link" aria-hidden="true"></i>
                    </button>
                </li>
                <li class="list-group-item">
                    Contract address:
                    <input v-model="contractAddress" type="text" class="form-control formy my-3 mr-2  shadow"
                        placeholder="0x035ee021f94d527939c991b0ee27023046fbe218483befb350326bcb935831d6" />
                    To address:
                    <input v-model="toAddress" type="text" class="form-control formy my-3 mr-2  shadow"
                        placeholder="0x779b989d7358acd6ce64237f16bbef09f35f6ecc" />

                    Entrypoint selector:
                    <input v-model="entryPointSelector" type="text" class="form-control formy my-3 mr-2  shadow"
                        placeholder="0x2d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5" />

                    Calldata (separate each value using ","):
                    <input v-model="callData" type="text" class="form-control formy my-3 mr-2  shadow"
                        placeholder="a, b, c, ..." />
                    <!-- 1393428179030720295440092695193628168230707649901849797435563042612822742693, 11819812303435348947619, 0 -->
                    Nonce:
                    <input v-model="nonce" type="number" class="form-control formy my-3 mr-2  shadow"
                        placeholder="69106" />
                </li>
                <li class="list-group-item">
                    <button class="btn btn-sm btn-success" @click="computeAndOpenL2Tx">
                        Open transaction <i class="fa fa-external-link" aria-hidden="true"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { hash } from "starknet";
import Web3 from 'web3'
import { constants } from "starknet";
import Toggle from "@vueform/toggle";


export default {
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
            isMainnet: false
        };
    },
    methods: {
        computeAndOpenL2Tx() {
            // TODO si erreur ==> log some message like "Check network"
            const allCalldata = this.callData.split(",");
            allCalldata.unshift(this.toAddress);
            const url = this.isMainnet ? "https://starkscan.co/tx/" : "https://testnet.starkscan.co/tx/";
            const txHash = hash.calculateTransactionHashCommon(
                constants.TransactionHashPrefix.L1_HANDLER, // txHashPrefix
                "0", // version
                this.contractAddress,
                this.entryPointSelector,
                allCalldata, // toAddress + calldata
                "0", // maxFee
                this.chaindId, // chainId
                [this.nonce]
            );
            window.open(url + txHash, '_blank')
        },
        async test() {
            if (!this.txHash) return;
            let web3 = this.getProvider();
            if (!web3) return;
            let result = await web3.eth.getTransactionReceipt(this.txHash);
            console.log(result);
            const log2Selector = "0x9592d37825c744e33fa80c469683bbd04d336241bb600b574758efd182abe26a"; // ConsumedMessageToL2 selector
            let allLog2Logs = result.logs.filter(log => log.topics[0] == log2Selector);
            if (allLog2Logs.length > 1) {
                console.log(allLog2Logs);
                return;
            }
            let currentLog = allLog2Logs[0];
            this.contractAddress = currentLog.topics[2];
            this.toAddress = currentLog.topics[1];
            this.entryPointSelector = currentLog.topics[3];

            // this.nonce = result.nonce;
            let data = web3.eth.abi.decodeLog([{
                type: 'uint256[]',
                name: 'payload'
            }, {
                type: 'uint256',
                name: 'nonce'
            }], currentLog.data)
            this.callData = data.payload.toString();
            this.nonce = data.nonce;
        },
        getProvider() {
            // TODO better handle this
            if (!window.ethereum) {
                alert("Please install metamask");
                return;
            }

            if (this.isMainnet && window.ethereum.chainId == "0x5") {
                alert("Please switch metamask to mainnet");
                return;
            }
            if (!this.isMainnet && window.ethereum.chainId == "0x1") {
                alert("Please switch metamask to goerli");
                return;
            }
            return new Web3(window.ethereum);
        }
    }
}

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