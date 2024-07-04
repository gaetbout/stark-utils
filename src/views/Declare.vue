<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>
                Declare &nbsp;&nbsp;
                <fa-icon icon="fa-solid fa-file-contract" />
            </h2>
        </div>
        <div class="card-body px-lg-5">
            <br />
            <input
                type="file"
                @change="previewFiles"
                multiple=""
                accept=".json"
            />
            <br />
            <br />
            <div v-if="error" class="alert alert-danger" role="alert">
                Invalid files: {{ error }}
            </div>
            <div v-if="files" class="alert alert-info" role="alert">
                {{ files[0] }}
                <br />
                {{ files[1] }}
            </div>
            <Multiselect
                :canClear="false"
                v-model="network"
                :options="['Mainnet', 'Sepolia']"
            />
            <br />
            <button
                :disabled="error || !files || files.length != 2 || !network"
                class="btn col-12"
                @click="connectWallet"
            >
                Connect
            </button>
        </div>
        <!-- You can deploy at https://voyager.online/class/0x06dcdd56f064b6c04ef13dbdaa55b896e9d651cbb1d25e6aae20ea3dfa2140e5#deploy -->
    </div>
</template>
<script>
import { connect } from 'starknetkit'
import Multiselect from '@vueform/multiselect'

export default {
    components: {
        Multiselect,
    },
    methods: {
        async connectWallet() {
            try {
                const { wallet } = await connect()
                console.log('wallet.selectedAddress')
                console.log(wallet)
                if (wallet && wallet.isConnected) {
                    // setConnection(wallet)
                    // setProvider(wallet.account)
                    // setAddress(wallet.selectedAddress)
                }
            } catch (e) {
                // console.error(e)
            }
        },
        async previewFiles(e) {
            if (e.target.files.length == 0) {
                return
            }
            if (e.target.files.length != 2) {
                this.error = 'Require exactly 2 files'
                return
            }
            const files =  [e.target.files[0].name, e.target.files[1].name];
            if (!files.some((f) => f.endsWith('.compiled_contract_class.json'))) {
                this.error = "Missing '.compiled_contract_class.json' file" 
                return
            }
            // argent_MockFutureArgentMultisig.compiled_contract_class.json
            // argent_MockFutureArgentMultisig.contract_class.json
            this.error = ''
            this.files = files
        },
    },
    data() {
        return {
            network: 'Mainnet',
            error: '',
            files: '',
        }
    },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
