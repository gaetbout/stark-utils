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
                Invalid files:<br />
                {{ error }}
            </div>
            <div
                v-if="files && files.length == 2"
                class="alert alert-info"
                role="alert"
            >
                {{ files[0].name }}
                <br />
                {{ files[1].name }}
            </div>
            <Multiselect
                :canClear="false"
                v-model="network"
                :options="['Mainnet', 'Sepolia']"
            />
            <br />
            <button
                :disabled="error || !network"
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
            this.files = []
            if (e.target.files.length == 0) {
                return
            }
            if (e.target.files.length != 2) {
                this.error = 'Require exactly 2 files'
                return
            }
            const files = [e.target.files[0].name, e.target.files[1].name]
            const compiledContractClass = files.find((f) =>
                f.endsWith('.compiled_contract_class.json')
            )
            if (!compiledContractClass) {
                this.error = "Missing '*.compiled_contract_class.json' file"
                return
            }

            const contractClass = files.find((f) =>
                f.endsWith('.contract_class.json')
            )
            if (!contractClass) {
                this.error = "Missing '*.contract_class.json' file"
                return
            }

            if (
                compiledContractClass.split('.')[0] !=
                contractClass.split('.')[0]
            ) {
                this.error = 'Files do not match'
                return
            }
            this.error = ''
            this.files = e.target.files
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
