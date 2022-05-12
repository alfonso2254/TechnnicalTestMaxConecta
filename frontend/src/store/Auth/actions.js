import axios from "axios";

export default {
    login({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', payload)
                .then(response => {
                    const { access_token, userInfo } = response.data
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));
                    commit("SET_LOGIN", { access_token, userInfo });
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
        })
    },
    logout({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/api/logout', {
                headers: { Authorization: "Bearer " + state.access_token },
            }).then(response => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("userInfo");
                resolve(response)
            }).catch(error => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("userInfo");
                reject(error)
            })
        })
    },
    signup({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/signup', payload)
                .then(response => {
                    resolve(response)
                }
                ).catch(error => {
                    reject(error)
                })
        })
    },


}