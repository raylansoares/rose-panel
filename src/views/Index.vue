<template>
  <div
    class="w-full"
    :class="theme"
  >
    <IndexContainer />
  </div>
</template>

<script>
import IndexContainer from '@/components/index/IndexContainer.vue'
import { mapState } from 'vuex'

export default {
  name: 'IndexView',
  components: {
    IndexContainer
  },
  computed: {
    ...mapState(['theme'])
  }
}
</script>
