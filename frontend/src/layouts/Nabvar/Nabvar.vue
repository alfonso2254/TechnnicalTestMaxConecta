
<template>
  <div class="center relative">
    <vs-navbar center-collapsed v-model="active" class="backgroundColorNabvar relative">
      <template #right>
        <vs-tooltip bottom not-hover v-model="activeTooltip1">
          <vs-avatar @click="activeTooltip1 = !activeTooltip1" badge-position="right" badge badge-color="success"
            class="my-2 mr-5" primary>
            <template #text> {{$store.state.Auth.userInfo.name}} </template>
          </vs-avatar>
          <template #tooltip>
            <div>
              <vs-button size="small" :active="activeTooltip1 == 3" @click="cerrarSession">
                Close session
              </vs-button>
            </div>
          </template>
        </vs-tooltip>
      </template>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: "guide",
    activeTooltip1: false,
  }),
  methods: {
    cerrarSession() {
      this.$store.dispatch("Auth/logout").then((response) => {
        this.$router.push({ name: "Login" });
      });
    },
  },
  mounted() {
    this.$vs.notification({
      progress: "auto",
      color: "success",
      title: "Exitoso",
      text: `Bienvenido ${this.$store.state.Auth.userInfo.name}.`,
    });
  },
};
</script>

        