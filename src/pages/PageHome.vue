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

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <div id='article_list'>
            <template v-for="art in articles" :key="art.id">
              <component :is="art.component"></component>
            </template>
          </div>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import ArticleComponent from "components/ArticleComponent";

export default defineComponent({
  name: "PageHome",
  // components: {ArticleComponent},

  data() {
    return {
      newArticleContent: '',
      articles: []
    }
  },

  methods: {
    addNewArticle() {
      let article = {
        content: this.newArticleContent,
        date: Date.now(),
        liked: false
      }
      this.newArticleContent = ''

      this.articles.push(ArticleComponent())
    }

  }




});
</script>
