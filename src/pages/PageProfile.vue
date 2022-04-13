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

import ProfileInfoComponent from "components/profile/ProfileInfoComponent";
import ProfileArticlesComponent from "components/profile/ProfileArticlesComponent";
import ProfileSubsComponent from "components/profile/ProfileSubsComponent";

export default {
  name: "PageProfile",
  components: {
    ProfileInfoComponent,
    ProfileArticlesComponent,
    ProfileSubsComponent
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
