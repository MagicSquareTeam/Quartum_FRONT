<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                <q-btn :disable="isProfileEditing" v-if="!isProfileEditing" flat color="primary" label="Изменить"
                       no-caps @click="editProfileData"/>
                <q-btn :disable="!isProfileEditing" v-if="isProfileEditing" flat color="primary" label="Отменить"
                       no-caps @click="cancelEditProfileDataBtn"/>
                <q-btn :disable="!isProfileEditing" v-if="isProfileEditing" flat color="primary" label="Сохранить"
                       no-caps @click="saveProfileDataBtn"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
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
            <q-input square filled v-model="searchUser" class="q-pa-sm">
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
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-item-label class="text-h6 text-weight-bold text-center">Ваши статьи</q-item-label>
          </q-card-section>
          <q-card-section horizontal class="flex q-pa-sm q-pl-md">
            <q-input square filled v-model="searchArticle" class="col-3" style="flex-grow: 1">
              <template v-slot:prepend>
                <q-icon name="fas fa-search"/>
              </template>
            </q-input>
            <q-toggle class="col-3" v-model="showArchived" label="Показать архивные"></q-toggle>
          </q-card-section>
          <q-card-section>
            <q-list separator>
              <q-item class="flex" dense v-for="article in filteredArticles" :key="article.id">
                <q-item-section class="col-2 justify-center items-center text-center" side>
                  <q-item-label lines="3">{{ article.name }}</q-item-label>
                </q-item-section>

                <q-item-section class="col-4 justify-center items-center text-center">
                  <q-item-label lines="2">{{ article.tag }}</q-item-label>
                </q-item-section>

                <q-item-section class="col-2 justify-center items-center">
                  <div>
                    <q-icon name="far fa-star" color="primary" size="xs"></q-icon>
                    <span class="q-ma-sm">{{ article.stars }}</span>
                  </div>
                  <div>
                    <q-icon name="fas fa-smile-beam" color="primary" size="xs"></q-icon>
                    <span class="q-ma-sm">{{ article.rating }}</span>
                  </div>
                </q-item-section>

                <q-item-section class="col-3 justify-center items-center text-center" side>
                  <q-item-label lines="4">Создано: {{ article.created }}</q-item-label>
                  <q-item-label lines="4">Редакт.: {{ article.edited }}</q-item-label>
                </q-item-section>

                <q-item-section class="col-1 justify-center items-center text-center" side>
                  <q-btn size="13px" flat round color="primary" icon="fas fa-edit">
                    <q-tooltip class="orange-4">Редактировать</q-tooltip>
                  </q-btn>
                  <q-btn size="13px" flat round color="primary"
                         :icon="article.archived ? 'fas fa-folder-minus' : 'fas fa-folder-plus'"
                         @click="openConfirmArchiveArticleDialog(article.id, article.archived)">
                    <q-tooltip class="orange-4"><span v-if="!article.archived">Архивировать</span><span
                      v-if="article.archived">Разархивировать</span></q-tooltip>
                  </q-btn>
                  <q-btn size="13px" flat round color="primary" icon="fas fa-ban" @click="openConfirmDeleteArticleDialog(article.id)">
                    <q-tooltip class="orange-4">Удалить</q-tooltip>
                  </q-btn>
                </q-item-section>
                <q-badge v-if="article.archived" class="q-mt-sm" color="blue-grey-3" floating outline rounded
                         style="right: auto">Архивировано
                </q-badge>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-dialog v-model="confirmArchiveArticleDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar :icon="this.archiveArticle.archived ? 'fas fa-folder-minus' : 'fas fa-folder-plus'" color="primary" text-color="white"/>
              <span
                class="q-ml-sm">Вы действительно хотите <span v-if="this.archiveArticle.archived">раз</span>архивировать статью {{
                  this.archiveArticle.name
                }}?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Отмена" color="primary" v-close-popup/>
              <q-btn flat :label="this.archiveArticle.archived ? 'Разархивировать' : 'Архивировать'" color="primary"
                     @click="archiveToggleUserArticle(this.archiveArticle.id)"
                     v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirmDeleteArticleDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="fas fa-ban" color="primary" text-color="white"/>
              <span
                class="q-ml-sm">Вы действительно хотите удалить статью {{
                  this.deleteArticle.name
                }}?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Отмена" color="primary" v-close-popup/>
              <q-btn flat label="Удалить" color="primary" @click="deleteUserArticle(this.deleteArticle.id)"
                     v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import {ref} from 'vue'

