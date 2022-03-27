<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal class="flex">
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">Mayank Patel</div>
              <div class="text-caption text-grey">
                Profile status
              </div>
            </q-card-section>

            <q-card-section class="col-5" style="flex-grow: 1">
              <q-img
                class="rounded-borders float-right"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                style="max-width: 200px; max-height: 200px"
              />
            </q-card-section>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="user.first_name"
                label="Name"
                :readonly="!isProfileEditing"
              />
              
              <div class="flex">
                <div style="flex-grow: 1"></div>
                <q-btn :disable="isProfileEditing" v-if="!isProfileEditing" flat color="primary" label="Изменить" no-caps @click="editProfileData"/>
                <q-btn :disable="!isProfileEditing" v-if="isProfileEditing" flat color="primary" label="Отменить" no-caps @click="cancelEditProfileDataBtn"/>
                <q-btn :disable="!isProfileEditing" v-if="isProfileEditing" flat color="primary" label="Сохранить" no-caps @click="saveProfileDataBtn"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>

          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageProfile",
  data() {
    return {
      isProfileEditing: false,
      user: {
        first_name: 'Mayank',
        last_name: 'Patel',
        age: 30,
        email: 'm******@****.com',
        phone: '98******23'
      },
    }
  },
  methods: {
    editProfileData(){
      console.log("Edit profile data")
      this.isProfileEditing = true;
    },
    cancelEditProfileDataBtn(){
      console.log("Cancel edit profile data")
      this.isProfileEditing = false;
    },
    saveProfileDataBtn(){
      console.log("Save profile data")
      this.isProfileEditing = false;
    }
  }
}
</script>

<style scoped>

</style>
