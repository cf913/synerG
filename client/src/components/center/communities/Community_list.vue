<template>
  <div class="community_list text-left container" style="position: relative">
    <b-form>
      <b-form-input type="text" placeholder="Search for communities..." v-model="community_search"></b-form-input>
      <b-button type="submit" @click.prevent="onSubmit()" @keyup.enter.prevent="onSubmit" variant="info"><i class="fa fa-search"></i> Search</b-button>
      <b-button type="reset" @click.prevent="onReset()" variant="warning">Reset</b-button>
    </b-form>
    <div v-if="loading" class="text-center">
      <p class="lead">Searching for communities...</p>
      <img src="../../../assets/loading.svg" alt="">
    </div>
    <ul class="list-group clearfix" v-for="(community, index) in communities" :key="index">
      <li class="list-group-item inner-tile">
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
  .padding-0{
      padding-right:0;
      padding-left:0;
  }
  .maxwidth{
    width: 100%;
    margin: 0;
  }
</style>
