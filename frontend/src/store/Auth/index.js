import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
    namespaced: true,
    state: {
        access_token: localStorage.getItem("access_token") || null,
        userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    },
    mutations,
    actions,
    getters
}
