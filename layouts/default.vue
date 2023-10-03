<template>
    <div>
        <header>
            <div>
                <NuxtLink to="/" class="logo">
                    Logo
                </NuxtLink>
            </div>
            <div class="links">
                <NuxtLink to="/login" class="login" v-if="isAuthenticated === false">
                    Login
                </NuxtLink>
                <div class="authIsTrue" v-else>
                    <NuxtLink to="/information" class="data" >
                        Data
                    </NuxtLink>
                    <div to="/" class="logout" @click="onLogout">
                        Logout
                    </div>
                </div>
                <!-- <div to="/" class="logout" @click="onLogout" v-else>
                    Logout
                </div> -->
            </div>
        </header>
    </div>
    <div>
        <slot />
    </div>
</template>

<script setup>
import { authStore } from "~/store/auth-store";
import {ref} from "vue"

const store = authStore()
const { logout } = authStore()

const isAuthenticated = ref(store.isAuthenticated)

watch(() => store.isAuthenticated, (newValue, oldValue) => {
    isAuthenticated.value = newValue
} )

const onClickInformation = () => {
    navigateTo("/information")
}

const onLogout = async () => {
    try {
        logout()
        navigateTo("/login")

    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>
header {
    border: 1px solid black;
    background: #F9DCDC;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 10vh;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
    color: black;
}

.links {
    display: flex;
    gap: 24px;
    font-size: 24px;
}

.login {
    text-decoration: none;
    color: #A33BC9;
    cursor: pointer;
}

.login:hover {
    color: red;
}

.authIsTrue {
    display: flex;
}

.logout {
    text-decoration: none;
    color: #A33BC9;
    cursor: pointer;
    margin: 0 0 0 18px;

}

.logout:hover {
    color: red;
}

.data {
    text-decoration: none;
    color: #A33BC9;
    cursor: pointer;
}

.data:hover {
    color: red;
}
</style>
