<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script></script>
<style>
/* Transition */
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: opacity 400ms ease-out;
}
</style>
