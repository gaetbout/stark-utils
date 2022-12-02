import { createStore } from 'vuex'
import util from '@/store/modules/util'
import stark from '@/store/modules/stark'

export default createStore({
    modules: {
        util,
        stark,
    },
})
