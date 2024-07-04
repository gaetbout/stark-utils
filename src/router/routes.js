import Home from '@/views/Home.vue'
import Converter from '@/views/Converter.vue'
import Hash from '@/views/Hash.vue'
import Declare from '@/views/Declare.vue'
import NotFound from '@/views/notFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/converter',
        name: 'Converter',
        component: Converter,
    },
    {
        path: '/hash',
        name: 'Hash',
        component: Hash,
    },
    {
        path: '/declare',
        name: 'Declare',
        component: Declare,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/notFound',
    },
    {
        path: '/notFound',
        name: 'Page not found',
        component: NotFound,
    },
]

export default routes
