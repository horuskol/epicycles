<template>
    <svg viewBox="0 0 1000 1000"
         xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="500" cy="500" r="400" fill="none" stroke="black"/>

        <disc px="500" py="500" pr="400" r="200" :a="angle" color="red"/>
        <disc px="500" py="500" pr="400" r="100" :a="angle" color="green"/>
        <disc px="500" py="500" pr="400" r="50" :a="angle" color="blue"/>
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
      timer: null,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.angle++;
      if (this.angle === 360) {
        this.angle = 0;
      }
    }, 50)
  }
}
</script>