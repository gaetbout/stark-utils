<template>
    <div class="card bg-secondary shadow border-0">
        <div class="card-header text-center">
            <h2>
                Convertor &nbsp;&nbsp; <fa-icon icon="fa-solid fa-right-left" />
            </h2>
        </div>
        <div class="card-body px-lg-5">
            <input
                v-model="input"
                type="text"
                class="form-control form mt-2 mb-4 text-center shadow"
                placeholder="input..."
            />
            <ul class="list-group mb-4">
                <SimpleCopyComponent :dataBag="outBNComp" title="felt:" />
                <SimpleCopyComponent :dataBag="outHexComp" title="hex:" />
                <SimpleCopyComponent :dataBag="outStringComp" title="string:" />
                <SimpleCopyComponent
                    :dataBag="feltArrayComp"
                    title="felt array:"
                />
                <ToggleComponent :dataBag="byteArrayComp" title="byte array:" />
                <ToggleComponent :dataBag="outSelectorComp" title="selector:" />
                <ToggleComponent
                    :dataBag="out256Comp"
                    title="uint256(low high):"
                />
                <ToggleComponent :dataBag="outBig3" title="Big3(d0 d1 d2):" />
            </ul>
        </div>
    </div>
</template>
<script>
import SimpleCopyComponent from '@/components/SimpleCopyComponent'
import ToggleComponent from '@/components/ToggleComponent.vue'
import utils from '@/utils'
import BN from 'bn.js'

export default {
    components: {
        SimpleCopyComponent,
        ToggleComponent,
    },
    data() {
        return {
            input: '',
            MAX_VAL: new BN(
                '3618502788666131106986593281521497120414687020801267626233049500247285301248',
                10
            ),
            MAX_VAL_HIGH: new BN('340282366920938463463374607431768211456', 10),
            MAX_VAL_D2: new BN('79228162514264337593543950336', 10),
        }
    },
    computed: {
        outBNComp() {
            const val = utils.toBN(this.input).toString(10)
            const inFmt = utils.isDecimal(this.input)
            const test = new BN(val)
            const valid = this.isLessThanMaxVal(test)
            return { val, valid, inFmt }
        },
        outHexComp() {
            let val = utils.toHex(this.input)
            const inFmt = this.isHexInput()
            const test = new BN(utils.toBN(val))
            const valid = this.isLessThanMaxVal(test)
            val = val.toString()
            return { val, valid, inFmt }
        },
        outStringComp() {
            const hex = utils.toHex(this.input).slice(2)
            if (!hex) return {}
            const val = hex
                .toString()
                .match(/.{1,2}/g)
                .reduce(
                    (acc, char) =>
                        acc + String.fromCharCode(parseInt(char, 16)),
                    ''
                )
            const test = new BN(Number(val))
            const valid = this.isLessThanMaxVal(test)
            return { val, valid }
        },
        feltArrayComp() {
            const val = this.input
                .split('')
                .reduce((acc, char) => acc + char.charCodeAt(0) + ',', '')
                .slice(0, -1)
            return { val }
        },
        byteArrayComp() {
            const intValues = this.input
                ? utils.toByteArray(this.input).split(',')
                : []
            console.log(intValues)
            return {
                intValues,
                hexValues: intValues.map((val) =>
                    utils.addHexPrefix(Number(val).toString(16))
                ),
                valid: true,
            }
        },
        outSelectorComp() {
            const val = utils.toSelector(this.input)
            const inFmt = !utils.isDecimal(this.input) && !this.isHexInput()
            const test = new BN(utils.toBN(val))
            const valid = this.isLessThanMaxVal(test)
            return {
                intValues: [val],
                hexValues: [utils.addHexPrefix(val.toString(16))],
                valid,
                inFmt,
            }
        },
        out256Comp() {
            const val256 = utils.to256(this.input)
            const intValues = [val256.low.toString(), val256.high.toString()]
            const hexValues = [
                utils.addHexPrefix(val256.low.toString(16)),
                utils.addHexPrefix(val256.high.toString(16)),
            ]
            const test = new BN(intValues[1])
            const valid = this.isLessThanMaxValHigh(test)
            return { intValues, hexValues, valid }
        },
        outBig3() {
            const valBig3 = utils.toBig3(this.input)
            const intValues = [
                valBig3.D0.toString(),
                valBig3.D1.toString(),
                valBig3.D2.toString(),
            ]
            const hexValues = [
                utils.addHexPrefix(valBig3.D0.toString(16)),
                utils.addHexPrefix(valBig3.D1.toString(16)),
                utils.addHexPrefix(valBig3.D2.toString(16)),
            ]
            const test = new BN(valBig3.D2)
            const valid = this.isLessThanMaxValD2(test)
            return { intValues, hexValues, valid }
        },
    },
    methods: {
        isLessThanMaxVal(input) {
            return input.lte(this.MAX_VAL)
        },
        isLessThanMaxValHigh(input) {
            return input.lte(this.MAX_VAL_HIGH)
        },
        isLessThanMaxValD2(input) {
            return input.lte(this.MAX_VAL_D2)
        },
        isHexInput() {
            return utils.startWith0xAndIsHex(this.input)
        },
    },
}
</script>

<style>
.list-group-item {
    overflow-x: auto;
    overflow-y: hidden;
}
</style>
