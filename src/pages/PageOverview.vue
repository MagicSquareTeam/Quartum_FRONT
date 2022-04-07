<template>
  <q-list class="q-mt-sm" dense bordered>
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
