<template>
  <div class="flex-col h-full w-full lg:w-3/12 space-y-3 pb-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full">
    <div
      class="flex-col w-full p-6 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25"
    >
      <div class="flex justify-center">
        <img
          :src="user.profile_image_url"
          class="h-16 w-16 rounded-full"
        >
      </div>
      <div class="text-lg pt-0.5 font-bold text-center transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        {{ user.display_name }}
      </div>
    </div>

    <div class="flex-col w-full p-5 space-y-2 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
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
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clip-rule="evenodd"
          />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
        <span>Prêmios da Roleta</span>
      </router-link>

      <router-link
        to="/rewards"
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

      <router-link
        to="/help"
        target="_blank"
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
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Ajuda e Tutoriais</span>
      </router-link>
    </div>

    <div class="flex-col space-y-1 items-center w-full px-5 py-3 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
      <div class="text-lg font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Roletar Manualmente
      </div>
      <div class="flex space-x-1">
        <input
          v-model="username"
          type="text"
          placeholder="Nome do usuário"
          class="w-10/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
        <button
          class="flex items-center justify-center w-3/12 p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="flex-col space-y-1 items-center w-full px-5 py-3 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
      <div class="text-lg font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Valor da Roleta por Bits
      </div>
      <div class="flex space-x-1">
        <input
          v-model="configuration.min_bits_to_wheel"
          type="number"
          min="0"
          placeholder="Quantidade de bits"
          class="w-10/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
        <button
          class="flex items-center justify-center w-3/12 p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          @click="updateOrCreateConfiguration()"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
      <div class="text-sm text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Digite o valor mínimo nescessário.
      </div>
    </div>

    <div class="flex-col space-y-1 items-center w-full px-5 py-3 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
      <div class="text-lg font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        URL para o OBS
      </div>
      <div class="flex space-x-1">
        <input
          v-model="wheelUrl"
          :type="showUrl ? 'text' : 'password'"
          readonly
          class="w-10/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
        <button
          class="flex items-center justify-center w-3/12 p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          @click="showUrl = !showUrl"
        >
          <svg
            v-if="showUrl"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
              clip-rule="evenodd"
            />
            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fill-rule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="text-sm text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Copie e utilize a URL apenas no OBS.
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/repositories/clients/axios'
import { mapState } from 'vuex'

export default {
  name: 'Menu',

  data: () => ({
    username: null,
    wheelUrl: null,
    defaultPrizes: [],
    configuration: {
      min_bits_to_wheel: null
    },
    showUrl: false
  }),

  computed: {
    ...mapState(['user'])
  },

  mounted () {
    this.setWheelUrl()
    this.getConfiguration()
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
    },

    setWheelUrl () {
      this.wheelUrl = `${process.env.VUE_APP_URL}/wheel?code=${this.user.code}`
    },

    async getConfiguration () {
      const url = '/api/configurations'

      const response = await axios.get(url, {
        headers: {
          'x-auth-token': this.user.access_token,
          'x-code': this.user.code
        }
      })

      if (!response.data[0]) return

      this.configuration = response.data[0]
    },

    async updateOrCreateConfiguration () {
      this.configuration._id
        ? await this.updateConfiguration()
        : await this.createConfiguration()
    },

    async updateConfiguration () {
      const url = `/api/configurations/${this.configuration._id}`

      try {
        const response = await axios.patch(url, this.configuration, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.$message.success({
          message: 'Configuração salva com sucesso!',
          showClose: true
        })

        this.configuration = response.data
      } catch (e) {
        this.$message.error({
          message: 'Ocorreu um erro ao salvar a configuração',
          showClose: true
        })
      }
    },

    async createConfiguration () {
      const url = '/api/configurations'

      try {
        const response = await axios.post(url, this.configuration, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.$message.success({
          message: 'Configuração salva com sucesso!',
          showClose: true
        })

        this.configuration = response.data
      } catch (e) {
        this.$message.error({
          message: 'Ocorreu um erro ao salvar a configuração',
          showClose: true
        })
      }
    }
  }
}
</script>
