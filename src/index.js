import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state() {
        return {
            userName: null,
            userId: null,
            token: null,
            tokenExpiration: null
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        }
    },
    actions: {
        signup(context, payload) {
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS_EXdZFR3ZpAsPmEIHx2Ghp8VFapWrX0`, {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            }).then((responseData) => {
                console.log(responseData);
                context.commit('setUser', {
                    userName: payload.userName,
                    token: responseData.idToken,
                    userId: responseData.localId,
                    tokenExpiration: responseData.expiresIn
                })
            });
            
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userName = payload.userName
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        }
    }
});

export default store;