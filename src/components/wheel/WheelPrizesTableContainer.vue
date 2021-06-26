<template>
  <div class="flex-col h-full pb-28 w-full p-5 transition-colors duration-500 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-25 rounded-lg border border-wheel-25 dark:border-wheel-700 border-opacity-25">
    <div class="flex items-center justify-between mb-3">
      <div class="text-xl font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
        Prêmios da Roleta
      </div>
      <!--
          <button
          class="flex disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center w-4/12 p-2 text-white transition-opacity duration-500 border border-transparent rounded-md focus:outline-none focus:ring-0 bg-wheel-400 hover:opacity-80 dark:bg-opacity-50"
          :disabled="selectedItem || sort"
          @click="showPreview()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
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
          <span class="text-sm px-1">Visualizar Roleta</span>
        </button> -->
      <button
        class="default-btn"
        :class="sort ? `sorting-btn ${theme}` : theme"
        :disabled="!!selectedItem || sorting"
        @click="togleSort()"
      >
        <i
          v-if="sort"
          class="material-icons"
        >check</i>
        <i
          v-else
          class="material-icons"
        >reorder</i>
        {{ sort ? 'Salvar Ordernção' : 'Alterar Ordernção' }}
      </button>
      <input
        v-model="search"
        type="text"
        :disabled="sort || !!selectedItem"
        placeholder="Buscar por nome do prêmio"
        class="w-4/12 placeholder-gray-200 dark:placeholder-wheel-700 text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
        @input="filterPrizes()"
      >
    </div>
    <div>
      <table class="table-fixed border-collapse w-full">
        <thead>
          <tr class="bg-wheel-25 bg-opacity-20 text-md font-bold transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
            <th class="w-4/12 lg:w-5/12 px-1 py-3 text-left">
              Nome/Mensagem
            </th>
            <th class="w-2/12 px-1 py-3 text-left">
              Comando/Delay
            </th>
            <th class="w-2/12 px-1 py-3 text-left">
              Cores
            </th>
            <th class="w-2/12 px-1 py-3 text-left">
              Chance/Status
            </th>
            <th class="w-2/12 lg:w-1/12 pl-1 pr-3 py-3 text-right">
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
      <draggable
        v-model="filteredPrizes"
        tag="ul"
        v-bind="dragOptions"
        handle=".handle"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group
          type="transition"
          :name="!drag ? 'flip-list' : null"
        >
          <li
            v-for="prize in filteredPrizes"
            :key="prize._id"
            class="list-item"
          >
            <table class="table-fixed border-collapse w-full">
              <tbody>
                <tr
                  class="border-b border-wheel-25 dark:border-opacity-10 border-opacity-25 hover:text-wheel-400 dark:hover:text-wheel-200 transition-all duration-500 text-wheel-0 dark:text-wheel-25"
                >
                  <td class="w-4/12 lg:w-5/12 text-sm px-1 py-2 text-left">
                    <div v-if="selectedItem !== prize._id">
                      <div>{{ prize.name }}</div>
                      <div class="text-xs">
                        {{ prize.message }}
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex flex-col space-y-1"
                    >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Nome do prêmio
                      </label>
                      <input
                        v-model="prize.name"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Mensagem
                      </label>
                      <input
                        v-model="prize.message"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                    </div>
                  </td>
                  <td class="w-2/12 text-sm px-1 py-2 text-left">
                    <div v-if="selectedItem !== prize._id">
                      <div>{{ prize.command }}</div>
                      <div
                        v-if="prize.delay"
                        class="text-xs"
                      >
                        {{ prize.delay }} segundo(s)
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex flex-col space-y-1"
                    >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Comando
                      </label>
                      <input
                        v-model="prize.command"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
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
                  </td>
                  <td class="w-2/12 text-sm px-1 py-2 text-left">
                    <div v-if="selectedItem !== prize._id">
                      <div>{{ prize.color }}</div>
                      <div>{{ prize.text_color }}</div>
                    </div>
                    <div
                      v-else
                      class="flex flex-col space-y-1"
                    >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Fundo
                      </label>
                      <input
                        v-model="prize.color"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Texto
                      </label>
                      <input
                        v-model="prize.text_color"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                    </div>
                  </td>
                  <td class="w-2/12 text-sm px-1 py-2 text-left">
                    <div v-if="selectedItem !== prize._id">
                      <div>{{ prize.size }}%</div>
                      <div>
                        {{ prize.enabled ? 'Ativo' : 'Inativo' }}
                      </div>
                    </div>
                    <div
                      v-else
                      class="flex flex-col space-y-1"
                    >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Chance
                      </label>
                      <input
                        v-model="prize.size"
                        type="number"
                        min="0"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                      <label class="text-sm transition-colors duration-500 text-wheel-0 dark:text-wheel-25">
                        Status
                      </label>
                      <input
                        v-model="prize.enabled"
                        type="text"
                        class="w-full disabled:cursor-not-allowed text-wheel-0 dark:text-wheel-25 bg-white dark:bg-wheel-800 border-wheel-25 border-opacity-25 transition-colors duration-500 rounded-md focus:border-wheel-400 focus:ring-0"
                      >
                    </div>
                  </td>
                  <td class="w-2/12 lg:w-1/12 px-1 py-2 text-right">
                    <button
                      v-if="sort"
                      class="handle inline-flex items-center justify-center mr-1 w-7 h-7 cursor-move rounded-full disabled:cursor-not-allowed bg-wheel-400 bg-opacity-20 border border-wheel-400 border-opacity-30 focus:ring-0 focus:outline-none"
                      :disabled="sorting"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      v-if="!sort"
                      class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full disabled:cursor-not-allowed bg-wheel-400 bg-opacity-20 border border-wheel-400 border-opacity-30 focus:ring-0 focus:outline-none"
                      :disabled="!!selectedItem && selectedItem !== prize._id"
                      @click="editPrize(prize)"
                    >
                      <svg
                        v-if="selectedItem && selectedItem === prize._id"
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
                      v-if="!sort"
                      class="inline-flex items-center justify-center mr-1 w-7 h-7 rounded-full disabled:cursor-not-allowed bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 focus:ring-0 focus:outline-none"
                      :disabled="!!selectedItem"
                      @click="deletePrize(prize._id)"
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
          </li>
        </transition-group>
      </draggable>
    </div>
    <!--
    <el-dialog
      :visible.sync="preview"
      center
      custom-class="wheel-modal"
      :show-close="false"
    >
      <div class="pointer">
        <i class="material-icons">place</i>
      </div>
      <canvas
        id="canvas"
        width="500"
        height="500"
      >
        <p
          style="color: white"
          align="center"
        >
          Sorry, your browser doesn't support canvas. Please try another.
        </p>
      </canvas>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <button
          class="default-btn close-modal-btn preview-btn"
          @click="preview = false"
        >Fechar</button>
      </span>
    </el-dialog>
    -->
  </div>
