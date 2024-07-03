<template>
    <li class="list-group-item">
        {{ title }}
        <Toggle
            v-model="selectorHex"
            onLabel="hex"
            offLabel="dec"
            class="float-right"
        />
        <br />
        <div>
            <CopyComponent
                :key="item"
                v-for="item in itemsToRender"
                :valueToCopy="item"
                :isValid="dataBag.valid"
                :inFormat="dataBag.inFmt"
            />
        </div>
    </li>
</template>

<script>
import CopyComponent from './CopyComponent'
import Toggle from '@vueform/toggle'

export default {
    name: 'ToggleComponent',
    components: {
        CopyComponent,
        Toggle,
    },
    computed: {
        itemsToRender() {
            return this.selectorHex
                ? this.dataBag.hexValues
                : this.dataBag.intValues
        },
    },
    props: {
        dataBag: {
            intValues: [String],
            hexValues: [String],
            valid: {
                type: Boolean,
                default: true,
            },
            inFmt: {
                type: Boolean,
                default: true,
            },
        },
        title: String,
    },
    data() {
        return {
            selectorHex: true,
        }
    },
}
</script>

<style src="@vueform/toggle/themes/default.css"></style>
