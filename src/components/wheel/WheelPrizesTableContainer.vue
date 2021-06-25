<template>
  <div
    id="prizes-table-container"
    :class="theme"
  >
    <div
      id="table-header"
      :class="theme"
    >
      <h3>
        Prêmios da Roleta
      </h3>
      <div class="search-sort-preview">
        <button
          class="default-btn preview-btn"
          :disabled="selectedItem || sort"
          @click="showPreview()"
        >
          <i class="material-icons">visibility</i> Visualizar Roleta
        </button>
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
          :class="theme"
          :disabled="sort || !!selectedItem"
          placeholder="Buscar por nome do prêmio"
          @input="filterPrizes()"
        >
      </div>
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
              class="name"
            >
              Nome
            </th>
            <th
              :class="theme"
              class="message"
            >
              Mensagem
            </th>
            <th
              :class="theme"
              class="command"
            >
              Comando
            </th>
            <th
              :class="theme"
              class="delay"
            >
              Delay
            </th>
            <th
              :class="theme"
              class="color"
            >
              Cor
            </th>
            <th
              :class="theme"
              class="text-color"
            >
              Texto
            </th>
            <th
              :class="theme"
              class="status"
            >
              Status
            </th>
            <th
              :class="theme"
              class="size"
            >
              Porcentagem
            </th>
            <th
              :class="theme"
              class="actions"
            >
              Ações
            </th>
          </tr>
        </thead>
      </table>
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
            <table
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <tbody>
                <tr :class="theme">
                  <td
                    :class="theme"
                    class="name"
                  >
                    <span v-if="selectedItem !== prize._id">
                      {{ prize.name }}
                    </span>
                    <span v-else>
                      <input
                        v-model="prize.name"
                        type="text"
                        class="edit-prize-input"
                        :class="theme"
                      >
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="message"
                  >
                    <span v-if="selectedItem !== prize._id">
                      {{ prize.message }}
                    </span>
                    <span v-else>
                      <input
                        v-model="prize.message"
                        type="text"
                        class="edit-prize-input"
                        :class="theme"
                      >
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="command"
                  >
                    <span v-if="selectedItem !== prize._id">
                      {{ prize.command }}
                    </span>
                    <span v-else>
                      <input
                        v-model="prize.command"
                        type="text"
                        class="edit-prize-input"
                        :class="theme"
                      >
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="delay"
                  >
                    <span v-if="selectedItem !== prize._id">
                      {{ prize.delay }}
                    </span>
                    <span v-else>
                      <input
                        v-model="prize.delay"
                        type="number"
                        min="0"
                        class="edit-prize-input"
                        :class="theme"
                      >
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="color"
                  >
                    <span
                      v-if="selectedItem !== prize._id"
                      class="color-block"
                      :style="`background-color: ${prize.color}`"
                    />
                    <el-color-picker
                      v-else
                      v-model="prize.color"
                    />
                  </td>
                  <td
                    :class="theme"
                    class="text-color"
                  >
                    <span
                      v-if="selectedItem !== prize._id"
                      class="color-block"
                      :style="`background-color: ${prize.text_color}`"
                    />
                    <el-color-picker
                      v-else
                      v-model="prize.text_color"
                    />
                  </td>
                  <td
                    :class="theme"
                    class="status"
                  >
                    <span
                      v-if="selectedItem !== prize._id"
                      class="status-tag"
                      :class="prize.enabled ? 'enabled' : 'disabled'"
                    >
                      {{ prize.enabled ? "Ativo" : "Inativo" }}
                    </span>
                    <span
                      v-else
                      class="status-change"
                    >
                      <i
                        v-if="prize.enabled"
                        class="material-icons status-on"
                        @click="prize.enabled = false"
                      >
                        toggle_on
                      </i>
                      <i
                        v-else
                        class="material-icons status-off"
                        @click="prize.enabled = true"
                      >
                        toggle_off
                      </i>
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="size"
                  >
                    <span v-if="selectedItem !== prize._id">
                      {{ prize.size ? prize.size + '%' : 'Automática' }}
                    </span>
                    <span v-else>
                      <el-slider
                        v-model="prize.size"
                        :step="1"
                      />
                    </span>
                  </td>
                  <td
                    :class="theme"
                    class="actions"
                  >
                    <button
                      v-if="sort"
                      class="btn-circle btn-sort handle"
                      :class="theme"
                      :disabled="sorting"
                    >
                      <i class="material-icons">reorder</i>
                    </button>
                    <button
                      v-if="!sort"
                      class="btn-circle btn-edit"
                      :class="theme"
                      :disabled="!!selectedItem && selectedItem !== prize._id"
                      @click="editPrize(prize)"
                    >
                      <i
                        v-if="selectedItem && selectedItem === prize._id"
                        class="material-icons"
                      >
                        check
                      </i>
                      <i
                        v-else
                        class="material-icons"
                      >edit</i>
                    </button>
                    <button
                      v-if="!sort"
                      class="btn-circle btn-delete"
                      :class="theme"
                      :disabled="!!selectedItem"
                      @click="deletePrize(prize._id)"
                    >
                      <i class="material-icons">close</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </transition-group>
      </draggable>
    </div>
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
    theWheel: null
  }),

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
