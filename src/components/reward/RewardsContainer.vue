<template>
  <div class="flex-col space-y-3 h-full w-full lg:w-9/12 pb-4 lg:pb-44">
    <RewardsRegisterContainer
      :channel-rewards="channelRewards"
      @get-rewards="getRewards()"
    />
    <RewardsTableContainer
      :channel-rewards="channelRewards"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/repositories/clients/axios'
import RewardsRegisterContainer from '@/components/reward/RewardsRegisterContainer'
import RewardsTableContainer from '@/components/reward/RewardsTableContainer'

export default {
  name: 'RewardsContainer',

  components: {
    RewardsRegisterContainer,
    RewardsTableContainer
  },

  data: () => ({
    channelRewards: []
  }),

  computed: {
    ...mapState(['user'])
  },

  mounted () {
    this.getChannelRewards()
  },

  methods: {
    async getChannelRewards () {
      try {
        const baseUrl = 'https://api.twitch.tv/helix/channel_points/custom_rewards'
        const url = `${baseUrl}?broadcaster_id=${this.user.broadcaster_id}`

        const response = await axios.get(url, {
          headers: {
            'Client-Id': process.env.VUE_APP_CLIENT_ID,
            Authorization: `Bearer ${this.user.access_token}`
          }
        })

        this.channelRewards = response.data.data
      } catch (e) {
        if (e.response && e.response.status && e.response.status === 403) {
          this.$message.error('Ops, seu canal não possui esse recurso')
          return
        }
        this.$message.error('Ops, não foi possível cadastrar este item')
      }
    }
  }
}
</script>
