<template>
  <div class="flex-col space-y-2 h-auto w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
    <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
      Vincular Recompensa da Twitch
    </div>
    <div class="flex flex-col items-end space-y-2 space-y-0 md:space-x-1 md:space-y-0 md:flex-row">
      <div class="w-full md:w-3/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Selecione a recompensa
        </label>
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
      </div>
      <div class="w-full md:w-3/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Ação a ser executada
        </label>
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
      </div>
      <div class="w-full md:w-3/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Comando
        </label>
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
      </div>
      <div class="w-full md:w-2/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Tempo <span class="text-xs">segundos</span>
        </label>
        <input
          v-model="reward.time"
          type="number"
          min="0"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
          :disabled="reward.action !== 'timeout'"
        >
      </div>
      <div class="w-full md:w-1/12">
        <button
          class="flex items-center justify-center w-full p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          :disabled="!validReward()"
          @click="createReward()"
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
  </div>
</template>

<script>
import axios from '@/repositories/clients/axios'
import { mapState } from 'vuex'
import EventBus from '@/utils/event-bus'

export default {
  name: 'RewardsRegisterContainer',

  props: {
    channelRewards: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    reward: {
      name: null,
      type: null,
      action: null,
      time: null
    },
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
    ...mapState(['user'])
  },

  methods: {
    async createReward () {
      if (!this.validReward()) return

      const url = '/api/rewards'

      try {
        await axios.post(url, this.reward, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.reward = {
          name: null,
          type: null,
          action: null,
          time: null
        }
      } catch (e) {
        this.$message.error('Ops, não foi possível cadastrar este item')
      }

      EventBus.$emit('get-rewards')
    },

    validReward () {
      if (!this.reward.name || !this.reward.type) return false
      if (this.reward.type === 'command' && !this.reward.action) return false
      if (this.reward.action === 'timeout' && !this.reward.time) return false
      return true
    }
  }
}
</script>
