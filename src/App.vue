<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Подкасты</router-link> |
      <router-link to="/about">Информация</router-link>
    </div>
    <keep-alive include="Home">
      <router-view :isLoading="isLoading" :loaderText="loaderText" />
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

      this.$store.commit("tracks", allTracks);
    } catch (error) {
      console.log(error);
      // this.loaderText = "Треков пока нету :(";
      this.loaderText = "Произошла ошибка :(";
      this.isLoading = false;
    }
  },

  mounted() {
    document.querySelector(".aplayer-pic").addEventListener("click", (e) => {
      console.log(e.target);
      console.log(this.lastPlayed);
    });

    const audio = document.querySelector("audio");
    audio.onpause = () => {
      this.$store.commit("state", "pause");
    };
    audio.onplay = () => {
      this.$store.commit("state", "play");
    };

    this.$on("play", function(id) {
      this.play(id);
      this.$store.commit("lastTrack", id);
    });
  },

  methods: {
    isPlayerPaused() {
      const player = document.querySelector("audio");
      return player.paused;
    },

    play(id) {
      console.log(id);
      // const track = this.podcasts.filter((track) => track.id === id)[0];
      const track = this.$store.getters.currentTrackData(id);
      if (!track || !track.id) return;
      const player = document.querySelector("audio");
      player.pause();
      player.currentTime = 0;
      player.src = track.src;

      this.$store.commit("pause", true);

      this.music.title = track.title;
      this.music.pic = track.pic;
      this.lastPlayed = id;

      player
        .play()
        .then(
          document
            .querySelector(`[data-track-id="${track.id}"] .card__play-icon`)
            .classList.add("pulsating-circle")
        )
        .then(() => this.$store.commit("pause", false));
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
  text-align: left;

  a {
    font-weight: bold;
    color: #ccc;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
