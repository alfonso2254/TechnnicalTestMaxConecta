export default {
    SET_LOGIN(state, {access_token, userInfo}) {
        state.access_token = access_token
        state.userInfo = userInfo
    },
}