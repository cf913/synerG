<template>
  <div class="conversation_list text-left container tile gray-tile tile-shadow" style="position: relative">
    <div>
      <ul class="list-group clearfix" v-for="(conversation, index) in conversations" :key="index">
        <li class="list-group-item inner-tile">
          <div class="row">
            <div class="col-sm-2 image">
              <span v-for="(participant, index) in conversation.conversationId.participants" :key="index">
                <img v-if="participant.steamName !== user.steamName" id="avatar" :src="participant.img" alt="Avatar">
              </span>
            </div>
            <div class="col-sm-10">
              <span v-for="(participant, index) in conversation.conversationId.participants" :key="index">
                <h4 v-if="participant.steamName !== user.steamName">{{participant.steamName}} </h4>
              </span>
              <p>{{conversation.author.steamName}}: {{conversation.body}}</p>
            </div>
          </div>
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
  
  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }
  
  li .image {
    padding: 0;
  }
</style>
