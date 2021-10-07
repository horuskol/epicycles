<template>
    <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout min-h-screen bg-gray-300">
        <canvas id="epicycles"
                class="grid-in-center"
                height="500"
                width="500"
        >
        </canvas>
        <svg viewBox="0 0 1000 1000"
             xmlns="http://www.w3.org/2000/svg"
             class="grid-in-center z-50"
             v-if="showCircles"
        >
            <circle :cx="center.x" :cy="center.y" :r="radius" fill="none" stroke="black" stroke-width="2"/>

            <disc v-for="(disc, d) in discs" :key="d" :disc="disc" :selected="selectedDiscId === d" @click="discSelected(d)" />
        </svg>

        <div class="grid-in-controls flex flex-col">
            <button class="border border-blue-500 rounded m-2"
                    @click.prevent="showCircles = !showCircles">Show Circles
            </button>

            <button v-if="timer"
                    class="border border-blue-500 rounded m-2"
                    @click.prevent="pause">Pause
            </button>

            <button v-if="!timer"
                    class="border border-blue-500 rounded m-2"
                    @click.prevent="start">Start
            </button>

            <button class="border border-blue-500 rounded m-2"
                    @click.prevent="reset">Reset
            </button>

            <form v-if="selectedDisc" @submit.prevent class="flex flex-col">
                <label class="block m-2">
                    Radius
                    <input type="text" v-model="selectedDisc.r" />
                </label>

                <label class="block m-2">
                    Point
                    <input type="text" v-model="selectedDisc.l" />
                </label>
            </form>
        </div>
    </div>
</template>

<script>
import Disc from './components/disc.svg'

export default {
  name: 'App',
  components: {
    disc: Disc,
  },
  data() {
    return {
      angle: 0,
      maxAngle: 360,
      center: {x: 500, y: 500},
      radius: 400,
      timer: null,
      discs: [
        {r: 400, center: {x: 500, y: 500}, p: {x: 500, y: 500}, l: 0, a: 0, color: [255, 255, 255]},
        {r: 200, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 250, a: 0, color: [0, 0, 255], parent: 0},
        {r: 100, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 150, a: 0, color: [255, 0, 0], parent: 1},
        {r: 50, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 100, a: 0, color: [0, 255, 0], parent: 2},
      ],
      canvas: null,
      showCircles: true,
      selectedDiscId: null,
    }
  },
  computed: {
    selectedDisc() {
      if (this.selectedDiscId > 0 && this.discs[this.selectedDiscId] !== undefined) {
        return this.discs[this.selectedDiscId]
      }
      return null
    }
  },
  mounted() {
    this.discs.forEach((disc) => {
      if (disc.parent !== undefined) {
        disc.center = this.discs[disc.parent].p
      }
    })

    this.$nextTick(() => {
      this.canvas = document.getElementById('epicycles').getContext('2d')

      this.start()
    })
  },

  methods: {
    reset() {
      this.angle = 0
      this.calculate()
      this.canvas.clearRect(0, 0, 500, 500)

      this.pause()
    },
    pause() {
      clearInterval(this.timer)
      this.timer = null
    },
    start() {
      this.timer = setInterval(() => {
        this.calculate()

        this.angle += 0.25
      }, 25)
    },
    calculate() {
      this.discs.forEach((disc, d, discs) => {
        if (disc.parent === undefined) {
          disc.a = this.angle
        } else {
          const alpha = discs[disc.parent].a
          const gamma = alpha * ((discs[disc.parent].r / disc.r ))

          discs[d].a = gamma

          disc.center = {
            x: discs[disc.parent].center.x + (discs[disc.parent].r - disc.r) * Math.cos(toRadians(alpha)),
            y: discs[disc.parent].center.y + (discs[disc.parent].r - disc.r) * Math.sin(toRadians(alpha)),
          }

          disc.p = {
            x: disc.center.x + disc.l * Math.cos(toRadians(gamma - alpha)),
            y: disc.center.y - disc.l * Math.sin(toRadians(gamma - alpha)),
          }
        }

        if (disc.p.x > 0 && disc.p.x < 1000 && disc.p.y > 0 && disc.p.y < 1000) {
          const pixel = this.canvas.getImageData(Math.floor(disc.p.x / 2) - 1, Math.floor(disc.p.y / 2) - 1, 3, 3)
          for (let i = 0; i < 36; i += 4) {
            pixel.data[i] = disc.color[0]
            pixel.data[i + 1] = disc.color[1]
            pixel.data[i + 2] = disc.color[2]
            pixel.data[i + 3] = 63
          }

          this.canvas.putImageData(pixel, Math.floor(disc.p.x / 2) - 1, Math.floor(disc.p.y / 2) - 1)
        }
      })
    },
    discSelected(d) {
      this.selectedDiscId = d;
    }
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
</script>