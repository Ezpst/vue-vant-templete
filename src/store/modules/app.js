/**
 * loading动画
 */
const state = {
  loading: false
}

const mutations = {
  SHOW: state => {
    state.loading = true
  },
  CLOSE: state => {
    state.loading = false
  }
}

const actions = {
  show: ({ commit }) => {
    commit('SHOW')
  },
  close: ({ commit }) => {
    commit('CLOSE')
  }
}

export default {
  state,
  mutations,
  actions
}
