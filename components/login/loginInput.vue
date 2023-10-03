<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="emailcontainer">
                <label class="email">Email</label>
                <input type="text" placeholder="Enter Email" v-model="initialLogin.email" />
                <p>{{ errorMessage.email }}</p>
            </div>
            <div class="passwordcontainer">
                <label class="password">Password</label>
                <input type="password" placeholder="Enter Password" v-model="initialLogin.password" />
                <p>{{ errorMessage.password }}</p>
            </div>
            <button>Login</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "loginInput"
}
</script>

<script setup>
import { reactive } from "vue"
import { storeToRefs } from 'pinia'

import loginValidate from '../validators/login-validate'
import { authStore } from "~/store/auth-store"

const { login } = authStore()
const { isAuthenticated } = storeToRefs(authStore())

const initialLogin = {
    email: "",
    password: ""
}

const errorMessage = reactive({})

const onSubmit = async () => {
    try {
        console.log(initialLogin);
        const result = loginValidate(initialLogin)
        if (result) {
            errorMessage.email = result.email
            errorMessage.password = result.password
            return console.log(errorMessage);
        }

        await login(initialLogin)

        if (isAuthenticated) {
            navigateTo("/information")
        }

        alert("Welcome !!")
    } catch (error) {
        alert("Please Try again !!!")
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 16px;
}

.emailcontainer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 18px;
    font-weight: bold;
}

.passwordcontainer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 18px;
    font-weight: bold;
}

input {
    width: 24vw;
    height: 28px;
    padding: 6px 0 6px 10px;
    font-size: 16px;
}

p {
    color: red;
    font-size: 12px;
    margin-top: 0;
}

button {
    width: 6vw;
    height: 4vh;
    border: none;
    border-radius: 6px;
    background: #87CDA3;
    color: white;
}

button:hover {
    border: 1px solid lightgray;
    background: white;
    color: #87CDA3;
}
</style>