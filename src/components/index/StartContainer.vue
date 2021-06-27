<template>
  <div class="flex justify-center h-screen transition-colors duration-500 bg-wheel-50 dark:bg-wheel-800">
    <div class="flex-col self-center w-full max-w-screen-xl">
      <div class="flex justify-center w-full h-64 lg:h-96 pb-2 lg:pb-5 pt-5 lg:pt-0">
        <img
          src="../../assets/images/wheel.svg"
          alt="Roleta do Subscriber"
        >
      </div>
      <div class="flex-col w-full p-3">
        <div class="flex-col">
          <div class="flex justify-center text-center text-5xl font-bold transition-colors duration-500 text-wheel-400 dark:text-wheel-50">
            Roleta do Subscriber
          </div>
          <div class="flex justify-center text-center lg:text-lg pt-1 transition-colors duration-500 text-wheel-500 dark:text-wheel-100">
            Roleta automática e personalizável para subscribers, bits e recompensas de pontos de canal da Twitch.
          </div>
        </div>
        <div class="flex flex-col lg:flex-row justify-center pt-5 items-center">
          <button
            class="flex order-2 lg:order-1 items-center justify-center w-8/12 lg:w-4/12 lg:w-3/12 p-3 my-1 lg:mx-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-300 hover:opacity-80 dark:bg-opacity-50"
            @click="scrollMeTo('how-to-container')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="pl-1">Como Funciona?</span>
          </button>
          <button
            class="flex order-1 lg:order-2 items-center justify-center w-8/12 lg:w-4/12 lg:w-3/12 p-3 my-1 lg:mx-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
            :disabled="loading"
            @click="connect()"
          >
            <svg
              v-if="!loading"
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
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-white"
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
            <span class="pl-1">{{ loading ? "Carregando..." : "Acessar Minha Conta" }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/utils/event-bus'

export default {
  name: 'StartContainer',

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    connect () {
      this.$emit('connect')
    },

    scrollMeTo (refName) {
      EventBus.$emit('scroll-me-to', refName)
    }
  }
}
</script>
