<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>
                Declare &nbsp;&nbsp;
                <fa-icon icon="fa-solid fa-file-contract" />
            </h2>
        </div>
        <div class="card-body px-lg-5"></div>
        <!-- <MultifileElement name="files" /> -->
        <Multiselect v-model="network" :options="['Mainnet', 'Sepolia']" />
        <button class="btn" @click="connectWallet">Connect</button>
        <!-- You can deploy at https://voyager.online/class/0x06dcdd56f064b6c04ef13dbdaa55b896e9d651cbb1d25e6aae20ea3dfa2140e5#deploy -->
    </div>
</template>
<script>
// import CopyComponent from '@/components/CopyComponent'
import { connect } from 'starknetkit'
import Multiselect from '@vueform/multiselect'

export default {
    components: {
        Multiselect,
    },
    methods: {
        async connectWallet() {
            const { wallet } = await connect()
            console.log('wallet.selectedAddress')
            console.log(wallet)
            if (wallet && wallet.isConnected) {
                // setConnection(wallet)
                // setProvider(wallet.account)
                // setAddress(wallet.selectedAddress)
            }
        },
    },
    data() {
        return {
            network: 'Mainnet',
        }
    },
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
