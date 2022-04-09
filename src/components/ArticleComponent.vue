<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>

          <q-item class="q-pa-md">
            <q-item-section>
              <q-item-label overline class="text-grey"> {{article.username}} </q-item-label>
              <q-item-label class="text-weight-bold"> {{ article.title }} </q-item-label>
              <q-item-label caption> {{article.description}}</q-item-label>
            </q-item-section>
          </q-item>

        </q-card-section>
      </q-card>
    </div>

</template>

<script>
export default {
  name: 'ArticleComponent',

  props: {
    article: {}
  },

  setup() {
    return {}
  }
}
</script>
