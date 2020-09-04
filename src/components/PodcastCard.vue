<template>
  <div class="card" :style="randomBackground()" :data-track-id="data.id">
    <div class="card__title">
      {{ data.title }}
    </div>
    <div class="card__author">
      {{ data.author }}
    </div>
    <img :src="data.pic" alt="" class="card__img" />
    <img
      class="card__play-icon"
      src="@/assets/play_btn.svg"
      :data-track-id="data.id"
      @click="play(data.id)"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    play: Function,
    color1: {
      type: String,
      default: "#c31432",
    },
    color2: {
      type: String,
      default: "#240b36",
    },
  },
  data: () => {
    return {
      gradients: [
        ["#0F2027", "#2C5364"],
        ["#b92b27", "#1565C0"],
        ["#8E2DE2", "#4A00E0"],
        ["#c31432", "#240b36"],
        ["#ad5389", "#3c1053"],
        ["#355C7D", "#C06C84"],
        ["#23074d", "#cc5333"],
        ["#0f0c29", "#24243e"],
        ["#7303c0", "#ec38bc"],
        ["#3a6186", "#89253e"],
        ["#808080", "#3fada8"],
        ["#000428", "#004e92"],
      ],
    };
  },
  methods: {
    randomBackground() {
      const element = this.gradients[
        Math.floor(Math.random() * this.gradients.length)
      ];
      return `background: linear-gradient(50deg, ${element[0]}, ${element[1]});`;
    },
    randomImage() {
      const element = this.images[
        Math.floor(Math.random() * this.images.length)
      ];
      return element;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 250px;
  height: 300px;
  border-radius: 15px;
  position: relative;
  margin: 10px;
  overflow: hidden;
  border: 1px solid #404040;

  &:hover {
    .card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: rotateZ(0);
    }
  }
}

.card__author {
  position: absolute;
  top: 10px;
  left: 20px;
  color: #fff;
}

.card__title {
  padding-left: 10%;
  text-align: left;
  padding-top: 55%;
  color: #fff;
  font-weight: bold;
  width: 75%;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.card__img {
  transition: all 0.3s;
  transform: rotateZ(30deg);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
}

.card__play-icon {
  width: 44px;
  height: 44px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    height: 55px;
  }
}

// animation
.pulsating-circle {
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.33);
  }
  80%,
  100% {
    opacity: 0;
  }
}
</style>
