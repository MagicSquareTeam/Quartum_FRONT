<template>
  <q-item dense>
    <q-card flat square class="full-width">
      <q-card-section horizontal class="q-pa-sm">
        <q-item-section avatar top class="col-1">
          <q-img
            class="rounded-borders float-right"
            src="https://cdn.quasar.dev/img/boy-avatar.png"
            style="max-width: 70px; max-height: 70px"
          />
        </q-item-section>
        <q-item-section top class="col-8 flex">
            <q-card-section horizontal>
              <q-item-label class="q-pa-sm q-ml-sm items-center justify-center flex row">
                Логин
              </q-item-label>
              <q-btn label="Подписаться" flat color="primary" no-caps align="left" no-wrap></q-btn>
            </q-card-section>
            <q-item-label class="q-ml-sm q-pl-sm text-weight-bold" style="flex-grow: 1">Тема статьи</q-item-label>
        </q-item-section>
        <q-item-section top class="col-3" align="right">
          <q-item-label>Дата публикации</q-item-label>
          <q-item-label>Тег</q-item-label>
        </q-item-section>
      </q-card-section>
      <q-item-section class="q-pa-md text-body2 text-justify">
        {{ show_full ? article.text : article.text.slice(0, max_length) + '...' }}
      </q-item-section>
      <q-item-section>
        <q-btn flat v-if="!show_full && !hide_buttons" label="Показать полностью" color="primary" @click="showArticle" no-caps align="left"/>
        <q-btn flat v-if="show_full && !hide_buttons" label="Скрыть" color="primary" @click="hideArticle" no-caps align="left"/>
      </q-item-section>
      <q-item-section>
        блок с вложениями
      </q-item-section>
    </q-card>
  </q-item>
</template>

<script>
export default {
  name: "ArticleComponent",
  data() {

    return {
      max_length: 700,
      show_full: true,
      hide_buttons: true,
      article: {
        // text: "123",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium lorem velit, vitae venenatis nisl mollis id. Pellentesque vestibulum quis metus eget condimentum. Maecenas eget sodales lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in euismod nunc, vel ultricies enim. Nulla malesuada ligula ut mattis fermentum. Fusce euismod mi porta, egestas dui et, placerat dui. Etiam et ipsum vehicula nulla volutpat luctus. Nullam feugiat, neque id finibus congue, nisl turpis pretium felis, ac scelerisque augue velit in neque. Nunc mauris mi, feugiat et urna vitae, ultricies tincidunt magna. Nam a arcu vel nibh molestie elementum. Nullam accumsan vestibulum nulla ac facilisis.\n" +
          "\n" +
          "Donec metus odio, auctor non risus ac, vestibulum venenatis libero. Donec molestie, erat hendrerit volutpat blandit, lorem arcu tempor erat, sit amet rhoncus sem leo eu ipsum. Phasellus id odio eros. Nullam cursus leo mi. Praesent erat risus, faucibus tristique risus et, sollicitudin maximus libero. Nulla egestas ante in neque fringilla, id ultrices ipsum dapibus. Aenean scelerisque, tellus non semper auctor, metus libero accumsan felis, quis lobortis odio ipsum eu odio.\n" +
          "\n" +
          "Quisque ut libero id quam posuere efficitur id eget diam. Phasellus faucibus faucibus justo, eget eleifend odio commodo ut. Sed ut vestibulum nisl, vitae blandit justo. Quisque et rhoncus ex, a vulputate ante. Mauris id consequat elit. Donec dignissim felis enim, vitae facilisis velit sagittis eget. Morbi consequat orci non odio porta sollicitudin."
      }
    }
  },
  methods: {
    showArticle(){
      this.show_full = true
    },
    hideArticle(){
      this.show_full = false
    }
  },
  mounted() {
    this.hide_buttons = this.article.text.length <= this.max_length
    if (!this.hide_buttons) {
      this.show_full = false
    }
  }
}
</script>

<style scoped>

</style>
