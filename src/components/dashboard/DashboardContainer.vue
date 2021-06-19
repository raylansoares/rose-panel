<template>
  <div class="h-full w-full md:w-9/12">
    <TableContainer />
  </div>
</template>

<script>
import TableContainer from '@/components/dashboard/TableContainer'

export default {
  name: 'DashboardContainer',

  components: {
    TableContainer
  }
}
</script>
