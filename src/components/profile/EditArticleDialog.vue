<template>
  <q-dialog persistent>
    <q-card style="width: 1500px">
      <q-card-section horizontal>
        <q-item-section class="flex">
          <q-card-section class="flex">
            <q-input outlined
                     v-model="editedArticle.name"
                     :readonly="!editingName"
                     stack-label label="Название статьи"/>
            <q-btn class="q-pa-md" size="13px" outline rounded color="primary" flat dense icon="fa fa-pencil-alt"
                   @click="editingName = !editingName"/>
          </q-card-section>
          <q-card-section class="flex">
            <q-select
              filled
              v-model="editedArticle.tagName"
              :options="tags"
              :readonly="!editingTag"
              label="Тег"
              style="width: 250px"
            />
            <q-btn class="q-pa-md" size="13px" outline rounded color="primary" flat dense icon="fa fa-pencil-alt"
                   @click="editingTag = !editingTag"/>
          </q-card-section>
        </q-item-section>
        <q-item-section side top class="q-pa-md q-ma-md">
          <q-item-label>Создано: {{ article.creationDate }}</q-item-label>
          <q-item-label v-if="article.edited">Редактировано: {{ article.editTime }}</q-item-label>
        </q-item-section>
      </q-card-section>
      <q-card-section class="q-mb-md">
        <q-editor v-model="editedArticle.text" @update:model-value="updatePost"/>
        <span class="float-right q-pr-sm q-pt-sm">{{ removeHTML(editedArticle.text).length }} / {{ maxLength }}</span>
      </q-card-section>
      <q-card-section horizontal class="q-pa-md q-ma-sm">
        <q-btn outline rounded color="primary" class="q-ml-xl" label="Сохранить" no-caps align="left"
               @click="saveEditedArticle"/>
        <q-space/>
        <q-btn outline rounded color="primary" class="q-mr-xl" label="Отмена" no-caps align="right"
               @click="closeEditArticleDialog"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import ArticleService from "src/services/article.service";

export default {
  name: "EditArticleDialog",
  props: {
    article: {}
  },
  data() {
    return {
      editedArticle: Object.assign({}, this.article),
      editingName: false,
      editingTag: false,
      maxLength: 400
    }
  },
  methods: {
    saveEditedArticle() {
      this.editedArticle.tagName = this.editedArticle.tagName.value
      const now = new Date();
      const date = now.getFullYear() + '-' + (now.getMonth() < 10 ? '0' : '') + (now.getMonth() + 1) + '-' + now.getDate();
      const time = now.getHours() + ":" + now.getMinutes();
      const dateTime = date + ' ' + time;
      this.editedArticle.edited = true
      this.editedArticle.editTime = dateTime
      ArticleService.updateArticle(this.editedArticle).then(
        response => {
          console.log(response)
          this.$emit("closeEditArticleDialog")
        },
        error => {
          console.log(error)
        }
      )
    },
    closeEditArticleDialog() {
      this.editedArticle = Object.assign({}, this.article)
      this.$emit("closeEditArticleDialog")
    },
    removeHTML(str){
      const tmp = document.createElement("DIV");
      tmp.innerHTML = str;
      return tmp.textContent || tmp.innerText || "";
    },
    updatePost(text){
      if (this.removeHTML(text).length > this.maxLength)
        this.editedArticle.text = text.slice(0, this.maxLength - 1)
    }
  },
  computed: {
    tags() {
      let res = []
      let t = this.$store.state.meta.tags
      for (let i = 0; i < t.length; i++) {
        res.push({
          label: t[i].name,
          value: t[i].name,
          id: t[i].id
        })
      }
      return res
    }
  }
}
</script>

<style scoped>

</style>
