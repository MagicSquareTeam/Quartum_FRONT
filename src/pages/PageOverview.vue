<template>
  <q-list class="q-mt-sm" dense bordered v-for="i in [1, 2, 3]" :key="i">
    <ArticleItemComponent/>
  </q-list>
</template>

<script>
import ArticleItemComponent from "components/ArticleItemComponent";

export default {
  name: "PageOverview",
  components: {ArticleItemComponent},
  data() {

    return {}
  }
}
</script>

<style scoped>

</style>
