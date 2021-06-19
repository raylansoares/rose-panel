<template>
  <div
    class="flex-col w-full h-full"
    :class="theme"
  >
    <TopBar @set-theme="setTheme($event)" />
    <div class="flex justify-center px-5 pt-14 h-auto md:h-full w-full transition-colors duration-500 bg-wheel-50 dark:bg-wheel-800">
      <div class="flex flex-col md:flex-row w-full space-y-3 md:space-y-0 space-x-0 md:space-x-3 justify-center max-w-screen-xl pt-5">
        <Menu />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/repositories/clients/axios'
import TopBar from '@/components/layout/TopBar'
import Menu from '@/components/layout/Menu'

export default {
  name: 'DefaultContainer',

  components: {
    TopBar,
    Menu
  },

  computed: {
    ...mapState(['user', 'theme'])
  },

  mounted () {
    this.checkAuth()
  },

  methods: {
    setTheme (theme) {
      this.$store.commit('SET_THEME', theme)
    },

    checkAuth () {
      setInterval(async () => {
        if (!this.user) return
        const userCode = this.user.code
        const userAccessToken = this.user.access_token
        const url = '/api/auth/refresh'
        try {
          const response = await axios.get(url, {
            headers: {
              'x-auth-token': userAccessToken,
              'x-code': userCode
            }
          })
          this.$store.commit('SET_USER', response.data)
        } catch (e) {
          this.$store.commit('SET_USER', null)
          this.$router.push({ name: 'Login' })
          this.$message({
            message: 'Sua sessão expirou, faça login novamente para continuar.',
            type: 'error',
            duration: 0,
            showClose: true
          })
        }
      }, 3600000)
    }
  }
}
</script>
