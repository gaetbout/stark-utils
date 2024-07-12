<template>
    <header>
        <div :class="getHeaderClass" class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-lg-8 col-md-11 col-sm-12">
                    <router-link to="/"
                        ><img src="img/brand/favicon.png" alt="Logo"
                    /></router-link>
                    <router-link to="/converter">Converter</router-link>
                    <router-link to="/hash">Hash</router-link>
                    <router-link to="/declare">Declare</router-link>
                    <div class="topnav-right">
                        <a
                            href="https://github.com/gaetbout/stark-utils"
                            target="_blank"
                        >
                            <fa-icon :icon="['fab', 'github']" size="2x" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    computed: {
        getHeaderClass() {
            if (this.$route.name === 'Home') {
                if (this.$router.options.history.state.replaced) {
                    return 'invisible'
                }
                return 'hide'
            }
            return 'show'
        },
    },
}
</script>

<style scoped>
img {
    width: 32px;
    height: 32px;
}

a {
    margin: 5px;
    float: left;
    color: var(--font-white-color);
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    border-radius: 10px;
    transition: all 200ms ease-in;
}

a:hover {
    background-color: var(--secondary-color);
    color: var(--main-color);
}

a.active {
    background-color: var(--secondary-color);
    color: var(--font-white-color);
    border-radius: 10px;
}

.topnav-right {
    float: right;
}

.invisible {
    opacity: 0;
}

.hide {
    opacity: 0;
    animation: fadeout 400ms ease-out;
}

@media screen and (max-width: 600px) {
    a,
    .topnav-right {
        float: none;
        display: block;
    }

    .hide,
    .invisible {
        position: absolute;
    }
}

.show {
    visibility: visible;
    animation: fadein 400ms ease-in;
}

/* Animation */
@-webkit-keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(-100px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes fadein {
    from {
        opacity: 0;
        transform: translateY(-100px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@-webkit-keyframes fadeout {
    from {
        opacity: 1;
        transform: translateY(0px);
    }

    to {
        opacity: 0;
        transform: translateY(-100px);
    }
}

@keyframes fadeout {
    from {
        opacity: 1;
        transform: translateY(0px);
    }

    to {
        opacity: 0;
        transform: translateY(-100px);
    }
}
</style>
