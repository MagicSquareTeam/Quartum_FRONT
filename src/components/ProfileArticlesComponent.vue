<template>
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
          <q-avatar :icon="this.article.archived ? 'fas fa-folder-minus' : 'fas fa-folder-plus'"
                    color="primary" text-color="white"/>
          <span
            class="q-ml-sm">Вы действительно хотите <span v-if="this.article.archived">раз</span>архивировать статью {{
              this.article.name
            }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup/>
          <q-btn flat :label="this.article.archived ? 'Разархивировать' : 'Архивировать'" color="primary"
                 @click="archiveToggleUserArticle(this.article.id)"
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
              this.article.name
            }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" color="primary" v-close-popup/>
          <q-btn flat label="Удалить" color="primary" @click="deleteUserArticle(this.article.id)"
                 v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ProfileArticlesComponent",
  data() {
    let articles = [
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
      showArchived: false,
      articles,
      confirmArchiveArticleDialog: ref(false),
      confirmDeleteArticleDialog: ref(false),
      article: {
        id: -1,
        name: null,
        archived: null
      },
      searchArticle: ""
    }
  },
  methods: {
    archiveToggleUserArticle(id) {
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.articles[i].archived = !this.articles[i].archived
          break
        }
      }
      this.article.id = -1
      this.article.name = null
    },
    deleteUserArticle(id) {
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.articles.splice(i, 1)
          break
        }
      }
      this.article.id = -1
      this.article.name = null
    },
    openConfirmArchiveArticleDialog(id, archived) {
      this.article.id = id
      this.article.archived = archived
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.article.name = this.articles[i].name
          break
        }
      }
      this.confirmArchiveArticleDialog = true;
    },
    openConfirmDeleteArticleDialog(id) {
      this.article.id = id;
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          this.article.name = this.articles[i].name
          break
        }
      }
      this.confirmDeleteArticleDialog = true;
    }
  },
  computed: {
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
