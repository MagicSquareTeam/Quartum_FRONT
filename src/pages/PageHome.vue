<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="newArticleContent"
            class="new-article"
            placeholder="What's happening?"
            maxlength="400"
            bottom-slots
            counter
            autogrow
          >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewArticle"
            :disable="!newArticleContent"
            class="q-mb-lg"
            color="primary"
            label="Post"
            rounded
            unelevated
            no-caps
          />
        </div>
      </div>

      <q-separator
        class="divider"
        color="grey-2"
        size="10px"
      />

      <transition-group
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
      >

        <div key="article1" id='article_list'>
          <q-list separator v-for="art in articles" :key="art.id">
            <ArticleItemComponent :article="art" :is-archive="false"></ArticleItemComponent>
            <q-separator/>
          </q-list>
        </div>

      </transition-group>
    </q-scroll-area>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import ArticleItemComponent from "components/ArticleItemComponent";
import ArticleService from "../services/article.service"

export default defineComponent({
  name: "PageHome",
  components: {ArticleItemComponent},

  data() {
    return {
      newArticleContent: '',
      articles: []
    }
  },
  methods: {
    addNewArticle() {
      const now = new Date();
      const date = now.getFullYear() + '-' + (now.getMonth() < 10 ? '0' : '') + (now.getMonth() + 1) + '-' + now.getDate();
      const time = now.getHours() + ":" + now.getMinutes();
      const dateTime = date + ' ' + time;
      let user = this.$store.state.auth.user
      console.log(user)
      let article = {
        username: 'Lava Yasha',
        title: 'Super title',
        name: 'title1',
        text: this.newArticleContent,
        rating: 0,
        authorId: user.userId,
        tagName: 'Tag #1',
        archived: false,
        edited: false,
        creationDate: dateTime
      }
      this.newArticleContent = ''
      this.articles.push(article)
      ArticleService.publicNewArticle(article).then(
        response => {
          console.log(response.data)
        },
        error => {
          console.log(error)
        }
      )
    }
  }


});
</script>
