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

      <aplayer :music="music" />
      <div v-if="!isLoading && podcasts.length" class="podcasts-cont">
        <PodcastCard
          v-for="podcast in podcasts"
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
import Parser from "rss-parser";
import Logo from "./components/Logo";
import Aplayer from "vue-aplayer";
import PodcastCard from "./components/PodcastCard";
import { Stretch } from "vue-loading-spinner";
export default {
  components: {
    Logo,
    Aplayer,
    PodcastCard,
    Stretch,
  },
  async created() {
    const parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    try {
      const feed = await parser.parseURL(
        CORS_PROXY +
          "https://feeds.soundcloud.com/users/soundcloud:users:10016/sounds.rss"
      );

      const allTracks = [];

      feed.items.forEach((item) => {
        allTracks.push({
          id: allTracks.length + 1,
          title: item.title,
          author: item.itunes.author,
          src: item.enclosure.url,
          pic:
            item.itunes.image.slice(0, item.itunes.image.indexOf("3000x3000")) +
            "300x300.jpg",
        });
      });

      this.isLoading = false;

      this.podcasts = allTracks;
    } catch (error) {
      console.log(error);
      this.podcasts = [];
      // this.loaderText = "Треков пока нету :(";
      this.loaderText = "Произошла ошибка :(";
      this.isLoading = false;
    }
  },

  data() {
    return {
      isLoading: true,
      lastPlayed: 0,
      loaderText: "Гружу треки..",
      music: {
        title: "Выберите трек",
        artist: "",
        src: "",
        pic: "./bg_default.png",
      },
    };
  },
  fetchOnServer: false,

  mounted() {
    document.querySelector(".aplayer-pic").addEventListener("click", () => {
      if (!this.isPaused() && this.lastPlayed) {
        this.playAnimation();
      }
      this.stopPulse();
      console.log(this.lastPlayed);
    });

    const audio = document.querySelector("audio");
    audio.onpause = () => {
      this.stopPulse();
    };
    audio.onplay = () => {
      this.playAnimation();
    };
  },

  methods: {
    playAnimation() {
      const element = this.podcasts.find(
        (el) => el.src === document.querySelector("audio").getAttribute("src")
      );

      document
        .querySelector(`[data-track-id="${element.id}"]`)
        .querySelector(".card__play-icon")
        .classList.add("pulsating-circle");
    },

    stopPulse() {
      document.querySelectorAll(".pulsating-circle").forEach((element) => {
        element.classList.remove("pulsating-circle");
      });
    },

    isPaused() {
      const player = document.querySelector("audio");
      return player.paused;
    },

    next(id) {
      const track = this.podcasts.filter((track) => track.id === id)[0];
      if (!track || !track.id) return;
      const player = document.querySelector("audio");
      player.pause();
      player.currentTime = 0;
      player.src = track.src;

      this.stopPulse();

      //     document.querySelectorAll('.pulsating-circle').forEach(element => {
      //   element.classList.remove('pulsating-circle')
      // });

      // this.music.artist = track.author
      this.music.title = track.title;
      this.music.pic = track.pic;
      this.lastPlayed = id;

      player
        .play()
        .then(
          document
            .querySelector(`[data-track-id="${track.id}"] .card__play-icon`)
            .classList.add("pulsating-circle")
        );
    },
  },
};
</script>

<style lang="scss">
body {
  background: #1d1c33;
}
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
  // &::after {
  //   content: '';
  //   flex: auto;
  // }
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
