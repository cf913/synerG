<template>
  <div class="community_list text-left container" style="position: relative">
    <b-form>
      <div class="text-search">
        <b-form-input type="text" placeholder="Search for communities..." v-model="community_search"></b-form-input>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <b-button size="sm" type="reset" @click.prevent="onReset()" variant="link" id="reset">Clear</b-button>
        <b-button size="sm" type="submit" @click.prevent="onSubmit()" @keyup.enter.prevent="onSubmit" variant="warning" id="search"><i class="fa fa-search fa-fw"></i> Search</b-button>
      </div>
    </b-form>
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for communities...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <ul class="list-group clearfix" id="community-list">
      <li class="list-group-item inner-tile"  v-for="(community, index) in communities" :key="index">
        <app-community-item :community="community"></app-community-item>
      </li>
    </ul>
  </div>
</template>

<script>
import CommunityItem from './Community_item.vue'

export default {
  data: () => {
    return {
      community_search: ''
    }
  },
  computed: {
    communities () {
      return this.$store.getters.communities
    },
    loading () {
      return this.$store.getters.community_list_loading
    }
  },
  methods: {
    getCommunities () {
      return this.$store.dispatch('getCommunities')
    },
    onSubmit () {
      const data = {
        communityName: this.community_search
      }
      this.$store.dispatch('getCommunities', data)
    },
    onReset () {
      this.community_search = ''
      this.$store.dispatch('getCommunities', {})
    }
  },
  components: {
    appCommunityItem: CommunityItem
  },
  created () {
    this.getCommunities()
  }
}
</script>

<style scoped>
  .inner-tile {
    margin-bottom: 5px;
  }
  .maxwidth{
    width: 100%;
    margin: 0;
  }

  li {
    padding: 5px 8px;
  }

  ul {
    margin-bottom: 5px;
  }

   /*STYLING THE SEARCH CRITERIA*/
  div.text-search {
    margin: 0 5px;
  }

  input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #fff;
  }
  
  input::-ms-input-placeholder { /* Microsoft Edge */
    color: #fff;
  }

  input.form-control {
    background: transparent;
    border: none;
    border-bottom: solid 1px #f00;
    color: #fff;
    border-radius: 0;
  }

  div.d-flex.justify-content-end {
    padding-right: 5px;
    margin-top: 2px;
    margin-bottom: 5px;
  }

    /* BUTTONS */
  #reset {
    margin: 10px 5px;
    color: white;
    cursor: pointer;
  }

  /* #search {
    cursor: pointer;
  } */

  #community-list {
    overflow-y: scroll;
    height: 65.5vh;
  }
</style>
