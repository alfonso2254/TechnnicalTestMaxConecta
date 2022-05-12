
<template>
  <div class="
      backgroundColor
      min-h-screen
      flex
      items-center
      justify-center
      bg-green-105
      py-12
      px-4
      sm:px-6
      lg:px-8
    ">
    <div class="
        max-w-md
        w-full
        space-y-8
        px-4
        z-10
        bg-white
        p-5
        border
        rounded-lg
        text-black
      ">
      <div>
        <div>
          <div class="
              border border-white
              rounded-lg
              border-gray-500
              w-2/3
              mx-auto
              p-2
            ">
            <h2 class="text-center text-3xl font-extrabold m-auto">
              To Do App
            </h2>
          </div>
          <h2 class="mt-3 text-center text-2xl font-bold">Log in</h2>
        </div>

        <vs-input v-model="email" label-placeholder="Email" class="block w-full my-8 shadow-md rounded-md text-black"
          @keyup.enter="login" state="dark">
          <template #icon>
            <user-icon size="1.5x" class="custom-class"></user-icon>
          </template>
        </vs-input>

        <vs-input class="block w-full shadow-ms rounded-xl mb-3 text-black" type="password" v-model="password"
          label-placeholder="Password" :visiblePassword="hasVisiblePassword"
          @click-icon="hasVisiblePassword = !hasVisiblePassword" @keyup.enter="login" state="dark">
          <template #icon>
            <lock-icon v-if="!hasVisiblePassword" size="1.5x" class="custom-class"></lock-icon>
            <unlock-icon v-else size="1.5x" class="custom-class"></unlock-icon>
          </template>
        </vs-input>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <vs-checkbox v-model="remember_me">remember me</vs-checkbox>
          </div>

          <div class="text-sm">
            <a href="#">¿Did you forget your password?</a>
          </div>
        </div>

        <div class="footer mt-5">
          <vs-button class="block w-full" @click="login" :loading="loadingIngresar">
            Ingresar
          </vs-button>
          <div class="text-center mt-5 text-primary">
            <router-link :to="{ name: 'Register' }">Check in</router-link>
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
    hasVisiblePassword: false,
    remember_me: true,
    email: "",
    password: "",
    loadingIngresar: false,
  }),
  methods: {
    async login() {
      try {
        if (this.email.length < 1 || this.password.length < 1) {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            title: "You must enter the data",
          });
          return 0;
        }
        this.loadingIngresar = true;
        await this.$store.dispatch("Auth/login", {
          email: this.email,
          password: this.password,
          remember_me: this.remember_me,
        });

        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        if (error.response.status == 401) {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            title: "Incorrect data",
            text: `Incorrect data or you do not have access.`,
          });
        } else {
          this.$vs.notification({
            progress: "auto",
            color: "danger",
            title: "An error occurred",
            text: `error message 👉 ${error.response.data}`,
          });
        }
        console.log(error.response.status);
      } finally {
        this.loadingIngresar = false;
      }
    },
  },
};
</script>