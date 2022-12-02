<template>
    <div class="align-center">
        <div class="loader-animation"></div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
}
</script>

<style scoped>
.align-center {
    margin-top: 32px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-animation {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid;
    position: relative;
    transform-origin: left;
    animation: h2 1s infinite linear;
}

.loader-animation::before,
.loader-animation::after {
    content: '';
    position: absolute;
    inset: 0 0 auto;
    margin: auto;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    border: 2px solid;
    transform-origin: 50% calc(100% - 4px);
    animation: inherit;
}

.loader-animation::after {
    inset: auto 0 calc(100% + 2px);
    animation-duration: 0.5s;
    animation-direction: reverse;
    transform-origin: 50% calc(200% - 2px);
}

@keyframes h2 {
    100% {
        transform: rotate(1turn);
    }
}
</style>
