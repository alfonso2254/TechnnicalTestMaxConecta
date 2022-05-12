export default {
    loggedIn(state) {
        return state.access_token !== null
    }
}