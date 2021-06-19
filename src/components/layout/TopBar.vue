<template>
  <div class="fixed flex justify-between w-full p-3 transition-colors duration-500 border-b border-wheel-25 dark:border-opacity-10 border-opacity-25">
    <div>
      <img
        src="../../assets/images/logo.svg"
        alt="Roleta do Subscriber"
      >
    </div>

    <div class="flex space-x-2">
      <button
        type="button"
        class="focus:outline-none focus:ring-0"
        @click="setTheme('light')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition-colors duration-500"
          :class="theme === 'light' ? 'text-purple-500' : 'dark:text-gray-500'"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        type="button"
        class="focus:outline-none focus:ring-0"
        @click="setTheme('dark')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition-colors duration-500"
          :class="theme === 'light' ? 'text-gray-500' : 'dark:text-purple-500'"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>

      <button
        type="button"
        class="focus:outline-none focus:ring-0"
        title="Sair"
        @click="logout()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-colors duration-500 text-wheel-0 dark:text-wheel-25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import store from '../../store'
import { mapState } from 'vuex'

export default {
  name: 'TopBarContainer',

  data: () => ({
    showNavigation: false,
    currentPage: null
  }),

  computed: {
    ...mapState(['user', 'theme'])
  },

  mounted () {
    this.currentPage = this.$route.path
  },

  methods: {
    logout () {
      store.commit('SET_USER', null)
      this.$router.push('/')
    },

    setTheme (theme) {
      this.$emit('set-theme', theme)
    }
  }
}
</script>
