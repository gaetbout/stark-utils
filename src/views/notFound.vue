<template>
  <div class="pt-6">
    <h1 class="pt-4 text-center">Page not found</h1>
    <h2 class="pt-4 text-center">Proof incorrect</h2>
    <div class="text-center sm-6 pt-5">
      <a @click="goBack">Go back</a>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 6vw;
  color: var(--font-white-color);
}

h2 {
  color: var(--font-white-color);
  font-size: 4vw;
}

a {
  padding: 20px;
  font-size: 1.5vw;
  background-color: var(--secondary-color);
  border-radius: 10px;
  text-decoration: none;
  color: hsl(0, 0%, 95%) !important;
  transition: all 200ms ease-in;
}

a:hover {
  font-size: 1.8vw;
  background-color: var(--secondary-color-hover);
  color: var(--font-white-color-hover);
}

@media only screen and (max-width: 600px) {
  a {
    font-size: 1.5em;
  }

  a:hover {
    font-size: 2em;
  }

  h1 {
    font-size: 4em;
  }

  h2 {
    font-size: 2em;
  }
}
</style>
