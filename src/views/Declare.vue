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
                v-model="chainId"
                :options="[
                    { value: 'SN_MAIN', label: 'Mainnet' },
                    { value: 'SN_SEPOLIA', label: 'Sepolia' },
                ]"
            />
            <div v-if="!result">
                <br />
                <button
                    :disabled="
                        error ||
                        !chainId ||
                        !files ||
                        files.length != 2 ||
                        loading
                    "
                    class="btn col-12"
                    @click="connectWalletAndDeclare"
                >
                    Connect && Declare
                </button>
            </div>
            <div v-else>
                <br />

                <a
                    :href="
                        'https://' +
                        path +
                        'voyager.online/class/' +
                        result +
                        '#deploy'
                    "
                    target="_blank"
                >
                    <button class="hoverPointerOut btn col-12">
                        Deploy using Voyager
                    </button>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { connect } from 'starknetkit'
import Multiselect from '@vueform/multiselect'
import { extractContractHashes, constants } from 'starknet'

export default {
    components: {
        Multiselect,
    },
    methods: {
        async connectWalletAndDeclare() {
            this.loading = true
            let wallet
            try {
                const { wallet: w } = await connect()
                wallet = w
            } catch (e) {
                this.loading = false
                return
            }

            if (
                !wallet ||
                !wallet.isConnected ||
                !(await this.switchChainId(wallet))
            ) {
                this.loading = false
                return
            }
            const casm = JSON.parse(await this.files[0].text())
            const contract = JSON.parse(await this.files[1].text())
            const payload = { casm, contract }
            let classHash
            try {
                const { classHash: ch } = extractContractHashes(payload)
                classHash = ch
            } catch (e) {
                this.error = 'Invalid files format'
                this.loading = false
                this.files = ''
                return
            }
            try {
                await wallet.provider.getClassByHash(classHash)
                this.result = classHash
                this.loading = false
                return
            } catch (e) {
                const { class_hash } = await wallet.account.declare(payload)
                this.result = class_hash
                this.loading = false
                return
            }
        },
        async switchChainId(wallet) {
            if (this.chainId == constants.NetworkName.SN_SEPOLIA) {
                this.path = 'sepolia.'
            } else {
                this.path = ''
            }
            if (wallet.chainId != this.chainId) {
                try {
                    await window.starknet.request({
                        type: 'wallet_switchStarknetChain',
                        params: {
                            chainId: this.chainId,
                        },
                    })
                } catch (e) {
                    return false
                }
            }
            return true
        },
        async previewFiles(e) {
            this.files = []
            this.result = ''
            this.loading = false
            if (e.target.files.length == 0) {
                return
            }
            if (e.target.files.length != 2) {
                this.error = 'Require exactly 2 files'
                return
            }
            const files = [...e.target.files]
            const compiledContractClass = files.find((f) =>
                f.name.endsWith('.compiled_contract_class.json')
            )
            if (!compiledContractClass) {
                this.error = "Missing '*.compiled_contract_class.json' file"
                return
            }

            const contractClass = files.find((f) =>
                f.name.endsWith('.contract_class.json')
            )
            if (!contractClass) {
                this.error = "Missing '*.contract_class.json' file"
                return
            }

            if (
                compiledContractClass.name.split('.')[0] !=
                contractClass.name.split('.')[0]
            ) {
                this.error = 'Files do not match'
                return
            }
            this.error = ''
            this.files = [compiledContractClass, contractClass]
        },
    },
    data() {
        return {
            chainId: 'SN_MAIN',
            error: '',
            path: '',
            result: '',
            files: '',
            loading: false,
        }
    },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
