<template>
  <SortComponent :articles="articles" @sortedArticles="getSortedArticles"/>
  <q-list v-for="article in sortedArticles" :key="article.date_creation">
    <ArticleItemComponent :article="article"/>
  </q-list>
</template>

<script>
import SortComponent from "components/SortComponent";
import ArticleItemComponent from "components/ArticleItemComponent";

export default {
  name: "PageFavourite",
  components: {SortComponent, ArticleItemComponent},

  data() {
    let articles = [
      {
        login: "Author1",
        text: "Text 1",
        rating: 4,
        tag: "Tag #1",
        date_creation: "2022-10-20",
        date_edited: "2022-10-21"
      },
      {
        login: "Author2",
        text: "Text 2",
        rating: 5,
        tag: "Tag #2",
        date_creation: "2022-11-20",
        date_edited: "2022-11-21"
      }
    ]
    let sortedArticles = Object.assign({}, articles)

    return {
      articles, sortedArticles
    }
  },
  methods: {
    getSortedArticles(articles){
      this.sortedArticles = articles
    }
  }
}
</script>

<style scoped>

</style>
