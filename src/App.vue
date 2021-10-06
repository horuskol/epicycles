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
        >
            <circle :cx="center.x" :cy="center.y" :r="radius" fill="none" stroke="black" stroke-width="2"/>

            <disc v-for="(disc, d) in discs" :key="d" :disc="disc" />
        </svg>
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
      center: { x: 500, y: 500 },
      radius: 400,
      timer: null,
      discs: [
        { r:  25, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 375, color: [255,   0,   0] },
        { r:  50, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 350, color: [255, 127,   0] },
        { r:  75, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 325, color: [255, 255,   0] },
        { r: 100, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 300, color: [  0, 255,   0] },
        { r: 125, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 275, color: [  0,   0, 255] },
        { r: 150, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 250, color: [127,   0, 255] },
        { r: 175, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 225, color: [255,   0, 255] },
      ],
      canvas: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.canvas = document.getElementById('epicycles').getContext('2d')

      this.maxAngle = 360 * this.radius / Math.min(...this.discs.map((disc => {
        return disc.radius;
      })))

      this.timer = setInterval(() => {
        this.discs.forEach((disc, d, discs) => {
          discs[d].center = {
            x: this.center.x + (this.radius - disc.r) * Math.cos(toRadians(this.angle) * disc.r / this.radius),
            y: this.center.y + (this.radius - disc.r) * Math.sin(toRadians(this.angle) * disc.r / this.radius),
          }

          discs[d].p = {
            x: disc.center.x + disc.l * Math.cos((1 - disc.r / this.radius) * toRadians(this.angle)),
            y: disc.center.y - disc.l * Math.sin((1 - disc.r / this.radius) * toRadians(this.angle)),
          }

          if (disc.p.x > 0 && disc.p.x < 1000 && disc.p.y > 0 && disc.p.y < 1000) {
            const pixel = this.canvas.getImageData(Math.floor(disc.p.x / 2) - 1, Math.floor(disc.p.y / 2) - 1, 3, 3)
            for (let i = 0; i < 36; i += 4) {
              pixel.data[i] = disc.color[0]
              pixel.data[i + 1] = disc.color[1]
              pixel.data[i + 2] = disc.color[2]
              pixel.data[i + 3] = 127
            }

            this.canvas.putImageData(pixel, Math.floor(disc.p.x / 2) - 1, Math.floor(disc.p.y / 2) - 1)
          }
        })

        this.angle += 1;

        if (this.angle >= this.maxAngle) {
          this.angle = 0;
        }
      }, 1)
    })
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
</script>