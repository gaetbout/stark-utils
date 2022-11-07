<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>L1 &rarr; L2 <i class="fas fa-archway"></i></h2>
        </div>
        <div class="card-body px-lg-5">
            <h1 class="text-center">Work In Progress</h1>
            <h2>Based on some inputs: from_address, to_adress, selector, nonce, payload.<br />
                It is possible to compute the L2 tx hash.<br />
                This page will allow to do that.</h2>
            <br />
            {{ test() }}
        </div>
    </div>
</template>

<script>
import { hash } from "starknet";


export default {
    data() {
        return {
            input: "lama",
        };
    },
    methods: {
        test() {
            return hash.calculateTransactionHashCommon(
                "510926345461491391292786", // Il existe une cste pour ça: TransactionHashPrefix.L1_HANDLER
                "0",
                "1524569076953457512425355396075576585145183562308719695739798372277154230742",
                "1285101517810983806491589552491143496277809242732141897358598292095611420389",
                [
                    "682839811878924031347481176960247702847672512204",
                    "1393428179030720295440092695193628168230707649901849797435563042612822742693",
                    "11819812303435348947619",
                    "0"],
                "0",
                "1536727068981429685321",
                ["69106"]
            );
        }
    }
}

</script>
