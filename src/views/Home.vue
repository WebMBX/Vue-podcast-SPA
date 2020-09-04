<template>
  <div class="container">
    <div>
      <div v-show="!isLoading">
        <Logo />
        <h2>
          AdvoCat Podcast Show
        </h2>
      </div>

      <div v-show="isLoading">
        <stretch />
        <h5 class="info-text">
          {{ loaderText }}
        </h5>
      </div>

      <div
        v-if="!isLoading && $store.state.tracks.length"
        class="podcasts-cont"
      >
        <PodcastCard
          v-for="podcast in $store.state.tracks"
          :key="podcast.id"
          :data="podcast"
          :play="next"
        >
          <template #rating>{{ podcast.id }}</template>
        </PodcastCard>
      </div>
      <h5 v-else-if="!isLoading && !podcasts.length" class="info-text">
        {{ loaderText }}
      </h5>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo";
import PodcastCard from "../components/PodcastCard";
import { Stretch } from "vue-loading-spinner";
export default {
  props: ["isLoading", "loaderText"],
  name: "Home",
  components: {
    Logo,
    PodcastCard,
    Stretch,
  },

  methods: {
    next(id) {
      this.$parent.$emit("play", id);
    },
  },
};
</script>

<style lang="scss">
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

// Player
.aplayer {
  overflow: visible !important;
  position: fixed !important;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  margin: 0 !important;
  background: #333547 !important;
}

.aplayer .aplayer-body {
  padding-bottom: 5px;
}

.aplayer .aplayer-body .aplayer-info {
  background: #333546;
  color: #fff;
  padding: 14px 8% 3px 10% !important;
}

.aplayer-pic {
  position: absolute !important;
  background-color: #c3c3c3 !important;
  top: -20px;
  left: 2%;
  border: 2px solid #fff;
  border-radius: 8px;
  background-position: center;
}

h2 {
  color: #fff;
  margin: 1rem;
  font-size: 2.2rem;
}
.info-text {
  color: rgb(65, 184, 131);
  font-size: 3rem;
  margin: 2rem 0;
  font-family: sans-serif;
}
.podcasts-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 900px;
  padding-bottom: 40px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

// loader
.spinner {
  display: block;
  margin: 0 auto;
}
.spinner--stretch {
  width: 100px !important;
  height: 100px !important;
}
.rect {
  width: 5% !important;
  margin-right: 2px;
}

// Player
.aplayer .aplayer-bar-wrap .aplayer-bar {
  height: 3px;
}

.aplayer .aplayer-bar-wrap .aplayer-bar .aplayer-loaded,
.aplayer .aplayer-bar-wrap .aplayer-bar .aplayer-played {
  height: 3px;
}

.aplayer .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb {
  margin-top: -7px;
  width: 14px;
  height: 14px;
}

@media (max-width: 500px) {
  .aplayer .aplayer-body {
    padding-bottom: 10px;
  }
  .aplayer .aplayer-pic {
    height: 50px;
    width: 50px;
  }

  .aplayer .aplayer-body .aplayer-info .aplayer-music .aplayer-title {
    margin-left: 30px;
  }
}
</style>
