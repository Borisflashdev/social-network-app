<template>
    <base-card>
        <div>
            <div>
                <h2>Login</h2>
            </div>
            <form @submit="login">
                <div class="form-action">
                    <input 
                    type="email" 
                    id="email" 
                    placeholder="Email"
                    :class="{invalid: invalidEmail}"
                    @click="invalidEmail = false"
                    v-model="email">
                    <p class="invalid-text" v-show="invalidEmail">Please enter a valid Email.</p>
                </div>
                <div class="form-action">
                    <input 
                    :type="passwordType" 
                    id="password" 
                    placeholder="Password"
                    :class="{invalid: invalidPassword}"
                    @click="invalidPassword = false"
                    v-model="password">
                    <p class="invalid-text" v-show="invalidPassword">Please enter a valid Password.</p>
                </div>
                <div class="form-action">
                    <input type="checkbox" id="showPassword" :value="true" v-model="hidePassword" >
                    <label for="showPassword">Show Password</label>
                    <p class="invalid-text" v-show="isError">Something went wrong, please refresh or try again later.</p>
                </div>
                <div class="btn">
                    <base-button>Login</base-button>
                </div>
            </form>
        </div>
    </base-card>
    <div class="wrapper">
        <p class="bottom-text">Don't have a Account? <router-link to="/signup" class="link">Sign Up</router-link></p>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            hidePassword: false,
            email: '',
            password: '',
            invalidPassword: false,
            invalidEmail: false,
            isError: false
        }
    },
    computed: {
        passwordType() {
            if (this.hidePassword === false) {
                return 'password';
            } else {
                return 'text';
            }
        },
    },
    methods: {
        async login() {
            this.isError = false;

            if (this.email === '') {
                this.invalidEmail = true
                return;
            }
            if (this.password === '') {
                this.invalidPassword = true;
                return;
            }

            await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBS_EXdZFR3ZpAsPmEIHx2Ghp8VFapWrX0`, {
                email: this.email,
                password: this.password,
                returnSecureToken: true
            }).then((responseData) => {
                console.log(responseData);
                this.$store.state.email = this.email;
                this.$store.state.token = responseData.idToken;
                this.$store.state.userId = responseData.localId;
                this.$store.state.tokenExpiration = responseData.expiresIn;
                localStorage.setItem('token', responseData.idToken);
                localStorage.setItem('userId', responseData.localId);
                localStorage.setItem('email', this.email);
            }).catch((error) => {
                console.log(error);
                this.isError = true;
            });

            if (this.isError === true) {
                return;
            } else if (this.isError === false) {
                this.$router.replace('/home');
            }
        }
    }
}
</script>

<style scoped>

h2 {
    text-align: center;
    margin-top: 10px;
}

input[type=text] {
    width:50%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
}

input[type=password] {
    width:50%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
}

input[type=email] {
    width:50%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
}
  
input:focus {
    border-color: black;
    box-shadow:0 0 8px 0 black;
}

.form-action {
    text-align: center;
}

.email-label {
    margin-right: 30px;
    text-align: center;
}

.btn {
    display: flex;
    justify-content: center;
    padding-top: 10px;
}

.wrapper {
    color: white;
    text-align: center;
}

.bottom-text {
    color: white;
}

.link {
    color: #aaa;
}

.link:hover {
    color: white;
}

.invalid {
    border-color: #d9534f;
    box-shadow:0 0 8px 0 #d9534f;
}

.invalid-text {
    color: #d9534f;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 14px;
}
</style>