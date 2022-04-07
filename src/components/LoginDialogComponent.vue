<template>
  <q-dialog>
    <q-card style="width: 1000px;">
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        no-caps
        :breakpoint="0"
      >
        <q-tab name="login" label="Логин"/>
        <q-tab name="registration" label="Регистрация"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginComponent/>
        </q-tab-panel>

        <q-tab-panel name="registration">
          <RegisterComponent/>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import LoginComponent from "components/LoginComponent";
import RegisterComponent from "components/RegisterComponent";

export default {
  name: "LoginDialogComponent",
  components: {RegisterComponent, LoginComponent},
  data() {
    return {
      tab: ref('login')
    }
  }
}
</script>

<style scoped>

</style>
