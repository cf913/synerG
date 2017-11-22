<template>
  <div class="login">
    <h3 class="py-3">Login</h3>
    <b-container>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="exampleInputGroup1"
                      label="Email" label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        type="email" v-model="email" required
                        placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Password" label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="password" v-model="password" required
                        placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox v-model="checked" id="exampleInput4">
            Remember me
          </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="secondary">Reset</b-button>
        <p class="to_register">
					Not a member yet ?
					<b-link to="/register">Join us</b-link>
				</p>
      </b-form>
    </b-container>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        email: '',
        password: '',
        checked: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password
        }
        console.log(formData)
        this.$store.dispatch('login', { email: formData.email, password: formData.password })
      }
    }
  }
</script>

<style scoped>
  .login{
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

  .to_register {
    font-size: 0.9em;
    margin-top: 10px;
  }
</style>
