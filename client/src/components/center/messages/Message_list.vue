<template>
  <div class="conversation_list text-left container tile gray-tile tile-shadow" style="position: relative">
    <div>
      <ul class="list-group clearfix" v-for="(conversation, index) in conversations" :key="index">
        <li class="list-group-item inner-tile">
          <span v-for="(participant, index) in conversation.conversationId.participants" :key="index">
            <h4 v-if="participant.steamName !== user.steamName">{{participant.steamName}} </h4>
          </span>
          <p>{{conversation.author.steamName}}: {{conversation.body}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
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
