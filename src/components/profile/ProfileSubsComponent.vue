<template>
  <!--todo add scrolling-->
  <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
    <q-card>
      <q-card-section>
        <q-item-label class="text-h6 text-weight-bold text-center">Ваши подписки</q-item-label>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-2 q-pa-sm row justify-center items-center">
          <q-item-label>Теги</q-item-label>
        </q-card-section>
        <q-separator vertical></q-separator>
        <q-card-section class="col-7 row items-center">
          <q-item-label>
                <span v-for="(tag, index) in subtags" :key="tag">
                {{ tag }}<span v-if="index !== subtags.length - 1">, </span></span>
          </q-item-label>
        </q-card-section>
        <q-separator vertical></q-separator>
        <q-card-section class="col-2">
          <q-btn flat color="primary" label="Изменить" no-caps @click="editTagDialog = true"/>
        </q-card-section>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section>
        <q-input square clearable filled v-model="searchUser" class="q-pa-sm" @clear="this.searchUser = ''">
          <template v-slot:prepend>
            <q-icon name="fas fa-search"/>
          </template>
        </q-input>
        <q-list>
          <q-item class="flex row justify-center items-center" v-for="user in filteredUsers" :key="user.id">
            <q-item-section avatar top>
              <q-img
                class="rounded-borders float-right"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
                style="max-width: 200px; max-height: 200px"
              />
            </q-item-section>

            <q-item-section top class="col-2" style="flex-grow: 1">
              <q-item-label class="q-mt-sm">{{ user.username }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn size="12px" flat dense round icon="delete" @click="openConfirmDeleteUserDialog(user.id)"/>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!--todo add cancel button and logic (maybe)-->
    <q-dialog v-model="editTagDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Редактирование подписок на теги</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-for="tag in alltags" :key="tag">
            <q-checkbox v-model="subtags" :val="tag" :label="tag"></q-checkbox>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDeleteUserFromSubs" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-user-times" color="primary" text-color="white"/>
          <span
            class="q-ml-sm">Вы действительно хотите убрать подписку на пользователя {{
              this.deleteUser.username
            }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup/>
          <q-btn flat label="Удалить" color="primary" @click="deleteUserFromSubs(this.deleteUser.id)"
                 v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ProfileSubsComponent",
  data() {
    let subtags = ["Tag #1", "Tag #3"]
    let alltags = ["Tag #1", "Tag #2", "Tag #3", "Tag #4"]
    let subusers = [
      {
        id: 1,
        username: "User1"
      },
      {
        id: 2,
        username: "User2"
      },
      {
        id: 3,
        username: "User3"
      },
    ]

    return {
      alltags, subtags, subusers,
      editTagDialog: ref(false),
      confirmDeleteUserFromSubs: ref(false),
      deleteUser: {
        id: -1,
        username: null
      },
      searchUser: ""
    }
  },
  methods: {
    deleteUserFromSubs(id) {
      for (let i = 0; i < this.subusers.length; i++) {
        if (this.subusers[i].id === id) {
          this.subusers.splice(i, 1)
          break
        }
      }
      this.deleteUser.id = -1
      this.deleteUser.username = null
    },
    openConfirmDeleteUserDialog(id) {
      this.deleteUser.id = id;
      for (let i = 0; i < this.subusers.length; i++) {
        if (this.subusers[i].id === id) {
          this.deleteUser.username = this.subusers[i].username
          break
        }
      }
      this.confirmDeleteUserFromSubs = true;
    }
  },
  computed: {
    filteredUsers() {
      return this.subusers.filter(user => {
        return user.username.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1;
      })
    }
  }
}
</script>

<style scoped>

</style>
