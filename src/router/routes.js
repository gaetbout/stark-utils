import Home from "@/views/Home.vue";
import Converter from "@/views/Converter.vue";
import L1L2 from "@/views/L1L2.vue";
import EC from "@/views/EC.vue";
import NotFound from "@/views/notFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/converter",
    name: "Converter",
    component: Converter,
  },
  {
    path: "/l1l2",
    name: "L1L2",
    component: L1L2,
  },
  {
    path: "/signature",
    name: "Elliptic curve",
    component: EC,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/notFound",
  },
  {
    path: "/notFound",
    name: "Page not found",
    component: NotFound,
  },
];

export default routes;
