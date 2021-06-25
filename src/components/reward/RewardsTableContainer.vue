<template>
  <div class="flex-col h-auto w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
    <div class="flex items-center justify-between mb-3">
      <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Recompensas Vinculadas
      </div>
      <input
        v-model="search"
        type="text"
        :disabled="!!selectedItem"
        placeholder="Buscar por nome da recompensa"
        class="w-4/12 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        @input="filterRewards()"
      >
    </div>
    <div>
      <table class="table-fixed border-collapse w-full">
        <thead>
          <tr class="bg-wheel-25 bg-opacity-20 text-md font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
            <th class="w-3/12 md:w-3/12 px-1 py-3 text-left">
              Recompensa
            </th>
            <th class="w-3/12 md:w-3/12 px-1 py-3 text-left">
              Ação
            </th>
            <th class="w-3/12 md:w-3/12 px-1 py-3 text-left">
              Comando
            </th>
            <th class="w-2/12 md:w-2/12 px-1 py-3 text-left">
              Tempo
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
            v-for="(reward, key) of filteredRewards"
            :key="key"
            class="border-b border-wheel-25 dark:border-opacity-10 border-opacity-25 hover:text-wheel-400 dark:hover:text-wheel-200 transition-all duration-500 text-wheel-0 dark:text-wheel-25"
          >
            <td class="w-3/12 md:w-3/12 text-sm px-1 py-2 text-left">
              <span v-if="selectedItem !== reward._id">
                {{ reward.name }}
              </span>
              <span v-else>
                <select
                  v-model="reward.name"
                  class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                  @change="reward.type = null, reward.action = null, reward.time = null"
                >
                  <option value="" />
                  <option
                    v-for="item in channelRewards"
                    :key="item.id"
                    :label="item.title"
                    :value="item.title"
                  />
                </select>
              </span>
            </td>
            <td class="w-3/12 md:w-3/12 text-sm px-1 py-2 text-left">
              <span v-if="selectedItem !== reward._id">
                {{ getTypeLabel(reward.type) }}
              </span>
              <span v-else>
                <select
                  v-model="reward.type"
                  class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                  :disabled="!reward.name"
                  @change="reward.action = null, reward.time = null"
                >
                  <option value="" />
                  <option
                    v-for="item in rewardTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </select>
              </span>
            </td>
            <td class="w-2/12 md:w-3/12 text-sm px-1 py-2 text-left">
              <span v-if="selectedItem !== reward._id">
                {{ getActionLabel(reward.action) }}
              </span>
              <span v-else>
                <select
                  v-model="reward.action"
                  class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                  :disabled="reward.type !== 'command'"
                  @change="reward.time = null"
                >
                  <option value="" />
                  <option
                    v-for="item in rewardActions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </select>
              </span>
            </td>
            <td class="w-2/12 md:w-2/12 text-sm px-1 py-2 text-left">
              <span v-if="selectedItem !== reward._id">
                {{ reward.time }}
              </span>
              <span v-else>
                <input
                  v-model="reward.time"
                  type="number"
                  min="0"
                  class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                  :disabled="reward.action !== 'timeout'"
                >
              </span>
            </td>
            <td class="w-2/12 md:w-1/12 px-1 py-2 text-left">
              <button
                class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full disabled:cursor-not-allowed bg-wheel-400 bg-opacity-20 border border-wheel-400 border-opacity-30 focus:ring-0 focus:outline-none"
                :disabled="!!selectedItem && selectedItem !== reward._id"
                @click="editReward(reward)"
              >
                <svg
                  v-if="selectedItem && selectedItem === reward._id"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full disabled:cursor-not-allowed bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 focus:ring-0 focus:outline-none"
                :disabled="!!selectedItem"
                @click="deleteReward(reward._id)"
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
import EventBus from '@/utils/event-bus'
import axios from '@/repositories/clients/axios'
import { mapState } from 'vuex'

export default {
  name: 'RewardsTableContainer',

  props: {
    channelRewards: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    rewards: [],
    filteredRewards: [],
    search: null,
    selectedItem: null,
    showExample: false,
    loading: true,
    rewardTypes: [
      {
        value: 'wheel',
        label: 'Girar Roleta'
      },
      {
        value: 'command',
        label: 'Executar Comando'
      }
    ],
    rewardActions: [
      {
        value: 'timeout',
        label: 'Dar Timeout no Alvo'
      },
      {
        value: 'untimeout',
        label: 'Remover Timeout do Alvo'
      }
    ]
  }),

  computed: {
    ...mapState(['user', 'theme'])
  },

  mounted () {
    this.getRewards()
  },

  created () {
    EventBus.$on('get-rewards', () => {
      this.getRewards()
    })
  },

  methods: {
    async getRewards () {
      this.loading = true
      const url = '/api/rewards'

      try {
        const response = await axios.get(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.rewards = response.data
        this.filterRewards()
      } catch (e) {
        this.$message.error(`Algo deu errado! Se o erro persistir, clique
          em sair e faça login novamente`)
      }

      this.loading = false
    },

    filterRewards () {
      if (this.search) {
        this.filteredRewards = this.rewards.filter(value =>
          value.name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        this.filteredRewards = this.rewards
      }
    },

    async deleteReward (id) {
      const url = `/api/rewards/${id}`

      try {
        await axios.delete(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.getRewards()
      } catch (e) {
        this.$message.error('Ops, não foi possível excluir este item')
      }
    },

    async editReward (item) {
      if (this.selectedItem !== item._id) {
        this.selectedItem = item._id
        return
      }

      const sameReward = this.rewards.find(
        reward => reward.name === item.name && reward._id !== item._id
      )

      if (sameReward || !this.validReward(item)) return

      await this.updateReward(item)

      this.selectedItem = null
    },

    async updateReward (item) {
      const url = `/api/rewards/${item._id}`

      try {
        await axios.patch(url, item, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })
      } catch (e) {
        this.$message.error('Ops, não foi possível editar este item')
      }
    },

    validReward (reward) {
      if (!reward.name || !reward.type) return false
      if (reward.type === 'command' && !reward.action) return false
      if (reward.action === 'timeout' && !reward.time) return false
      return true
    },

    getTypeLabel (type) {
      const rewardType = this.rewardTypes.find(reward => reward.value === type)
      return rewardType ? rewardType.label : type
    },

    getActionLabel (action) {
      const rewardAction = this.rewardActions.find(reward => reward.value === action)
      return rewardAction ? rewardAction.label : action
    }
  }
}
</script>
