import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Icons
import { faBezierCurve, faBridgeCircleCheck, faCaretDown, faCaretUp, faCircleCheck, faPaperPlane, faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faCircleCheck, faCaretUp, faCaretDown, faRightLeft, faBezierCurve, faPaperPlane, faBridgeCircleCheck);
library.add(faGithub);


import "./assets/scss/argon.scss";


const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(store);

appInstance.component('fa-icon', FontAwesomeIcon)

appInstance.mount("#app");