export default {
  name: "PageProfile",
  data() {
    var subtags = ["Tag #1", "Tag #3"]
    var alltags = ["Tag #1", "Tag #2", "Tag #3", "Tag #4"]
    var subusers = [
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
    var articles = [
      {
        id: 1,
        name: "Статья 1",
        tag: "Тег статьи 1",
        stars: 10,
        rating: 19,
        created: "25 окт. 2021",
        edited: "20 мар. 2022",
        archived: false
      },
      {
        id: 2,
        name: "Статья 2",
        tag: "Тег статьи 2",
        stars: 0,
        rating: -15,
        created: "26 окт. 2021",
        edited: "21 мар. 2022",
        archived: true
      },
      {
        id: 3,
        name: "Статья 3",
        tag: "Тег статьи 3",
        stars: 5,
        rating: 100,
        created: "27 окт. 2021",
        edited: "22 мар. 2022",
        archived: false
      },
    ]

    return {
      isProfileEditing: false,
      showArchived: false,
      alltags, subtags, subusers, articles,
      editTagDialog: ref(false),
      confirmArchiveArticleDialog: ref(false),
      confirmDeleteArticleDialog: ref(false),
      confirmDeleteUserFromSubs: ref(false),
      // todo топорно, решить попроще
      deleteUser: {
        id: -1,
        username: null
      },
      deleteArticle: {
        id: -1,
        name: null
      },
      archiveArticle: {
        id: -1,
        name: null,
        archived: null
      },
      searchUser: "",
      searchArticle: "",
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
    editProfileData() {
      console.log("Edit profile data")
      this.isProfileEditing = true;
    },
    cancelEditProfileDataBtn() {
      console.log("Cancel edit profile data")
      this.isProfileEditing = false;
    },
    saveProfileDataBtn() {
      console.log("Save profile data")
      this.isProfileEditing = false;
    },
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
    archiveToggleUserArticle(id) {
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.articles[i].archived = !this.articles[i].archived
          break
        }
      }
      this.archiveArticle.id = -1
      this.archiveArticle.name = null
    },
    deleteUserArticle(id) {
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.articles.splice(i, 1)
          break
        }
      }
      this.deleteArticle.id = -1
      this.deleteArticle.name = null
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
    },
    openConfirmArchiveArticleDialog(id, archived) {
      this.archiveArticle.id = id
      this.archiveArticle.archived = archived
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.archiveArticle.name = this.articles[i].name
          break
        }
      }
      this.confirmArchiveArticleDialog = true;
    },
    openConfirmDeleteArticleDialog(id) {
      this.deleteArticle.id = id;
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.deleteArticle.name = this.articles[i].name
          break
        }
      }
      this.confirmDeleteArticleDialog = true;
    }
  },
  computed: {
    filteredUsers() {
      return this.subusers.filter(user => {
        return user.username.toLowerCase().indexOf(this.searchUser.toLowerCase()) !== -1;
      })
    },
    filteredArticles() {
      return this.articles.filter(article => {
        const res = article.name.toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1 ||
          article.tag.toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1 ||
          article.stars.toString().toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1 ||
          article.rating.toString().toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1 ||
          article.created.toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1 ||
          article.edited.toLowerCase().indexOf(this.searchArticle.toLowerCase()) !== -1;
        if (!this.showArchived)
          return res && !article.archived
        return res
      })
    }
  }
}
</script>

<style scoped>

</style>
