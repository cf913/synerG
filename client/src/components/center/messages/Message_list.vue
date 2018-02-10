<template>
  <div class="conversation_list text-left container tile gray-tile tile-shadow" style="position: relative">
    <div>
      <ul class="list-group clearfix" v-for="(conversation, index) in conversations" :key="index">
        <li class="list-group-item inner-tile">
          <h4>{{conversation.author.steamName}}</h4>
          <p>{{conversation.body}}</p>
        </li>
      </ul>
      <!--<p>{{conversations}}</p>-->
      <p>This is conversations list</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    conversations () {
      return this.$store.getters.conversations
    }
  },
  methods: {
    getConversations () {
      this.$store.dispatch('getConversations')
    }
  },
  activated () {
    console.log('Fetching conversation list')
    this.getConversations()
  }
}
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>
