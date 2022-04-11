<template>
  <div>
    <q-item>
      <q-item-section side>
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
      <q-space/>
      <q-item-section side>
        <div class="row items-center justify-center">
          <div class="items-center justify-center q-mx-md">
            <q-item-label>Рейтинг</q-item-label>
            <div class="flex items-center justify-center">
              <q-btn
                :icon="sortByRatingASC ? 'fas fa-sort-amount-up-alt' : 'fas fa-sort-amount-down'"
                @click="handleSortByRating"
                size="20px"
                flat rounded dense
                :color="isSortingByRating ? 'primary' : 'grey'"/>
            </div>
            <div class="flex items-center justify-center">{{ sortByRatingASC ? 'Возраст.' : 'Убыв.' }}</div>
          </div>
          <div class="items-center justify-center q-mx-sm">
            <q-item-label>По дате создания</q-item-label>
            <div class="flex items-center justify-center">
              <q-btn
                :icon="sortByCreationDateASC ? 'fas fa-sort-amount-up-alt' : 'fas fa-sort-amount-down'"
                @click="handleSortByCreationDate"
                size="20px"
                flat rounded dense
                :color="isSortingByCreationDate ? 'primary' : 'grey'"/>
            </div>
            <div class="flex items-center justify-center">{{ sortByCreationDateASC ? 'Возраст.' : 'Убыв.' }}</div>
          </div>
          <div class="items-center justify-center q-mx-sm">
            <q-item-label>По дате редактирования</q-item-label>
            <div class="flex items-center justify-center">
              <q-btn
                :icon="sortByEditedDateASC ? 'fas fa-sort-amount-up-alt' : 'fas fa-sort-amount-down'"
                @click="handleSortByEditedDate"
                size="20px"
                flat rounded dense
                :color="isSortingByEditedDate ? 'primary' : 'grey'"/>
            </div>
            <div class="flex items-center justify-center">{{ sortByEditedDateASC ? 'Возраст.' : 'Убыв.' }}</div>
          </div>
        </div>
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
      sortByRatingASC: false,
      sortByCreationDateASC: false,
      sortByEditedDateASC: false,
      isSortingByRating: true,
      isSortingByCreationDate: false,
      isSortingByEditedDate: false,
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
            if (tags[i] === article.tagName)
              return article
        })
      }
      this.$emit('sortedArticles', this.sortedArticles)
    },
    handleSortByRating() {
      if (!this.isSortingByRating) {
        this.isSortingByRating = true
        this.isSortingByCreationDate = false
        this.isSortingByEditedDate = false
      } else {
        this.sortByRatingASC = !this.sortByRatingASC
      }
      this.sortByRating(this.sortByRatingASC)
    },
    handleSortByCreationDate() {
      if (!this.isSortingByCreationDate) {
        this.isSortingByRating = false
        this.isSortingByCreationDate = true
        this.isSortingByEditedDate = false
      } else {
        this.sortByCreationDateASC = !this.sortByCreationDateASC
      }
      this.sortByCreationDate(this.sortByCreationDateASC)
    },
    handleSortByEditedDate() {
      if (!this.isSortingByEditedDate) {
        this.isSortingByRating = false
        this.isSortingByCreationDate = false
        this.isSortingByEditedDate = true
      } else {
        this.sortByEditedDateASC = !this.sortByEditedDateASC
      }
      this.sortByEditedDate(this.sortByEditedDateASC)
    },
    sortByRating(asc) {
      let arr = Array.from(this.articles)
      arr.sort(function (a, b) {
        if (asc)
          return parseInt(a.rating, 10) - parseInt(b.rating, 10);
        else
          return parseInt(b.rating, 10) - parseInt(a.rating, 10);
      })
      this.$emit('sortedArticles', arr)
    },
    sortByCreationDate(asc) {
      let arr = Array.from(this.articles)
      arr.sort((a, b) => {
          if (asc)
            return a.creationDate.localeCompare(b.creationDate) || b.creationDate - a.creationDate
          else
            return b.creationDate.localeCompare(a.creationDate) || a.creationDate - b.creationDate
        }
      );
      this.$emit('sortedArticles', arr)
    },
    sortByEditedDate(asc) {
      let arr = Array.from(this.articles)
      arr.sort((a, b) => {
          if (asc)
            return a.editTime.localeCompare(b.editTime) || b.editTime - a.editTime
          else
            return b.editTime.localeCompare(a.editTime) || a.editTime - b.editTime
        }
      );
      this.$emit('sortedArticles', arr)
    }
  }
}
</script>

<style scoped>

</style>
