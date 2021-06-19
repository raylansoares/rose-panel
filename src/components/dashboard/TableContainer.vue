<template>
  <div
    id="table-container"
    :class="theme"
  >
    <div
      id="table-header"
      :class="theme"
    >
      <h3>
        Roletas Resgatadas <small>(Subscribers e Pontos de Canal)</small>
      </h3>
      <input
        v-model="search"
        :class="theme"
        placeholder="Buscar por nome de usuário"
        @input="filterSubscribers()"
      >
    </div>
    <div id="table-content">
      <table
        border="0"
        cellspacing="0"
        cellpadding="0"
      >
        <thead>
          <tr>
            <th
              :class="theme"
              class="user"
            >
              Usuário
            </th>
            <th
              :class="theme"
              class="prize"
            >
              Prêmio(s)
            </th>
            <th
              :class="theme"
              class="data"
            >
              Data/Hora
            </th>
            <th
              :class="theme"
              class="actions"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(subscriber, key) of filteredSubscribers"
            :key="key"
            :class="theme"
          >
            <td
              :class="theme"
              class="user"
            >
              {{ subscriber.username }}
              <span
                v-if="subscriber.origin"
                class="origin"
                :class="theme"
              >
                {{ subscriber.origin }}
                {{ subscriber.quantity ? ` x${subscriber.quantity}` : '' }}
              </span>
            </td>
            <td
              :class="theme"
              class="prize"
            >
              <span
                v-for="(prize, index) in subscriber.prizes"
                :key="index"
                class="prize-tag"
              >
                {{ prize.name }}
              </span>
            </td>
            <td
              :class="theme"
              class="data"
            >
              {{ subscriber.created_at | formatDate }}
            </td>
            <td
              :class="theme"
              class="actions"
            >
              <button
                class="btn-circle btn-roll"
                :class="theme"
                @click="retryWheel(subscriber)"
              >
                <i class="material-icons">cached</i>
              </button>
              <button
                class="btn-circle btn-delete"
                :class="theme"
                @click="deleteSubscriber(subscriber._id)"
              >
                <i class="material-icons">close</i>
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
  name: 'TableContainer',

  computed: {
    ...mapState(['user', 'theme'])
  },

  filters: {
    formatDate: value => dayjs(value).format('DD/MM/YYYY - HH:mm')
  },

  data: () => ({
    subscribers: [],
    filteredSubscribers: [],
    search: '',
    host: process.env.VUE_APP_SERVER_HOST,
    port: process.env.VUE_APP_SERVER_PORT
  }),

  mounted () {
    this.getSubscribers()
  },

  methods: {
    async getSubscribers () {
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
