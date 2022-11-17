<template>
  <div class="app main-content min-vh-100">
    <Header />
    <div class="d-flex pt-1 pt-md-4 container-fluid" rel="preload">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-11 col-sm-12">
            <Router />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Router from "@/components/Router.vue";

export default {
  components: {
    Header,
    Router,
  },
};
</script>
<style>
* {
  --main-color: hsl(240, 47%, 29%);
  --secondary-color: hsl(14, 81%, 52%);
  --secondary-color-hover: hsl(14, 81%, 46%);
  --font-white-color: hsl(0, 0%, 95%);
  --font-white-color-hover: hsl(0, 0%, 100%);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* Styling toggle */
  --toggle-bg-off: var(--main-color);
  --toggle-bg-on: var(--secondary-color);
  --toggle-border-on: var(--secondary-color);
  --toggle-border-off: var(--main-color);
  --toggle-text-on: var(--font-white-color);
  --toggle-text-off: var(--font-white-color);
  --toggle-ring-color: var(--font-white-color);

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-content {
  background: var(--main-color);
}

h2 {
  margin-bottom: 0px !important;
}

.list-group-item {
  overflow-x: hidden !important;
}

button {
  color: var(--font-white-color) !important;
  background-color: var(--secondary-color) !important;
  border-color: var(--secondary-color) !important;
}

button:hover {
  color: var(--font-white-color-hover) !important;
  background-color: var(--secondary-color-hover) !important;
  border-color: var(--secondary-color-hover) !important;
}
</style>
