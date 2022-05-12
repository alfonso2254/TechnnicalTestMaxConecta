import axios from "axios";

export default {
    index({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.get('/api/tasks', payload)
                .then(res => {
                    commit('SET_TASKS', res.data)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    store({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.post('/api/tasks', payload)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    update({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios.put('/api/tasks/' + payload.id, payload)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    delete({ commit }, id) {
        return new Promise((resolve, reject) => {
            axios.delete('/api/tasks/' + id)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    }
}