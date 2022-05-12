<template>
  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
    <q-card flat bordered>
      <q-card-section horizontal class="flex">
        <q-card-section class="q-pt-xs col-7">
          <q-card-section class="text-h5 q-mt-sm q-mb-xs">{{ user.surname }} {{ user.name }} {{
              user.patronymic
            }}
          </q-card-section>
          <q-card-section class="text-caption text-grey" style="white-space: normal">
            {{ user.status }}
          </q-card-section>
          <q-separator/>
          <q-card-section>
            {{ user.about }}
          </q-card-section>
        </q-card-section>

        <q-card-section class="col-5" style="flex-grow: 1">
          <q-img
            class="rounded-borders float-right"
            src="https://cdn.quasar.dev/img/boy-avatar.png"
            style="max-width: 200px; max-height: 200px"
          />
        </q-card-section>
      </q-card-section>
      <q-separator></q-separator>
      <q-form
        class="q-gutter-md q-ma-sm"
        @submit="submitChangeSec"
      >
        <!--todo проверка на существующие логины и пароли-->
        <q-input
          filled
          v-model="editedUser.username"
          label="Логин"
          :readonly="!isProfileSecEditing"
          lazy-rules
          :rules="[val => val && val.length > 5 || 'Длина логина должна быть более 5 символов']"
        />
        <q-input
          filled
          v-model="editedUser.email"
          label="Почта"
          :readonly="!isProfileSecEditing"
          type="email"
          lazy-rules
          :rules="[val => /(.+)@(.+){2,}\.(.+){2,}/.test(val) || 'Введите корректную почту']"
        />
        <div class="flex">
          <div style="flex-grow: 1"></div>
          <q-btn :disable="isProfileSecEditing" v-if="!isProfileSecEditing" flat color="primary"
                 label="Изменить личные данные"
                 no-caps @click="isProfileSecEditing = true"/>
          <q-btn :disable="!isProfileSecEditing" v-if="isProfileSecEditing" flat color="primary" label="Отменить"
                 no-caps @click="resetEditSecDataBtn"/>
          <q-btn :disable="!isProfileSecEditing" v-if="isProfileSecEditing" flat color="primary" label="Сохранить"
                 type="submit"
                 no-caps/>
        </div>
      </q-form>
      <q-separator/>
      <!--todo проверка сравнения паролей на фронте или беке-->
      <q-form
        class="q-gutter-md q-ma-sm"
        @submit="submitChangePassword"
      >
        <q-input
          filled
          v-model="editedUser.oldPassword"
          label="Введите старый пароль"
          :readonly="!isPasswordEditing"
          type='password'
          v-if="this.isPasswordEditing"
          lazy-rules
          :rules="[val => val === user.password || 'Пароли не совпадают']"
        >
        </q-input>
        <!--todo добавить метод проверки паролей через regexp-->
        <q-input
          filled
          v-model="editedUser.newPassword"
          label="Введите новый пароль"
          :readonly="!isPasswordEditing"
          type="password"
          v-if="this.isPasswordEditing"
          :rules="[val => val && val.length > 5 || 'Пароль должен быть более 5 символов']"
        />
        <q-input
          filled
          v-model="editedUser.confirmPassword"
          label="Подтвердите новый пароль"
          :readonly="!isPasswordEditing"
          type='password'
          v-if="this.isPasswordEditing"
          lazy-rules
          :rules="[val => val === editedUser.newPassword || 'Пароль не совпадает']"
        >
        </q-input>
        <div class="flex">
          <div style="flex-grow: 1"></div>
          <q-btn :disable="isPasswordEditing" v-if="!isPasswordEditing" flat color="primary" label="Изменить пароль"
                 no-caps @click="this.isPasswordEditing = true"/>
          <q-btn :disable="!isPasswordEditing" v-if="isPasswordEditing" flat color="primary" label="Отменить"
                 no-caps @click="resetChangePassword"/>
          <q-btn :disable="!isPasswordEditing" v-if="isPasswordEditing" flat color="primary" label="Сохранить"
                 type="submit"
                 no-caps/>
        </div>
      </q-form>
    </q-card>
    <q-uploader
      accept="image/*"
      label="Обновите фото профиля"
      auto-upload
      url="http://localhost:8080/api/media/upload/profilePhoto"
    />
  </div>
  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
    <q-card>
      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="submitChangeUserData"
        >
          <q-input
            filled
            v-model="user.name"
            label="Имя"
            :readonly="!isProfileInfoEditing"
            lazy-rules
            :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
          />
          <q-input
            filled
            v-model="user.surname"
            label="Фамилия"
            :readonly="!isProfileInfoEditing"
            lazy-rules
            :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
          />
          <q-input
            filled
            v-model="user.patronymic"
            label="Отчество"
            :readonly="!isProfileInfoEditing"
            lazy-rules
            :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
          />
          <q-input
            filled
            v-model="user.status"
            label="Статус"
            :readonly="!isProfileInfoEditing"
            autogrow
            maxlength="300"
            counter
          />
          <q-input
            filled
            v-model="user.about"
            label="Обо мне"
            :readonly="!isProfileInfoEditing"
            autogrow
            maxlength="1000"
            counter
          />
          <q-input
            filled
            stack-label
            v-model="user.birthday"
            label="День рождения"
            :readonly="!isProfileInfoEditing"
            type="date"
          />
          <!--todo пофиксить на рефреше некорректное поведение (да что с тобой не так)-->
          <q-input
            filled
            v-model="user.phoneNumber"
            label="Номер телефона"
            :readonly="!isProfileInfoEditing"
            mask="+# - (###) - ### - ## - ##"
            lazy-rules
            fill-mask
            :rules="[val => ((val && val.length === '+# - (###) - ### - ## - ##'.length) || (!val)) || 'Проверьте корректность']"
            type="tel"
          />

          <div class="flex">
            <div style="flex-grow: 1"></div>
            <q-btn :disable="isProfileInfoEditing" v-if="!isProfileInfoEditing" flat color="primary"
                   label="Изменить"
                   no-caps @click="isProfileInfoEditing = true"/>
            <q-btn :disable="!isProfileInfoEditing" v-if="isProfileInfoEditing" flat color="primary"
                   label="Отменить"
                   no-caps @click="resetChangeUserData"/>
            <q-btn :disable="!isProfileInfoEditing"
                   v-if="isProfileInfoEditing"
                   flat color="primary"
                   type="submit"
                   label="Сохранить"
                   @click="saveUserData"
                   no-caps/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {Notify} from "quasar";
