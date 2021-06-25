<template>
  <div id="variables-container">
    <div
      class="block"
      :class="theme"
    >
      <p class="title">
        <strong>Variáveis disponíveis:</strong>
        <span class="tooltip">
          <i class="material-icons">help_outline</i>
          <span class="tooltiptext">
            Utilize as variáveis na mensagem ou no comando dos prêmios.
          </span>
        </span>
      </p>
      <p>
        <strong>{user}</strong>
        - Exibe o nome do subscriber
      </p>
      <p>
        <strong>{prize}</strong>
        - Exibe o nome do prêmio
      </p>
      <p>
        <strong>@2</strong>
        - Comando para roletar mais 2x
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WheelPrizesVariablesContainer',

  computed: {
    ...mapState(['theme'])
  }
}
</script>
