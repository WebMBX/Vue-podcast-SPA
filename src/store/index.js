import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    state: "stop",
    isPause: false,
    isPlay: false,
    lastTrackId: 0,
    error: false,
    tracks: [],
  },
  mutations: {
    pause(state, val) {
      state.isPause = val;
    },
    state(state, val) {
      state.state = val;
    },
    lastTrack(state, val) {
      state.lastTrackId = +val;
    },
    tracks(state, val) {
      state.tracks = val;
    },
  },
  actions: {},
  getters: {
    playing: (state) => {
      if (state.state !== "play") return false;
      return state.lastTrackId;
    },
    currentTrackData: (state) => (id) => {
      return state.tracks.filter((track) => track.id === id)[0];
    }
  },
  modules: {},
});
