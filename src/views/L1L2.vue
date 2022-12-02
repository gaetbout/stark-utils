<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>
                L1 &rarr; L2 &nbsp;&nbsp;
                <fa-icon icon="fa-solid fa-bridge-circle-check" />
            </h2>
        </div>
        <!-- This uses
    https://stackoverflow.com/questions/72239816/checking-result-of-an-l1-l2-message-invoke-in-starknet  
    https://alpha4.starknet.io/feeder_gateway/get_transaction?transactionHash=0x56b7c13c0008f78d4cb4e39f993d7ed9921bf140f54966574d84d9c7dd80702
    https://docs.starknet.io/documentation/develop/L1-L2_Communication/messaging-mechanism/
    -->
        <div class="card-body px-lg-5">
            <div v-if="hasMetamask()">
                <div class="title">
                    <h2>This only works with ethereum Mainnet and Goerli</h2>
                </div>
                <ul class="nav nav-tabs">
                    <li class="nav-item" v-on:click="toggleSections">
                        <a
                            class="nav-link"
                            :class="{ active: firstSectionOpened }"
                            >Automated input (easy mode)</a
                        >
                    </li>
                    <li class="nav-item" v-on:click="toggleSections">
                        <a
                            class="nav-link"
                            :class="{ active: !firstSectionOpened }"
                            >Manual input (advanced mode)</a
                        >
                    </li>
                </ul>
                <Transition mode="out-in">
                    <AutomatedInput
                        v-if="firstSectionOpened"
                        :isMainnet="isMainnet()"
                    />
                    <ManualInput v-else :isMainnet="isMainnet()" />
                </Transition>
            </div>
            <div v-else>
                <h1>Please install a wallet like metamask</h1>
            </div>
        </div>
    </div>
</template>
<script>
import ManualInput from '@/components/l1l2/ManualInput.vue'
import AutomatedInput from '@/components/l1l2/AutomatedInput.vue'

export default {
    components: {
        ManualInput,
        AutomatedInput,
    },
    data() {
        return {
            firstSectionOpened: true,
        }
    },
    methods: {
        toggleSections() {
            this.firstSectionOpened = !this.firstSectionOpened
        },
        hasMetamask() {
            return window.ethereum != undefined
        },
        isMainnet() {
            return window.ethereum.networkVersion == 1
        },
    },
}
</script>
<style scoped>
h2 {
    text-align: center;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 400ms ease-out;
}

.title {
    margin-bottom: 24px;
}
</style>
