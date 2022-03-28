<template>
  <q-page>
    <!--todo add edit profile image-->
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <q-card flat bordered>
          <q-card-section horizontal class="flex">
            <q-card-section class="q-pt-xs col-7">
              <div class="text-h5 q-mt-sm q-mb-xs">{{ user.surname }} {{ user.name }} {{ user.patronymic }}</div>
              <div class="text-caption text-grey" style="white-space: normal">
                {{ user.status }}
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
          <q-separator/>
          <q-card-section>
            {{ user.about }}
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
              <q-btn :disable="isProfileSecEditing" v-if="!isProfileSecEditing" flat color="primary" label="Изменить"
                     no-caps @click="isProfileSecEditing = true"/>
              <q-btn :disable="!isProfileSecEditing" v-if="isProfileSecEditing" flat color="primary" label="Отменить"
                     no-caps @click="resetEditSecDataBtn"/>
              <q-btn :disable="!isProfileSecEditing" v-if="isProfileSecEditing" flat color="primary" label="Сохранить" type="submit"
                     no-caps/>
            </div>
          </q-form>
          <q-form
            class="q-gutter-md q-ma-sm"
            @submit="submitChangePassword"
          >
            <q-input
              filled
              v-model="editedUser.password"
              label="Пароль"
              readonly
              type="password"
              v-if="!this.isPasswordEditing"
            />
            <q-input
              filled
              v-model="editedUser.oldPassword"
              label="Введите старый пароль"
              :readonly="!isPasswordEditing"
              :type="isPwd1 ? 'password' : 'text'"
              v-if="this.isPasswordEditing"
              lazy-rules
              :rules="[val => val === editedUser.password || 'Пароли не совпадают']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd1 = !isPwd1"
                />
              </template>
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
              :type="isPwd2 ? 'password' : 'text'"
              v-if="this.isPasswordEditing"
              lazy-rules
              :rules="[val => val === editedUser.newPassword || 'Пароль не совпадает']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
            <div class="flex">
              <div style="flex-grow: 1"></div>
              <q-btn :disable="isPasswordEditing" v-if="!isPasswordEditing" flat color="primary" label="Изменить"
                     no-caps @click="this.isPasswordEditing = true"/>
              <q-btn :disable="!isPasswordEditing" v-if="isPasswordEditing" flat color="primary" label="Отменить"
                     no-caps @click="resetChangePassword"/>
              <q-btn :disable="!isPasswordEditing" v-if="isPasswordEditing" flat color="primary" label="Сохранить"
                     type="submit"
                     no-caps/>
            </div>
          </q-form>
        </q-card>
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
                v-model="editedUser.name"
                label="Имя"
                :readonly="!isProfileInfoEditing"
                lazy-rules
                :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
              />
              <q-input
                filled
                v-model="editedUser.surname"
                label="Фамилия"
                :readonly="!isProfileInfoEditing"
                lazy-rules
                :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
              />
              <q-input
                filled
                v-model="editedUser.patronymic"
                label="Отчество"
                :readonly="!isProfileInfoEditing"
                lazy-rules
                :rules="[val => val && /^[a-zA-Zа-яА-Я ]+$/.test(val) || 'Проверьте корректность']"
              />
              <q-input
                filled
                v-model="editedUser.status"
                label="Статус"
                :readonly="!isProfileInfoEditing"
                autogrow
                maxlength="300"
                counter
              />
              <q-input
                filled
                v-model="editedUser.about"
                label="Обо мне"
                :readonly="!isProfileInfoEditing"
                autogrow
                maxlength="1000"
                counter
              />
              <q-input
                filled
                v-model="editedUser.birthday"
                label="День рождения"
                :readonly="!isProfileInfoEditing"
                type="date"
              />
              <q-input
                filled
                v-model="editedUser.phoneNumber"
                label="Номер телефона"
                :readonly="!isProfileInfoEditing"
                mask="+# - (###) - ### - ## - ##"
                lazy-rules
                :rules="[val => (val && val.length === '+# - (###) - ### - ## - ##'.length || (!val)) || 'Проверьте корректность']"
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
                <q-btn :disable="!isProfileInfoEditing" v-if="isProfileInfoEditing" flat color="primary" type="submit"
                       label="Сохранить"
                       no-caps/>
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
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-item-label class="text-h6 text-weight-bold text-center">Ваши статьи</q-item-label>
          </q-card-section>
          <q-card-section horizontal class="flex q-pa-sm q-pl-md">
            <q-input square clearable filled v-model="searchArticle" class="col-3" style="flex-grow: 1"
                     @clear="this.searchArticle = ''">
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
                  <q-btn size="13px" flat round color="primary" icon="fas fa-ban"
                         @click="openConfirmDeleteArticleDialog(article.id)">
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
              <q-avatar :icon="this.archiveArticle.archived ? 'fas fa-folder-minus' : 'fas fa-folder-plus'"
                        color="primary" text-color="white"/>
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
import {Notify} from 'quasar'
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
    var user = {
      name: 'Имя',
      surname: 'Фамилия',
      patronymic: "Отчество",
      username: "Username1",
      password: "MyPASSword",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: "email@luga.ru",
      birthday: '2000-05-19',
      about: "Все обо мне",
      status: 'Верни шаверму',
      photo: "",
      phoneNumber: "88005553535"
    }
    var editedUser = Object.create(user)

    return {
      isProfileInfoEditing: false,
      isProfileSecEditing: false,
      isPasswordEditing: false,
      showArchived: false,
      isPwd1: true, isPwd2: true,
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
      user, editedUser
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
    resetChangeUserData(){
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
