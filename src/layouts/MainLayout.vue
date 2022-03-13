<template>
  <q-layout view="lHr lpR lFr">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title class="text-weight-bold">
          <div class="absolute-center">
            <q-icon
              class="q-pa-sm"
              name="fas fa-home"
              size="sm"
              color="blue-grey-10"
            />
            <span class="gt-md">Главная</span>
          </div>
        </q-toolbar-title>

        <q-space></q-space>

        <q-btn flat rounded push icon="fas fa-plus"/>

        <q-btn-dropdown flat rounded push>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="42px">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg">
              </q-avatar>
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Профиль</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator color="black" inset/>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Выйти</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-ma-md">
        <q-icon
          class="q-pa-sm icon-center"
          name="fab fa-codepen"
          size="lg"
          color="black"
        />
      </div>
      <q-list class="q-pa-md q-mt-xl">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-home"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Главная</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-stream"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Обзор</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-star"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Избранное</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="fas fa-archive"/>
          </q-item-section>
          <q-item-section class="text-weight-medium text-subtitle1">Архив</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>

      <div class="q-pa-md">
        <span class="text-weight-bold text-h6">Новое</span>
        <div style="min-width: 250px; max-width: 300px">
          <q-select
            @add="selectAddTag"
            @remove="selectRemoveTag"
            filled
            v-model="modelMultiple"
            multiple
            :options="options"
            use-chips
            stack-label
            label="Multiple selection"/>
        </div>
<!--todo связь с бд для вывода первых ~5 записей по тегу-->
        <div class="q-pa-md" style="max-width: 350px">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k" />
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k" />
              </q-item-section>
            </q-item>

            <q-separator spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>2 min ago</q-item-label>
                <q-badge class="q-mt-sm" color="teal" label="10k" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {ref} from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      btn_toggle: ref('one'),
      modelMultiple: ref(),

      options: [
        'Tag #1', 'Tag #2', 'Tag #3'
      ],
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },
  methods: {
    selectAddTag(tag){
      console.log("added #" + tag.index + ": " + tag.value)
    },
    selectRemoveTag(tag){
      console.log("removed #" + tag.index + ": " + tag.value)
    }
  }
}
</script>

<style lang="sass">
.icon-center
  position: absolute
  top: 0
  left: 50%
  transform: translateX(-50%)

.my-custom-toggle
  border: 1px solid #027be3
</style>
