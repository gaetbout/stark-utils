import { ec, defaultProvider, Provider, stark } from 'starknet'
import utils from '@/utils'

const state = {
    privateKey: '',
    publicKeyX: '',
    publicKeyY: '',
    txStatus: '',
    txSuccess: false,
    outputs: [],
}

const getters = {
    privateKey: (state) => state.privateKey,
    publicKeyX: (state) => state.publicKeyX,
    publicKeyY: (state) => state.publicKeyY,
    txStatus: (state) => state.txStatus,
    txSuccess: (state) => state.txSuccess,
    outputs: (state) => state.outputs,
}

const actions = {
    async checkTx({ commit }, data) {
        let stat
        let sty = false
        if (data.is_testnet) {
            stat = await defaultProvider.getTransactionStatus(data.txHash)
        } else {
            const prov = new Provider({ network: 'mainnet-alpha' })
            stat = await prov.getTransactionStatus(data.txHash)
        }
        if (
            stat.tx_status === 'ACCEPTED_ON_L1' ||
            stat.tx_status === 'ACCEPTED_ON_L2' ||
            stat.tx_status === 'RECIEVED'
        ) {
            sty = true
        }
        commit('setTxStatus', stat.tx_status)
        commit('setTxSuccess', sty)
    },
    async callContract({ commit }, data) {
        let cd = {
            contract_address: data.contract,
            entry_point_selector: stark.getSelectorFromName(data.entry),
        }

        const inArr = data.inputs.split(',').filter((elem) => {
            const tElem = utils.toBN(elem)
            if (tElem !== '') {
                return tElem
            }
        })
        if (inArr.length > 0) {
            cd.calldata = inArr
        }
        if (data.is_testnet) {
            let stat = await defaultProvider.callContract(cd)
            if (stat.result) {
                commit('setCallOutput', stat.result)
            }
        } else {
            const prov = new Provider({ network: 'mainnet-alpha' })
            let stat = await prov.callContract(cd)
            if (stat.result) {
                commit('setCallOutput', stat.result)
            }
        }
    },
    getStarkKey({ commit }) {
        const pair = ec.genKeyPair()
        const privatekey = utils.addHexPrefix(pair.getPrivate('hex'))

        commit('setPrivateKey', privatekey)
        commit(
            'setPubX',
            utils.addHexPrefix(pair.getPublic().getX().toString(16))
        )
        commit(
            'setPubY',
            utils.addHexPrefix(pair.getPublic().getY().toString(16))
        )
    },
}

const mutations = {
    setPrivateKey(state, priv) {
        state.privateKey = priv
    },
    setPubX(state, pubX) {
        state.publicKeyX = pubX
    },
    setPubY(state, pubY) {
        state.publicKeyY = pubY
    },
    setTxStatus(state, stat) {
        state.txStatus = stat
    },
    setTxSuccess(state, style) {
        state.txSuccess = style
    },
    setCallOutput(state, co) {
        state.outputs = co
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
