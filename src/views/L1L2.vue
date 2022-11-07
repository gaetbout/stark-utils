<template>
    <!-- This uses
    https://stackoverflow.com/questions/72239816/checking-result-of-an-l1-l2-message-invoke-in-starknet  
    https://alpha4.starknet.io/feeder_gateway/get_transaction?transactionHash=0x56b7c13c0008f78d4cb4e39f993d7ed9921bf140f54966574d84d9c7dd80702
    https://docs.starknet.io/documentation/develop/L1-L2_Communication/messaging-mechanism/
    -->
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>L1 &rarr; L2 <i class="fas fa-archway"></i></h2>
        </div>
        <div class="card-body px-lg-5">
            <ul class="list-group mb-4">
                <li class="list-group-item">
                    Contract address:
                    <Toggle v-model="isMainnet" onLabel="Mainnet" offLabel="Testnet" class="float-right" />
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
                    <button class="btn btn-sm btn-success" style="height: 3rem; width: 100%" @click="test">
                        Open transaction <i class="fa fa-external-link" aria-hidden="true" disabled></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { hash } from "starknet";
import { constants } from "starknet";
import Toggle from "@vueform/toggle";


export default {
    components: {
        Toggle,
    },
    data() {
        return {
            contractAddress: "",
            toAddress: "",
            entryPointSelector: "",
            nonce: "",
            callData: "",
            isMainnet: false
        };
    },
    methods: {
        test() {
            const allCalldata = this.callData.split(",");
            allCalldata.unshift(this.toAddress);
            const chaindId = this.isMainnet ? constants.StarknetChainId.MAINNET : constants.StarknetChainId.TESTNET;
            const url = this.isMainnet ? "https://starkscan.co/tx/" : "https://testnet.starkscan.co/tx/";
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
            window.open(url + txHash, '_blank')
        }
    }
}

</script>
<style>
.list-group-item {
    overflow-x: hidden !important;
}

button {
    color: var(--font-white-color) !important;
    background-color: var(--secondary-color) !important;
    border-color: var(--secondary-color) !important;
}

button:hover {
    color: var(--font-white-color-hover) !important;
    background-color: var(--secondary-color-hover) !important;
    border-color: var(--secondary-color-hover) !important;
}

.toggle {
    width: 75px;
}

.toggle-label {
    width: 57px;
}
</style>