</template>

<script>
import EventBus from '@/utils/event-bus'
import axios from '@/repositories/clients/axios'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import * as Winwheel from '../../assets/scripts/Winwheel'

export default {
  name: 'WheelPrizesTableContainer',

  components: {
    draggable
  },

  data: () => ({
    prizes: [],
    filteredPrizes: [],
    search: null,
    selectedItem: null,
    drag: false,
    sort: false,
    sorting: false,
    preview: false,
    segments: [],
    theWheel: null,
    loading: true
  }),

  computed: {
    ...mapState(['user', 'theme']),
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },

  mounted () {
    this.getPrizes()
  },

  created () {
    EventBus.$on('get-prizes', () => {
      this.getPrizes()
    })
  },

  methods: {
    async getPrizes () {
      this.loading = true
      const url = '/api/prizes'

      try {
        const response = await axios.get(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.prizes = response.data
        this.filterPrizes()
      } catch (e) {
        this.$message.error(`Algo deu errado! Se o erro persistir, clique
          em sair e faça login novamente`)
      }

      this.loading = false
    },

    filterPrizes () {
      if (this.search) {
        this.filteredPrizes = this.prizes.filter(value =>
          value.name.toLowerCase().includes(this.search.toLowerCase())
        )
      } else {
        this.filteredPrizes = this.prizes
      }
    },

    async togleSort () {
      if (!this.sort) {
        this.search = null
        this.filteredPrizes = this.prizes
        this.sort = true
        return
      }

      this.sorting = true

      await Promise.all(
        this.filteredPrizes.map(async (prize, index) => {
          const oldIndex = this.prizes.findIndex(item => item._id === prize._id)
          const newIndex = index

          if (oldIndex === newIndex && prize.index !== undefined) return

          prize.index = index

          await this.updatePrize(prize)
        })
      )

      this.prizes = this.filteredPrizes

      this.sort = false
      this.sorting = false
    },

    async deletePrize (id) {
      const url = `/api/prizes/${id}`

      const filteredPrizes = this.prizes.filter(prize => {
        return prize._id !== id && prize.enabled
      })

      const filteredTotalPercentages = filteredPrizes.reduce(
        (total, prize) => total + (prize.size ? prize.size : 0), 0
      )

      const filteredHasAutoSize = filteredPrizes.filter(prize => !prize.size)

      if (filteredTotalPercentages < 100 && !filteredHasAutoSize.length) {
        this.$message.error({
          message: `A porcentagem total dos prêmios ativos não pode ser menor que
            100%. Ajuste a porcentagem dos outros prêmios antes de excluir este.
            Total sem este prêmio: ${filteredTotalPercentages}%`,
          duration: 10000,
          showClose: true
        })
        return
      }

      try {
        await axios.delete(url, {
          headers: {
            'x-auth-token': this.user.access_token,
            'x-code': this.user.code
          }
        })

        this.getPrizes()
      } catch (e) {
        this.$message.error('Ops, não foi possível excluir este item')
      }
    },

    async editPrize (item) {
      if (this.selectedItem !== item._id) {
        this.selectedItem = item._id
        return
      }

      if (item.enabled) {
        const enabledPrizes = this.prizes.filter(prize => prize.enabled)

        const totalPercentages = enabledPrizes.reduce(
          (total, prize) => total + (prize.size ? prize.size : 0), 0
        )

        const hasAutoSize = enabledPrizes.filter(prize => !prize.size)

        if (totalPercentages > 100) {
          this.$message.error({
            message: `A porcentagem total dos prêmios ativos não pode
              ultrapassar 100%. Total atual: ${totalPercentages}%`,
            duration: 5000,
            showClose: true
          })
          return
        }

        if (totalPercentages < 100 && !hasAutoSize.length) {
          this.$message.error({
            message: `A porcentagem total dos prêmios ativos não pode ser menor
              que 100%. Deixe em "0" caso queira definir a porcentagem desse
              prêmio como automática. Total atual: ${totalPercentages}%`,
            duration: 10000,
            showClose: true
          })
          return
        }
      } else {
        const filteredPrizes = this.prizes.filter(prize => {
          return prize._id !== item._id && prize.enabled
        })

        const filteredTotalPercentages = filteredPrizes.reduce(
          (total, prize) => total + (prize.size ? prize.size : 0), 0
        )

        const filteredHasAutoSize = filteredPrizes.filter(prize => !prize.size)

        if (filteredTotalPercentages < 100 && !filteredHasAutoSize.length) {
          this.$message.error({
            message: `A porcentagem total dos prêmios ativos não pode ser menor
              que 100%. Ajuste a porcentagem dos outros prêmios antes de
              desativar este. Total sem este prêmio: ${filteredTotalPercentages}%`,
            duration: 10000,
            showClose: true
          })
          return
        }
      }

      await this.updatePrize(item)

      this.selectedItem = null
    },

    async updatePrize (item) {
      const url = `/api/prizes/${item._id}`

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

    initWheel () {
      this.theWheel = new Winwheel.Winwheel({})
      this.theWheel.rotationAngle = 0
      this.theWheel.draw()

      this.segments = this.formatSegments(this.prizes)

      this.theWheel = new Winwheel.Winwheel({
        textFontSize: 19,
        numSegments: this.segments.length,
        segments: this.segments,
        innerRadius: 8
      })
    },

    showPreview () {
      this.preview = true
      setTimeout(() => {
        this.initWheel()
      }, 500)
    },

    formatSegments (data) {
      const enabledItems = data.filter(item => item.enabled === true)

      return enabledItems.map(item => {
        return {
          fillStyle: item.color,
          text: item.name,
          textFillStyle: item.text_color,
          size: item.size ? this.winwheelPercentToDegrees(item.size) : null
        }
      })
    },

    winwheelPercentToDegrees (percentValue) {
      let degrees = 0

      if ((percentValue > 0) && (percentValue <= 100)) {
        const divider = (percentValue / 100)
        degrees = (360 * divider)
      }

      return degrees
    }
  }
}
</script>
