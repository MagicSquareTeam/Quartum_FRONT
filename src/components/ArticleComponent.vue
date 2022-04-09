<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>

          <q-item class="q-pa-md">
            <q-item-section>
              <q-item-label overline class="text-grey"> User </q-item-label>
              <q-item-label class="text-weight-bold"> Article header</q-item-label>
              <q-item-label caption> Article content with length max 400 symbols. Abracadabra!!!</q-item-label>
            </q-item-section>
          </q-item>

        </q-card-section>
      </q-card>
    </div>

</template>

<script>
export default {
  name: 'ArticleComponent',
  setup() {
    return {}
  }
}
</script>
