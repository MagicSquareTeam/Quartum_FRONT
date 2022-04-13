<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row q-col-gutter-md">
        <div class="row flex justify-center items-center q-pr-sm">
          <q-avatar size="xl" align="center">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
        <div>
          <q-editor v-model="newArticleContent" min-height="6rem"
                    @update:model-value="updateNewPost"
                    :style="[{'width' : (windowWidth - offset) + 'px'}]"
                    :toolbar="[
                                ['token'],
                                ['bold', 'italic', 'underline'],
                                [{
                                  label: $q.lang.editor.formatting,
                                  icon: $q.iconSet.editor.formatting,
                                  list: 'no-icons',
                                  options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                                }]]">
            <template v-slot:token>
              <q-btn-dropdown
                dense no-caps
                ref="tokenRef"
                no-wrap
                unelevated
                color="white"
                text-color="primary"
                :label="selectedTag ? selectedTag : 'Выберите тег'"
                size="sm"
                auto-close
              >
                <q-list dense v-for="tag in tags" :key="tag.name">
                  <q-item tag="label" clickable @click="selectedTag = tag.name">
                    <q-item-section>{{ tag.name }}</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
          </q-editor>
        </div>
        <q-item-section side class="flex items-center justify-center">
          <q-btn
            @click="addNewArticle"
            :disable="!newArticleContent || !selectedTag"
            color="primary"
            label="Post"
            rounded
            class="q-mb-sm"
            unelevated
            no-caps
          />
          <span>{{ removeHTML(newArticleContent).length }} / {{ maxLength }}</span>
        </q-item-section>
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
      articles: [],
      windowWidth: window.innerWidth,
      offset: 750,
      selectedTag: null,
      maxLength: 400
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
    },
    handleWindowResize() {
      this.windowWidth = this.$q.screen.width
      if (this.windowWidth < 1007)
        this.offset = 195
      else
        this.offset = 725
    },
    removeHTML(str){
      const tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
    },
    updateNewPost(text){
      if (this.removeHTML(text).length > this.maxLength)
        this.newArticleContent = text.slice(0, this.maxLength - 1)
    }
  },
  computed: {
    tags() {
      return this.$store.state.meta.tags
    }
  },
  created() {
    this.handleWindowResize()
  },
  watch: {
    "$q.screen.width"() {
      this.handleWindowResize()
    }
  }


});
</script>
