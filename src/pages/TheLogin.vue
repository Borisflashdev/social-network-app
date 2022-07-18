<template>
    <base-card>
        <div>
            <div>
                <h2>Login</h2>
            </div>
            <form>
                <div class="form-action">
                    <input type="email" id="email" placeholder="Email">
                </div>
                <div class="form-action">
                    <input :type="passwordType" id="password" placeholder="Password">
                </div>
                <div class="form-action">
                    <input type="checkbox" id="showPassword" :value="true" v-model="hidePassword" >
                    <label for="showPassword">Show Password</label>
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
export default {
    data() {
        return {
            hidePassword: false
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
</style>