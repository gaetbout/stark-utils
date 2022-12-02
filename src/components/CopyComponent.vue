<template>
    <div
        v-if="valueToCopy && valueToCopy !== '0x'"
        :class="[
            isValid ? 'btn-outline-success' : 'btn-outline-danger',
            'btn btn-sm ',
        ]"
        @click="copy(valueToCopy)"
    >
        <fa-icon
            v-if="inFormat"
            class="text-success float-left"
            icon="fa-solid fa-circle-check"
        />
        {{ valueToCopy }}
    </div>
    <br />

    <div id="snackbar" v-show="showToast" class="show">Copied to clipboard</div>
</template>

<script>
export default {
    name: 'CopyComponent',
    data() {
        return {
            showToast: false,
        }
    },
    props: {
        valueToCopy: String,
        isValid: {
            type: Boolean,
            default: true,
        },
        inFormat: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        async copy(text) {
            this.showToast = true
            await navigator.clipboard.writeText(text)
            setTimeout(() => (this.showToast = false), 3000)
        },
    },
}
</script>

<style scoped>
#snackbar {
    visibility: hidden;
    min-width: 200px;
    margin-left: -125px;
    background-color: var(--secondary-color);
    color: var(--font-white-color);
    text-align: center;
    border-radius: 10px;
    padding: 12px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>
