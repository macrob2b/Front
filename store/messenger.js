// holds your root state
export const state = () => ({
  notificationStatus: false,
})


// contains your mutations
export const mutations = {
  setNotificationStatus(state, status) {
    state.notificationStatus = status;
  }
}
