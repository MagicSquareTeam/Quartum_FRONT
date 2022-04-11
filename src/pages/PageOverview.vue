<template>
  <SortComponent :articles="articles" @sortedArticles="getSortedArticles"/>
  <q-list v-for="article in sortedArticles" :key="article.date_creation">
    <ArticleItemComponent :article="article" :is-archive="false"/>
    <q-separator/>
  </q-list>
</template>
<script>
import ArticleItemComponent from "components/ArticleItemComponent";
import SortComponent from "components/SortComponent";
import ArticleService from "src/services/article.service";

export default {
  name: "PageOverview",
  components: {ArticleItemComponent, SortComponent},
  data() {
    let articles = {}
    let sortedArticles = Object.assign({}, articles)
    return {
      articles, sortedArticles
    }
  },
  methods: {
    getSortedArticles(articles){
      this.sortedArticles = articles
    }
  },
  mounted() {
    ArticleService.getAllArticles().then(
      response => {
        this.articles = response.data
        this.sortedArticles = response.data
      },
      error => {
        console.log(error)
      }
    )
  }
}
</script>

<style scoped>

</style>
