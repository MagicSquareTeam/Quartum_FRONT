<template>
  <div>
    <q-item>
      <q-item-section class="col-6">
        <div style="min-width: 250px; max-width: 300px">
          <q-select
            filled
            @update:model-value="onChangeTag"
            v-model="modelMultiple"
            multiple
            :options="options"
            use-chips
            stack-label
            label="Теги"/>
        </div>
      </q-item-section>
      <q-item-section class="col-3">

      </q-item-section>
      <q-item-section class="col-3">

      </q-item-section>
    </q-item>
    <q-separator/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "SortComponent",
  props: ['articles'],
  data() {
    let sortedArticles = Object.assign({}, this.articles);

    return {
      modelMultiple: ref(),
      options: [
        'Tag #1', 'Tag #2', 'Tag #3'
      ],
      sortedArticles
    }
  },
  methods: {
    onChangeTag(tags) {
      if (!tags || tags.length === 0) {
        this.sortedArticles = this.articles
      } else {
        this.sortedArticles = this.articles.filter(article => {
          for (let i = 0; i < tags.length; i++)
            if (tags[i] === article.tag)
              return article
        })
      }
      this.$emit('sortedArticles', this.sortedArticles)
    }
  }
}
</script>

<style scoped>

</style>
