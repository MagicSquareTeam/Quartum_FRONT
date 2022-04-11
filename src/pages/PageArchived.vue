<template>
  <SortComponent :articles="articles" @sortedArticles="getSortedArticles"/>
  <q-list v-for="article in sortedArticles" :key="article.date_creation">
    <ArticleItemComponent :article="article" :is-archive="true"/>
    <q-separator/>
  </q-list>
</template>

<script>
import SortComponent from "components/SortComponent";
import ArticleItemComponent from "components/ArticleItemComponent";

export default {
  name: "PageArchived",
  components: {SortComponent, ArticleItemComponent},

  data() {
    let articles = [
      {
        username: "Author1",
        title: "title1",
        text: "Text 1",
        rating: 4,
        tag: "Tag #1",
        date_creation: "2022-10-20",
        date_edited: "2022-10-21"
      },
      {
        username: "Author2",
        title: "title2",
        text: "Text 2",
        rating: 0,
        tag: "Tag #2",
        date_creation: "2022-11-20",
        date_edited: "2022-11-21"
      },
      {
        username: "Author3",
        title: "title3",
        text: "Text 3",
        rating: -100,
        tag: "Tag #3",
        date_creation: "2022-15-20",
        date_edited: "2022-15-21"
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
