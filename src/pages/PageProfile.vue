<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <ProfileInfoComponent/>
      <ProfileSubsComponent/>
      <ProfileArticlesComponent/>
    </div>
  </q-page>
</template>

<script>
import ProfileInfoComponent from "pages/components/ProfileInfoComponent";
import ProfileSubsComponent from "pages/components/ProfileSubsComponent";
import ProfileArticlesComponent from "pages/components/ProfileArticlesComponent";

export default {
  name: "PageProfile",
  components: {
    ProfileInfoComponent,
    ProfileArticlesComponent,
    ProfileSubsComponent
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
