<template>
  <div class="flex-col h-full w-full md:w-3/12 space-y-3">
    <div
      class="flex-col w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25"
    >
      <div class="flex justify-center">
        <img
          :src="user.profile_image_url"
          class="h-12 w-12 rounded-full"
        >
      </div>
      <div class="text-lg font-bold text-center transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        {{ user.display_name }}
      </div>
    </div>
    <div
      class="flex-col space-y-2 items-center w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25"
    >
      <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Roletar Manualmente
      </div>
      <div class="flex space-x-1">
        <input
          v-model="username"
          type="text"
          placeholder="Nome do usuário"
          class="w-9/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
        <button
          class="flex items-center justify-center w-3/12 p-2 text-white transition-opacity duration-300 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          @click="manualWheel()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      class="flex-col w-full p-5 space-y-2 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25"
    >
      <router-link
        to="/dashboard"
        class="flex items-center space-x-1 text-md transition-colors duration-500 text-wheel-0 dark:text-wheel-25 hover:text-wheel-400 dark:hover:text-wheel-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>Painel Inicial</span>
      </router-link>

      <router-link
        to="/wheelConfig"
        class="flex items-center space-x-1 text-md transition-colors duration-500 text-wheel-0 dark:text-wheel-25 hover:text-wheel-400 dark:hover:text-wheel-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Configurar Roleta</span>
      </router-link>

      <router-link
        to="/rewardsConfig"
        class="flex items-center space-x-1 text-md transition-colors duration-500 text-wheel-0 dark:text-wheel-25 hover:text-wheel-400 dark:hover:text-wheel-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <span>Pontos de Canal</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Menu',

  data: () => ({
    username: null
  }),

  computed: {
    ...mapState(['user'])
  },

  methods: {
    manualWheel () {
      if (!this.username) return
      this.$socket.emit('requestPrize', {
        username: this.username,
        code: this.user.code,
        origin: 'Manual',
        quantity: null,
        message: null
      })
      this.username = null
    }
  }
}
</script>
