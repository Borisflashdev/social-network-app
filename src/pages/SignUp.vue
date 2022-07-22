<template>
    <base-card>
        <div>
            <div>
                <h2>Sign Up</h2>
            </div>
            <form @submit.prevent="signup">
                <div class="form-action">
                    <input
                    type="email"
                    @click="isInvalid.email = false"
                    :class="{invalid: isInvalid.email}"
                    placeholder="Email" 
                    v-model="email">
                    <p class="invalid-text" v-show="isInvalid.email">Please enter a valid Email Address.</p>
                </div>

                <div class="form-action">
                    <input 
                    :type="passwordType"
                    @click="isInvalid.password = false"
                    :class="{invalid: isInvalid.password}" 
                    placeholder="Password"
                    v-model="password">
                    <p class="invalid-text" v-show="isInvalid.password">Password must be at least 6 characters.</p>
                </div>

                <div class="form-action">
                    <input 
                    :type="passwordType" 
                    @click="isInvalid.confirmPassword = false"
                    :class="{invalid: isInvalid.confirmPassword}" 
                    placeholder="Confirm Password" 
                    v-model="confirmPassword">
                    <p class="invalid-text" v-show="isInvalid.confirmPassword">Password and Confirm Password must be match.</p>
                </div>

                <div class="form-action">
                    <input type="checkbox" id="showPassword" :value="true" v-model="hidePassword" >
                    <label for="showPassword">Show Password</label>
                    <p class="invalid-text" v-show="isError">Something went wrong, please refresh and try again later.</p>
                </div>

                <div class="btn">
                    <base-button>Sign Up</base-button>
                </div>
            </form>
        </div>
    </base-card>
    <div class="wrapper">
        <p class="bottom-text">Already have an Account? <router-link to="/login" class="link">Login</router-link></p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            hidePassword: false,
            email: '',
            password: '',
            confirmPassword: '',
            isError: false,
            isInvalid: {
                email: false,
                password: false,
                confirmPassword: false
            }
        }
    },
    computed: {
        passwordType() {
            if (this.hidePassword === false) {
                return 'password';
            } else {
                return 'text';
            }
        }
    },
    methods: {
        signup() {
            if (this.email.length === 0) {
                this.isInvalid.email = true;
                return;
            }
            if (this.password.length < 6) {
                this.isInvalid.password = true;
                return;
            }
            if (this.password !== this.confirmPassword) {
                this.isInvalid.confirmPassword = true
                return;
            }
            
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBS_EXdZFR3ZpAsPmEIHx2Ghp8VFapWrX0`, {
                email: this.email,
                password: this.password,
                returnSecureToken: true
            }).then((responseData) => {
                console.log(responseData.data);
                this.$store.state.email = this.email;
                this.$store.state.token = responseData.data.idToken;
                this.$store.state.userId = responseData.data.localId;
                this.$store.state.tokenExpiration = responseData.data.expiresIn;
                
                localStorage.setItem('token', responseData.data.idToken);
                localStorage.setItem('userId', responseData.data.localId);
                localStorage.setItem('email', this.email);

            }).catch((error) => {
                console.log(error);
                this.isError = true;
            });

            if (this.isError === true) {
                return;
            } else if (this.isError === false) {
                this.$router.replace('/home');
                // window.location.reload();
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
</style>