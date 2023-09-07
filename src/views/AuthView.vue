<template>
    <div class="auth-form">
        <div class="tabs is-centered">
            <ul>
                <li :class="{ 'is-active' : !register}"><a @click.prevenet="register=false">Login</a></li>
                <li :class="{ 'is-active' : register}"><a @click.prevent="register=true">Register</a></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        <form @submit.prevent="onSubmit">
            <div class="card auth-form">
                <div class="card-content">
                    <div class="title has-text-centered">{{ formTitle }}</div>
                    <div class="content">
                        <div class="field">
                            <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="E-mail Adress" v-model="credentials.email">
                        </div>
                    </div>
                    <div class="content">
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" placeholder="Password" v-model="credentials.password">
                            </div>
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                    <p class="control">
                        <button class="button is-danger">
                        {{ formTitle }}
                        </button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '../store/AuthStore'

const register = ref(false)

const authStore = useAuthStore()

const credentials = reactive({
    email: '',
    password: ''
})

const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login'
})

const onSubmit = () => {
    if ( !credentials.email || !credentials.password) {
        alert('Please insert E-mail and Password')
        return
    }

    if (register.value) {
        authStore.registerUser(credentials)
    } else {
        authStore.loginUser(credentials)
    }
}
</script>

<style scoped>
    .auth-form {
        max-width: 30rem;
        margin: 0 auto;
    }
</style>