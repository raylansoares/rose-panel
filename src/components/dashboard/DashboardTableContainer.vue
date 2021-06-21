<template>
  <div class="flex-col h-full pb-32 w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
    <div class="flex items-center justify-between mb-3">
      <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Roletas Resgatadas
      </div>
      <input
        v-model="search"
        type="text"
        placeholder="Buscar usuário"
        class="w-4/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        @input="filterSubscribers()"
      >
    </div>
    <div>
      <table class="table-fixed border-collapse w-full">
        <thead>
          <tr class="bg-wheel-25 bg-opacity-20 text-md font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
            <th class="w-5/12 md:w-4/12 px-1 py-3 text-left">
              Usuário
            </th>
            <th class="w-5/12 md:w-4/12 px-1 py-3 text-left">
              Prêmio(s)
            </th>
            <th class="w-3/12 px-1 py-3 text-left hidden md:table-cell">
              Data/Hora
            </th>
            <th class="w-2/12 md:w-1/12 px-1 py-3 text-left">
              Ações
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div
      v-if="loading"
      class="flex justify-center items-center p-5"
    >
      <svg

        class="animate-spin h-10 w-10 text-wheel-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    <div
      v-if="!loading"
      class="h-full max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full transition-colors duration-500 scrollbar-thumb-wheel-25 dark:scrollbar-thumb-wheel-700 scrollbar-track-gray-200 dark:scrollbar-track-wheel-800"
    >
      <table class="table-fixed border-collapse w-full">
        <tbody>
          <tr
            v-for="(subscriber, key) of filteredSubscribers"
            :key="key"
            class="border-b border-wheel-25 dark:border-opacity-10 border-opacity-25 hover:text-wheel-400 dark:hover:text-wheel-200 transition-all duration-500 text-wheel-0 dark:text-wheel-25"
          >
            <td class="w-5/12 md:w-4/12 text-sm px-1 py-2 text-left">
              {{ subscriber.username }}
              <span
                v-if="subscriber.origin"
                class="text-xs bg-wheel-400 bg-opacity-20 rounded-sm border border-wheel-400 border-opacity-30 py-0.5 px-1"
              >
                {{ subscriber.origin }}
                {{ subscriber.quantity ? ` x${subscriber.quantity}` : '' }}
              </span>
            </td>
            <td class="w-5/12 md:w-4/12 text-sm px-1 py-2 text-left">
              <span
                v-for="(prize, index) in subscriber.prizes"
                :key="index"
                class="prize-tag"
              >
                {{ prize.name }}
              </span>
            </td>
            <td class="w-3/12 text-sm px-1 py-2 text-left hidden md:table-cell">
              {{ subscriber.created_at | formatDate }}
            </td>
            <td class="w-2/12 md:w-1/12 px-1 py-2 text-left">
              <button
                class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full bg-wheel-400 bg-opacity-20 border border-wheel-400 border-opacity-30 focus:ring-0 focus:outline-none"
                @click="retryWheel(subscriber)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
              <button
                class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 focus:ring-0 focus:outline-none"
                @click="deleteSubscriber(subscriber._id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '@/repositories/clients/axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { mapState } from 'vuex'

dayjs.locale('pt-br')

export default {
  name: 'DashboardTableContainer',

  filters: {
    formatDate: value => dayjs(value).format('DD/MM - HH:mm')
  },

  data: () => ({
    subscribers: [],
    filteredSubscribers: [],
    search: '',
    loading: false,
    host: process.env.VUE_APP_SERVER_HOST,
    port: process.env.VUE_APP_SERVER_PORT
  }),

  computed: {
    ...mapState(['user'])
  },

  mounted () {
    this.getSubscribers()
  },

  methods: {
    async getSubscribers () {
      this.loading = true
      const url = '/api/subscribers'

      try {
        const response = await axios.get(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.subscribers = response.data
        this.filterSubscribers()
      } catch (e) {
        this.$message.error(`Algo deu errado! Se o erro persistir, clique
          em sair e faça login novamente`)
      }

      this.loading = false
    },

    filterSubscribers () {
      if (this.search) {
        this.filteredSubscribers = this.subscribers.filter(value =>
          value.username.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        this.filteredSubscribers = this.subscribers
      }
    },

    retryWheel (subscriber) {
      this.$socket.emit('retryWheel', {
        subscriber: subscriber, code: this.user.code
      })
    },

    async deleteSubscriber (id) {
      const url = `/api/subscribers/${id}`

      try {
        await axios.delete(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.getSubscribers()
      } catch (e) {
        this.$message.error('Ops, não foi possível excluir este item')
      }
    }
  },

  sockets: {
    selectPrize (data) {
      if (data.code !== this.user.code) return
      this.getSubscribers()
    },

    confirmPrize (data) {
      if (data.code !== this.user.code) return
      this.getSubscribers()
    }
  }
}
</script>
