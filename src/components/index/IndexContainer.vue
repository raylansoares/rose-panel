<template>
  <div class="flex-col items-center w-full h-full">
    <ThemeContainer
      @set-theme="setTheme($event)"
    />

    <div class="flex-col w-full h-full">
      <StartContainer
        :loading="loading"
        @connect="connect()"
      />

      <HowToContainer />

      <ContactContainer />
    </div>
  </div>
</template>

<script>
import { authConfig } from '@/utils/auth'
import { mapState } from 'vuex'
import axios from '@/repositories/clients/axios'
import ThemeContainer from '@/components/index/ThemeContainer'
import StartContainer from '@/components/index/StartContainer'
import HowToContainer from '@/components/index/HowToContainer'
import ContactContainer from '@/components/index/ContactContainer'

export default {
  name: 'IndexContainer',

  components: {
    ThemeContainer,
    StartContainer,
    HowToContainer,
    ContactContainer
  },

  data: () => ({
    loading: true
  }),

  computed: {
    ...mapState(['theme'])
  },

  mounted () {
    this.makeAuth()
    this.setTheme(this.theme)
  },

  methods: {
    async makeAuth () {
      try {
        const code = this.$route.query.code

        if (!code) {
          this.loading = false
          return
        }

        const url = '/api/auth'

        const authenticatedUser = await axios.post(url, {
          code: code, redirect: authConfig.redirect_uri
        })

        this.$store.commit('SET_USER', authenticatedUser.data)
        this.$router.push({ name: 'Dashboard' })
      } catch (e) {
        this.$message.error('Ops, não foi possível conectar sua conta')
      }

      this.loading = false
    },

    connect () {
      this.loading = true
      window.location = this.getAuthUrl()
    },

    getAuthUrl () {
      let url = authConfig.authUrl

      url += '?client_id=' + authConfig.client_id
      url += '&redirect_uri=' + authConfig.redirect_uri
      url += '&response_type=' + authConfig.response_type
      url += '&scope=' + authConfig.scopes

      return url
    },

    setTheme (theme) {
      this.$store.commit('SET_THEME', theme)
    }
  }
}
</script>
