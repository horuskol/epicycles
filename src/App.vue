<template>
    <svg viewBox="0 0 1000 1000"
         xmlns="http://www.w3.org/2000/svg"
         height="500"
         width="500"
    >
        <circle :cx="center.x" :cy="center.y" :r="radius" fill="none" stroke="black" stroke-width="5"/>

        <disc v-for="(disc, d) in discs" :key="d" :disc="disc" />
    </svg>
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
      center: { x: 500, y: 500 },
      radius: 400,
      timer: null,
      discs: [
        { r: 200, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 100, color: 'green' },
        { r: 100, center: {x: 0, y: 0}, p: {x: 0, y: 0}, l: 200, color: 'blue' },
      ]
    }
  },
  mounted() {
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
      })

      this.angle += 0.5;
    }, 1)
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
</script>