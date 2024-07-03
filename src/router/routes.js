import Home from '@/views/Home.vue'
import Converter from '@/views/Converter.vue'
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
