import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Icons
import {
    faHashtag,
    faRightLeft,
    faFileContract,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faHashtag)
library.add(faRightLeft)
library.add(faFileContract)
library.add(faGithub)

import './assets/scss/argon.scss'

const appInstance = createApp(App)
appInstance.use(router)
appInstance.use(store)

appInstance.component('fa-icon', FontAwesomeIcon)

appInstance.mount('#app')
