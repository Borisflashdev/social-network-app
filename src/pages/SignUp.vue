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
                    type="text"
                    @click="isInvalid.userName = false"
                    :class="{invalid: isInvalid.userName}"
                    placeholder="Username" 
                    v-model="userName">
                    <p class="invalid-text" v-show="isInvalid.userName">Please enter a valid Username.</p>
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
export default {
    data() {
        return {
            hidePassword: false,
            email: '',
            password: '',
            userName: '',
            confirmPassword: '',
            isInvalid: {
                email: false,
                userName: false,
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
            if (this.userName.length === 0) {
                this.isInvalid.userName = true;
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
            
            this.$store.dispatch('signup', {
                email: this.email,
                password: this.password,    
                userName: this.userName
            });
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