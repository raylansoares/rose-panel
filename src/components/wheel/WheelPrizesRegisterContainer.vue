<template>
  <div class="flex-col space-y-2 h-auto w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
    <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
      Cadastrar Prêmio na Roleta
    </div>
    <div class="flex flex-col items-end space-y-2 space-y-0 lg:space-x-1 lg:space-y-0 lg:flex-row">
      <div class="w-full lg:w-3/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Nome do prêmio
        </label>
        <input
          v-model="prize.name"
          type="text"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-3/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Mensagem
        </label>
        <input
          v-model="prize.message"
          placeholder="{user} ganhou {prize}!"
          type="text"
          class="w-full placeholder-gray-200 dark:placeholder-wheel-700 disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-1/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Cor
        </label>
        <input
          v-model="prize.color"
          type="text"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-1/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Texto
        </label>
        <input
          v-model="prize.text_color"
          type="text"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-2/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Comando
        </label>
        <input
          v-model="prize.command"
          type="text"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-2/12">
        <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
          Delay
        </label>
        <input
          v-model="prize.delay"
          type="number"
          min="0"
          class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        >
      </div>
      <div class="w-full lg:w-1/12">
        <button
          class="flex disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center w-full p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          :disabled="!prize.name || !prize.message"
          @click="createPrize()"
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
  name: 'WheelPrizesRegisterContainer',

  data: () => ({
    prize: {
      name: null,
      message: null,
      command: null,
      delay: null,
      color: '#ffffff',
      text_color: '#000000',
      enabled: true,
      size: 0
    }
  }),

  computed: {
    ...mapState(['theme', 'user'])
  },

  methods: {
    async createPrize () {
      if (!this.prize.name || !this.prize.message) return
      const url = '/api/prizes'

      try {
        await axios.post(url, this.prize, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.prize = {
          name: null,
          message: null,
          command: null,
          delay: null,
          color: '#ffffff',
          text_color: '#000000',
          enabled: true
        }
      } catch (e) {
        this.$message.error('Ops, não foi possível cadastrar este item')
      }

      EventBus.$emit('get-prizes')
    }
  }
}
</script>
