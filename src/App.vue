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
             class="grid-in-center"
             v-if="showCircles"
        >
            <circle :cx="center.x" :cy="center.y" :r="radius" fill="none" stroke="black" stroke-width="2"/>

            <disc v-for="(disc, d) in discs" :key="d" :disc="disc"/>
        </svg>

        <div class="grid-in-controls flex flex-col">
            <button class="border border-blue-500 rounded"
                    @click.prevent="showCircles = !showCircles">Show Circles</button>

            <button v-if="timer"
                    class="border border-blue-500 rounded"
                    @click.prevent="pause">Pause</button>

            <button v-if="!timer"
                    class="border border-blue-500 rounded"
                    @click.prevent="start">Start</button>

            <button class="border border-blue-500 rounded"
                    @click.prevent="reset">Reset</button>
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
        {r: 200, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 50, color: [255, 0, 0]},
        {r: 100, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 50, color: [255, 0, 191], parent:0},
      ],
      canvas: null,
      showCircles: true,
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

      this.maxAngle = 360 * this.radius / Math.min(...this.discs.map((disc => {
        return disc.radius
      })))

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
    pause()
    {
      clearInterval(this.timer)
      this.timer = null
    },
    start() {
      this.timer = setInterval(() => {
        this.calculate()

        this.angle += 1

        if (this.angle >= this.maxAngle) {
          this.angle = 0
        }
      }, 1)
    },
    calculate() {
      this.discs.forEach((disc) => {
        if (disc.parent !== undefined) {
          disc.center = {
            x: this.discs[disc.parent].center.x + (this.discs[disc.parent].r - disc.r) * Math.cos(toRadians(this.angle) * disc.r / this.discs[disc.parent].r),
            y: this.discs[disc.parent].center.y + (this.discs[disc.parent].r - disc.r) * Math.sin(toRadians(this.angle) * disc.r / this.discs[disc.parent].r),
          }

          disc.p = {
            x: disc.center.x + disc.l * Math.cos((1 - disc.r / this.discs[disc.parent].r) * toRadians(this.angle)),
            y: disc.center.y - disc.l * Math.sin((1 - disc.r / this.discs[disc.parent].r) * toRadians(this.angle)),
          }
        } else {
          disc.center = {
            x: this.center.x + (this.radius - disc.r) * Math.cos(toRadians(this.angle) * disc.r / this.radius),
            y: this.center.y + (this.radius - disc.r) * Math.sin(toRadians(this.angle) * disc.r / this.radius),
          }

          disc.p = {
            x: disc.center.x + disc.l * Math.cos((1 - disc.r / this.radius) * toRadians(this.angle)),
            y: disc.center.y - disc.l * Math.sin((1 - disc.r / this.radius) * toRadians(this.angle)),
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
    }
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
</script>