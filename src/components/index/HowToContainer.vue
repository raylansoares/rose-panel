<template>
  <div
    ref="how-to-container"
    class="flex justify-center transition-colors duration-500 bg-white dark:bg-wheel-700"
  >
    <div class="flex-col w-full px-3 py-16 max-w-screen-xl">
      <div class="flex justify-center pb-5 text-center text-5xl font-bold transition-colors duration-500 text-wheel-400 dark:text-wheel-50">
        Como Funciona?
      </div>

      <div class="text-center md:text-lg pt-1 transition-colors duration-500 text-wheel-500 dark:text-wheel-25">
        <p class="pb-3">
          Primeiro você cria as recompensas que deseja colocar na roleta, com as cores e porcentagens que desejar.
          Em seguida, basta adicionar um overlay no OBS com o link personalizado da sua roleta.
        </p>

        <p class="pb-3">
          Sempre que alguém se inscrever no seu canal, a roleta vai aparecer automaticamente e selecionar um dos prêmios configurados por você.
          Além de aparecer na tela, o bot "RoletaDoSubscriber" anunciará o prêmio no chat.
        </p>

        <p class="pb-3">
          Além dos subscribers, você também pode configurar uma quantidade mínima de bits para ativar a roleta ou até mesmo criar uma recompensa
          personalizada com pontos de canal da Twitch para que seus views possam resgatar e ativar a roleta.
        </p>

        <p>
          Para ver o guia de configuração completo e todos os recursos disponíveis basta <a
            href="#"
            class="font-bold transition-colors duration-500 text-wheel-400 dark:text-wheel-50"
          >Clicar aqui</a>!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventBus from '@/utils/event-bus'

export default {
  name: 'HowToContainer',

  computed: {
    ...mapState(['theme'])
  },

  created () {
    EventBus.$on('scroll-me-to', (refName) => {
      const element = this.$refs[refName]
      const top = element.offsetTop

      window.scrollTo(0, top)
    })
  }
}
</script>
