<template>
    <div class="
      backgroundColor
      bg-gray-500
      min-h-screen
      flex
      items-center
      justify-center
      bg-green-105
      py-12
      px-4
      sm:px-6
      lg:px-8
      text-white
    ">
        <div class="
        max-w-md
        w-full
        space-y-8
        z-10
        p-5
        bg-white
        border
        rounded-lg
        text-black
      ">
            <div>
                <div>
                    <div class="border border-gray-500 rounded-lg w-2/3 mx-auto p-2">
                        <h2 class="text-center text-3xl font-extrabold m-auto">
                            To Do App
                        </h2>
                    </div>
                    <h2 class="mt-3 text-center text-2xl font-bold">New account</h2>
                </div>

                <vs-input v-model="name" label-placeholder="Name" class="block w-full my-8 text-black" state="dark">
                    <template #icon>
                        <user-icon size="1.5x" class="custom-class"></user-icon>
                    </template>
                </vs-input>

                <vs-input v-model="email" label-placeholder="Email" class="block w-full my-8 text-black" state="dark">
                    <template #icon>
                        <user-icon size="1.5x" class="custom-class"></user-icon>
                    </template>
                </vs-input>

                <vs-input class="block w-full mb-8 text-black" type="password" v-model="password"
                    label-placeholder="Password" :progress="getProgress" :visiblePassword="hasVisiblePassword"
                    @click-icon="hasVisiblePassword = !hasVisiblePassword" state="dark">
                    <template #icon>
                        <lock-icon v-if="!hasVisiblePassword" size="1.5x" class="custom-class"></lock-icon>
                        <unlock-icon v-else size="1.5x" class="custom-class"></unlock-icon>
                    </template>
                    <template v-if="getProgress >= 100" #message-success>
                        Secure Password
                    </template>
                </vs-input>
                <vs-input class="block w-full mb-3 text-black" type="password" v-model="passwordConfirme"
                    label-placeholder="Password" :visiblePassword="hasVisiblePassword"
                    @click-icon="hasVisiblePassword = !hasVisiblePassword" state="dark">
                    <template #icon>
                        <lock-icon v-if="!hasVisiblePassword" size="1.5x" class="custom-class"></lock-icon>
                        <unlock-icon v-else size="1.5x" class="custom-class"></unlock-icon>
                    </template>
                </vs-input>

                <vs-alert v-model="validatePassword" closable color="danger">
                    Password do not match.
                </vs-alert>

                <div class="footer mt-5">
                    <vs-button :loading="loadingRegister" @click="register" class="block w-full">
                        Check in
                    </vs-button>
                    <div class="text-center mt-5 text-primary">
                        <router-link :to="{ name: 'Login' }">Log in</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { UserIcon, UnlockIcon, LockIcon } from "vue-feather-icons";
export default {
    components: {
        UserIcon,
        UnlockIcon,
        LockIcon,
    },
    data: () => ({
        name: "",
        email: "",
        password: "",
        passwordConfirme: "",
        hasVisiblePassword: false,
        loadingRegister: false,
    }),
    computed: {
        getProgress() {
            let progress = 0;
            if (/\d/.test(this.password)) {
                progress += 20;
            }
            if (/(.*[A-Z].*)/.test(this.password)) {
                progress += 20;
            }
            if (/(.*[a-z].*)/.test(this.password)) {
                progress += 20;
            }
            if (this.password.length >= 6) {
                progress += 20;
            }
            if (/[^A-Za-z0-9]/.test(this.password)) {
                progress += 20;
            }
            return progress;
        },
        validatePassword() {
            return this.password !== this.passwordConfirme;
        },
    },
    methods: {
        async register() {
            try {
                if (
                    this.email.length === 0 ||
                    this.name.length === 0 ||
                    this.password.length === 0
                ) {
                    this.$vs.notification({
                        progress: "auto",
                        color: "danger",
                        title: "You must enter the data",
                    });
                    return 0;
                }
                this.loadingRegister = true;
                await this.$store.dispatch("Auth/signup", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                await this.$store.dispatch("Auth/login", {
                    email: this.email,
                    password: this.password,
                });
                this.$vs.notification({
                    progress: "auto",
                    color: "success",
                    title: "Successful",
                    text: `Successfully registered user.`,
                });
                this.$router.push({ name: "Dashboard" });
            } catch (error) {
                this.$vs.notification({
                    progress: "auto",
                    color: "danger",
                    title: "An error occurred",
                    text: `Error message👉 ${error.message}`,
                });
                console.log(error.response.status);
            } finally {
                this.loadingRegister = false;
            }
        },
    },
};
</script>
<style lang="scss">
#backgroundColor {
    background-color: #283046;
}
</style>
