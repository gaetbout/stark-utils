<template>
  <div class="pt-6">
    <h1 class="pt-4 text-center">Stark-utils</h1>
    <h2 class="text-center">A Cairo toolbox</h2>
    <div class="text-center sm-6 pt-5">
      <router-link to="/converter">Open converter</router-link>
    </div>
  </div>
</template>
<script></script>
<style scoped>
h1 {
  font-size: 8vw;
  color: var(--font-white-color);
}

h2 {
  color: var(--font-white-color);
  font-size: 3vw;
}

a {
  padding: 20px;
  font-size: 1.5vw;
  background-color: var(--secondary-color);
  border-radius: 10px;
  text-decoration: none;
  color: var(--font-white-color);
  transition: all 200ms ease-in;
}

a:hover {
  font-size: 1.8vw;
  background-color: var(--secondary-color-hover);
  color: hsl(0, 0%, 100%);
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
