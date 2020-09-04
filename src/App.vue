<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Подкасты</router-link> |
      <router-link to="/about">Информация</router-link>
    </div>
    <keep-alive include="Home">
      <router-view
        :podcasts="podcasts"
        :isLoading="isLoading"
        :loaderText="loaderText"
        :isPaused="isPaused"
      />
    </keep-alive>
    <Aplayer :music="music" />
  </div>
</template>

<script>
import Aplayer from "vue-aplayer";
import Parser from "rss-parser";

export default {
  components: {
    Aplayer,
  },

  data() {
    return {
      podcasts: [],
      isLoading: true,
      isPaused: false,
      lastPlayed: 0,
      loaderText: "Гружу треки..",
      music: {
        title: "Выберите трек",
        artist: " ",
        src: "",
        pic: "./bg_default.png",
      },
    };
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

  mounted() {
    document.querySelector(".aplayer-pic").addEventListener("click", () => {
      if (!this.isPlayerPaused && this.lastPlayed) {
        this.playAnimation();
      }
      this.stopPulse();
      console.log(this.lastPlayed);
    });

    const audio = document.querySelector("audio");
    audio.onpause = () => {
      this.stopPulse();
      // this.isPaused = true;
    };
    audio.onplay = () => {
      this.playAnimation();
      // this.isPaused = false;
    };

    this.$on("play", function(id) {
      this.play(id);
    });
  },

  methods: {
    stopPulse() {
      document.querySelectorAll(".pulsating-circle").forEach((element) => {
        element.classList.remove("pulsating-circle");
      });
    },

    playAnimation() {
      const element = this.podcasts.find(
        (el) => el.src === document.querySelector("audio").getAttribute("src")
      );

      if (!element) return;

      document
        .querySelector(`[data-track-id="${element.id}"]`)
        .querySelector(".card__play-icon")
        .classList.add("pulsating-circle");
    },

    isPlayerPaused() {
      const player = document.querySelector("audio");
      return player.paused;
    },

    play(id) {
      console.log(id);
      const track = this.podcasts.filter((track) => track.id === id)[0];
      if (!track || !track.id) return;
      const player = document.querySelector("audio");
      player.pause();
      player.currentTime = 0;
      player.src = track.src;

      this.stopPulse();

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ccc;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
