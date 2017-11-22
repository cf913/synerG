<template>
  <div class="login-register">
    <h3 class="py-3">Sign up</h3>
    <div class="container">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="exampleInputGroup2"
                      label="Username" label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="text" v-model="form.username" required
                        placeholder="Enter name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup1"
                      label="Email" label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        type="email" v-model="form.email" required
                        placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Password" label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="password" v-model="form.password" required
                        placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <!-- <b-form-group id="exampleInputGroup2"
                      label="Confirm Password" label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="password" v-model="confirm_password" required
                        placeholder="Re-enter password"
          ></b-form-input>
        </b-form-group> -->
        <p class="message">
          We will never share your email with anyone else.
        </p>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="secondary">Reset</b-button>
        <p class="to_login">
					Already a member? Whoops...
					<b-link to="/login">Log In</b-link>
				</p>
      </b-form>
    </div>
  </div>
</template>

<script>
  // const host = `http://${window.location.hostname}:3000`

  export default {
    data: () => {
      return {
        form: {
          email: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.form)
        this.$store.dispatch('signup', {
          email: this.form.email,
          username: this.form.username,
          password: this.form.password
        })
      }
    }
  }
</script>

<style scoped>
  .login-register {
    background: #222;
    min-height: 80vh;
    color: white;
    margin: auto;
  }

  .container {
    max-width: 400px;
    padding: 30px 50px;
    background: #111;
  }

  .message {
    font-size: 0.8em;
  }

  .to_login {
    font-size: 0.9em;
    margin-top: 10px;
  }
</style>
