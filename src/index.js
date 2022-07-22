import { createStore } from "vuex";
// import axios from "axios";

const store = createStore({
    state() {
        return {
            email: null,
            userId: null,
            token: null,
            tokenExpiration: null,
        };
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        isAuthenticated(state) {
            return !!state.token;
        }
    },
    actions: {
        autoLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');

            if (token && userId && email) {
                context.commit('setUser', {
                    email: email,
                    token: token,
                    userId: userId,
                    tokenExpiration: null
                });
            }
        }
        
        // login(context, payload) {
        //     axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBS_EXdZFR3ZpAsPmEIHx2Ghp8VFapWrX0`, {
        //         email: payload.email,
        //         password: payload.password,
        //         returnSecureToken: true
        //     }).then((responseData) => {
        //         console.log(responseData);
        //         context.commit('setUser', {
        //             email: payload.email,
        //             token: responseData.idToken,
        //             userId: responseData.localId,
        //             tokenExpiration: responseData.expiresIn
        //         })
        //     }).catch((error) => {
        //         if (error) {
        //             context.commit('setError', true);
        //             return;
        //         }
        //         context.commit('setError', false);
        //     });
        // },
        // signup(context, payload) {
        //     axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS_EXdZFR3ZpAsPmEIHx2Ghp8VFapWrX0`, {
        //         email: payload.email,
        //         password: payload.password,
        //         returnSecureToken: true
        //     }).then((responseData) => {
        //         console.log(responseData);
        //         context.commit('setUser', {
        //             email: payload.email,
        //             token: responseData.idToken,
        //             userId: responseData.localId,
        //             tokenExpiration: responseData.expiresIn
        //         })
        //     });
        // }
    },
    mutations: {
        setUser(state, payload) {
            state.email= payload.email;
            state.token = payload.token;
            state.userId = payload.userId;
            state.tokenExpiration = payload.tokenExpiration;
        }
    }
});

export default store;