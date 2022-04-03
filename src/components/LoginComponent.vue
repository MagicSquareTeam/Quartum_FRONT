<template>
  <div class="col-md-12">
    <div class="card card-container">
      <q-form @submit="sendLoginRequest">
        <!--todo сравнение на regex логина/почты-->
        <q-input
          v-model="user.login"
          filled
          lazy-rules
          label="Имя пользователя/email"
          :rules="[val => val && val.length > 5 || 'Проверьте корректность']"
        />
        <q-input
          v-model="user.password"
          type="password"
          filled
          lazy-rules
          label="Пароль"
          :rules="[val => val && val.length > 5 || 'Проверьте корректность']"
        />
        <div class="flex">
          <span style="flex-grow: 1"></span>
          <q-btn :loading="loading" color="primary" style="width: 150px" type="submit" no-caps flat>
            Войти
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left"/>
              Загрузка...
            </template>
          </q-btn>
        </div>

      </q-form>
    </div>
  </div>
</template>
<script>

export default {
  name: "LoginComponent",
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      loading: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    sendLoginRequest() {
      this.loading = true
      setTimeout(() => {
        this.loginUser(this.user)
        this.loading = false
      }, 3000)
    },
    loginUser(user) {
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(message)
        }
      );
    },
  },
};
</script>

<style scoped>

</style>
