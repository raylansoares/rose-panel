<template>
  <div class="flex-col h-full w-full md:w-9/12 pb-6">
    <DashboardTableContainer />
  </div>
</template>

<script>
import DashboardTableContainer from '@/components/dashboard/DashboardTableContainer'

export default {
  name: 'DashboardContainer',

  components: {
    DashboardTableContainer
  }
}
</script>
