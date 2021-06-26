<template>
  <div class="flex-col space-y-3 h-full w-full md:w-9/12 pb-44">
    <WheelPrizesRegisterContainer
      @get-prizes="getPrizes()"
    />
    <!-- <WheelPrizesVariablesContainer /> -->
    <WheelPrizesTableContainer />
  </div>
</template>

<script>
import WheelPrizesRegisterContainer from '@/components/wheel/WheelPrizesRegisterContainer'
import WheelPrizesTableContainer from '@/components/wheel/WheelPrizesTableContainer'
// import WheelPrizesVariablesContainer from '@/components/wheel/WheelPrizesVariablesContainer'

export default {
  name: 'WheelConfigContainer',

  components: {
    WheelPrizesRegisterContainer,
    WheelPrizesTableContainer
    // WheelPrizesVariablesContainer
  }
}
</script>