import UserService from "src/services/user.service";
import {MediaService} from "src/services/media.service";

export default {
  name: "ProfileInfoComponent",
  data() {
    // let user = {
    //   name: 'Имя',
    //   surname: 'Фамилия',
    //   patronymic: "Отчество",
    //   username: "Username1",
    //   password: "MyPASSword",
    //   oldPassword: "",
    //   newPassword: "",
    //   confirmPassword: "",
    //   email: "email@luga.ru",
    //   birthday: '2000-05-19',
    //   about: "Все обо мне",
    //   status: 'Верни шаверму',
    //   photo: "",
    //   phoneNumber: "88005553535"
    // }

    return {
      isProfileInfoEditing: false,
      isProfileSecEditing: false,
      isPasswordEditing: false,

      user: {
          name: '',
          surname: '',
          patronymic: '',
          username: '',
          password: '',
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          email: '',
          // email: this.$store.state.auth.user.email,
          birthday: '',
          about: '',
          status: '',
          photo: '',
          phoneNumber: ''
        }
    }
  },
  computed: {
    // user(){
    //   // console.log(this.$store.state.auth.user)
    //   return this.$store.state.auth.user;
    // },
    editedUser(){
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    uploadProfilePhoto(file){
      return{
        url: 'http://localhost:8080/api/media/upload/profilePhoto',
        methods: 'POST',

      }
      // MediaService.uploadProfilePhoto(file)
    },
    getUserData(){
      UserService.getUserData(this.$store.state.auth.user.id).then(response => {
        this.user = response.data
        this.editedUser = response.data
      })
    },
    saveUserData(){
      console.log(this.user)
      UserService.saveUserData(this.user)
    },
    submitChangePassword() {
      this.user.password = this.editedUser.confirmPassword
      Notify.create({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-save',
        message: 'Пароль успешно изменен'
      })
      this.resetChangePassword()
    },
    submitChangeSec() {
      this.user.email = this.editedUser.email
      this.user.username = this.editedUser.username
      Notify.create({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-save',
        message: 'Данные успешно изменены'
      })
      this.resetEditSecDataBtn()
    },
    submitChangeUserData() {
      this.user.name = this.editedUser.name
      this.user.surname = this.editedUser.surname
      this.user.patronymic = this.editedUser.patronymic
      this.user.status = this.editedUser.status
      this.user.about = this.editedUser.about
      this.user.birthday = this.editedUser.birthday
      this.user.phoneNumber = this.editedUser.phoneNumber
      Notify.create({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-save',
        message: 'Данные успешно изменены'
      })
      this.resetChangeUserData()
    },
    resetChangeUserData() {
      this.isProfileInfoEditing = false
      this.editedUser.name = this.user.name
      this.editedUser.surname = this.user.surname
      this.editedUser.patronymic = this.user.patronymic
      this.editedUser.status = this.user.status
      this.editedUser.about = this.user.about
      this.editedUser.birthday = this.user.birthday
      this.editedUser.phoneNumber = this.user.phoneNumber
    },
    resetChangePassword() {
      this.isPasswordEditing = false
      this.isPwd1 = true
      this.isPwd2 = true
      this.editedUser.newPassword = ""
      this.editedUser.confirmPassword = ""
      this.editedUser.oldPassword = ""
    },
    resetEditSecDataBtn() {
      this.isProfileSecEditing = false
      this.editedUser.email = this.user.email
      this.editedUser.username = this.user.username
    }
  }
}
</script>

<style scoped>

</style>
