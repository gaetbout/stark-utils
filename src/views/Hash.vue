<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>Hash &nbsp;&nbsp; <fa-icon icon="fa-solid fa-hashtag" /></h2>
        </div>
        <div class="card-body px-lg-5">
            Pedersen Hash:
            <input
                v-model="pedersenData"
                type="text"
                class="form-control form my-3 mr-2 text-center shadow"
                placeholder="a, b, c, d, ..."
            />
            Hash Out:
            <CopyComponent :valueToCopy="pedersenOut" :inFormat="false" />
            <br />
            <br />
            Poseidon Hash:
            <input
                v-model="poseidonData"
                type="text"
                class="form-control form my-3 mr-2 text-center shadow"
                placeholder="a, b, c, d, ..."
            />
            Hash Out:
            <CopyComponent :valueToCopy="poseidonOut" :inFormat="false" />
            <br />
        </div>
    </div>
</template>
<script>
import utils from '@/utils'
import { hash } from 'starknet'
import CopyComponent from '@/components/CopyComponent'

export default {
    components: {
        CopyComponent,
    },
    data() {
        return {
            pedersenData: '',
            poseidonData: '',
        }
    },
    computed: {
        pedersenOut() {
            if (!this.pedersenData) return ''
            let data = this.pedersenData
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e.length > 0)
                .map(utils.toHex)
            return hash.computePedersenHashOnElements(data)
        },
        poseidonOut() {
            if (!this.poseidonData) return ''
            let data = this.poseidonData
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e.length > 0)
                .map(utils.toHex)
            return hash.computePoseidonHashOnElements(data)
        },
    },
    methods: {
        async copy(text) {
            await navigator.clipboard.writeText(text)
        },
    },
}
</script>

<style></style>
