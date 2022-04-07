<template>
  <q-layout view="lHr lpR lFr">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title class="text-weight-bold">
          <!--todo отцентрировать-->
          <div class="absolute-center">
            <q-icon
              id="icon1"
              :name="this.$route.meta.icon"
              class="q-pa-sm"
              size="sm"
              color="blue-grey-10"
            />
            <span class="gt-md">{{ $route.name }}</span>
          </div>
        </q-toolbar-title>

        <q-space></q-space>

        <div v-if="loggedIn">
          <q-btn flat rounded push icon="fas fa-plus"/>

          <q-btn-dropdown flat rounded push>
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-avatar size="42px">
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
              </div>
            </template>
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Профиль</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator color="black" inset/>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>Выйти</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-btn v-if="!loggedIn" flat rounded no-caps no-wrap align="center" push color="white" icon="fas fa-sign-in-alt" label="Вход" @click="openLoginDialog"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width="250">
      <div class="q-ma-md">
        <q-icon
          class="q-pa-sm icon-center"
          name="fab fa-codepen"
          size="lg"
          color="black"
        />
      </div>
      <q-list class="q-pa-md q-mt-xl">
        <q-item clickable v-ripple exact to="/">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-home"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Главная</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact to="/overview">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-stream"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Обзор</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact to="/profile">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-user-circle"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Профиль</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact to="/favourite">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-star"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Избранное</q-item-section>
        </q-item>
        <q-item clickable v-ripple exact to="/archive">
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-archive"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Архив</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above side="right" bordered :width="280">
      <div class="q-pa-md">
        <span class="text-weight-bold text-h6">Новое</span>
        <div style="min-width: 250px; max-width: 300px">
          <q-select
            @add="selectAddTag"
            @remove="selectRemoveTag"
            filled
            v-model="modelMultiple"
            multiple
            :options="options"
            use-chips
            stack-label
            label="Multiple selection"/>
        </div>
        <!--todo связь с бд для вывода первых ~5 записей по тегу-->
        <div class="q-pa-md" style="max-width: 350px">
          <q-list

          >
            <q-item

            >
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k"/>
              </q-item-section>
            </q-item>

            <q-separator spaced inset/>

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k"/>
              </q-item-section>
            </q-item>

            <q-separator spaced inset/>

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <LoginDialogComponent v-model="loginDialogOpened"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {ref} from 'vue'
import LoginDialogComponent from "components/LoginDialogComponent";

export default {
  components: {LoginDialogComponent},
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      btn_toggle: ref('one'),
      modelMultiple: ref(),
      loginDialogOpened: ref(false),

      options: [
        'Tag #1', 'Tag #2', 'Tag #3'
      ],

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    logout(){
      this.$store.dispatch("auth/logout").then(
        () => {
          this.$router.push("/overview");
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
      )
    },
    selectAddTag(tag) {
      console.log("added #" + tag.index + ": " + tag.value)
    },
    selectRemoveTag(tag) {
      console.log("removed #" + tag.index + ": " + tag.value)
    },
    openLoginDialog(){
      this.loginDialogOpened = true
    }
  },
  computed: {
    loggedIn(){
      return this.$store.state.auth.loggedIn
    }
  }
}
</script>

<style lang="sass">
.icon-center
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)

.my-custom-toggle
  border: 1px solid #027be3
</style>
