<template>
    <li class="list-group-item">
        {{ title }}
        <br />
        <CopyComponent
            :valueToCopy="dataBag.val"
            :isValid="dataBag.valid"
            :inFormat="dataBag.inFmt"
        />
    </li>
</template>

<script>
import CopyComponent from './CopyComponent'

export default {
    name: 'SimpleCopyComponent',
    components: {
        CopyComponent,
    },
    props: {
        dataBag: {
            val: String,
            isValid: {
                type: Boolean,
                default: true,
            },
            inFormat: {
                type: Boolean,
                default: true,
            },
        },
        title: String,
    },
}
</script>

<style scoped>
li {
    min-height: 85px;
}
</style>
