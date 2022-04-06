<template>
  <div class="col-md-12">
    <div class="card card-container">
      <q-form @submit="sendRegisterRequest">
        <!--todo сравнение на regex логина/почты-->
        <q-input
          v-model="user.username"
          filled
          lazy-rules
          label="Ваш логин"
          :rules="[val => val && val.length > 5 || 'Проверьте корректность']"
        />
        <q-input
          v-model="user.name"
          filled
          lazy-rules
          label="Имя"
          :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
        />
        <q-input
          v-model="user.surname"
          filled
          lazy-rules
          label="Фамилия"
          :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
        />
        <q-input
          v-model="user.email"
          type="email"
          filled
          lazy-rules
          label="Почта"
          :rules="[val => /(.+)@(.+){2,}\.(.+){2,}/.test(val) || 'Введите корректную почту']"
        />
        <q-input
          filled
          v-model="user.phoneNumber"
          label="Номер телефона"
          mask="+# - (###) - ### - ## - ##"
          lazy-rules
          fill-mask
          :rules="[val => ((val && val.length === '+# - (###) - ### - ## - ##'.length) || (!val)) || 'Проверьте корректность']"
          type="tel"
        />
        <q-input
          v-model="user.birthday"
          filled
          lazy-rules
          stack-label
          label="День рождения"
          type="date"
          :rules="[val => val && val.length > 5 || 'Проверьте корректность']"
        />
        <q-input
          v-model="user.password"
          filled
          lazy-rules
          label="Пароль"
          :rules="[val => val && val.length > 5 || 'Проверьте корректность']"
        />
        <q-input
          v-model="confirmPassword"
          type="password"
          filled
          lazy-rules
          label="Подтвердите пароль"
          :rules="[val => val && val === user.password || 'Пароли не совпадают']"
        />
        <div class="flex">
          <span style="flex-grow: 1"></span>
          <q-btn :loading="loading" color="primary" style="width: 150px" type="submit" no-caps flat>
            Зарегистрироваться
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
  name: "RegisterComponent",
  data() {
    return {
      user: {
        username: '',
        name: '',
        surname: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        password: ''
      },
      confirmPassword: '',
      loading: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },
  methods: {
    sendRegisterRequest() {
      this.loading = true
      setTimeout(() => {
        this.registerUser(this.user)
        this.loading = false
      }, 3000)
    },
    registerUser(user) {
      user.phoneNumber = user.phoneNumber.match(/\d+/g).join('')
      console.log(user.phoneNumber)
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
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
