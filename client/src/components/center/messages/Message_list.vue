<template>
    <ul class="conversation_list text-left tile gray-tile inner-tile" id="conversation-list">
      <li v-if="conversation.conversationId.participants.filter(p => p.steamName !== user.steamName)[0]" class="" v-for="(conversation, index) in conversations" :key="index">
          <router-link :to="{ name: 'messageDetails', params: { id: conversation.conversationId._id }}">
        <div class="row">
          
          <div class="col-4 image">
            <img 
              v-if="conversation.conversationId.participants.filter(p => p.steamName !== user.steamName)[0]" 
              id="avatar" 
              :src="conversation.conversationId.participants.filter(p => p.steamName !== user.steamName)[0].img" 
              alt="Avatar"
            >
          </div>
          
          <div class="col-8 preview">
            <h5>
              {{conversation.conversationId.participants.filter(p => p.steamName !== user.steamName)[0] ? conversation.conversationId.participants.filter(p => p.steamName !== user.steamName)[0].steamName : 'Fix this'}}
            </h5>
            <p class="message-preview">{{conversation.body}}</p>
          </div>
        </div>
          </router-link>
      </li>
    </ul>
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
  ul, li {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  li {
    padding: 10px;
  }

  .conversation_list {
    border-radius: 5px 0 0 5px;
  }

  li:hover {
    background-color: #222;
  }

  li:first-child:hover {
    border-radius: 5px 0 0 0;
  }

  li:last-child:hover {
    border-radius: 0 0 0 5px;
  }
  
  #avatar {
    width: 100%;
    border: 2px solid #fff;
    border-radius: 5px;
  }

  .message-preview{
    font-size: 0.9em;
    color: #aaa;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
  }
  #conversation-list {
    overflow-y: scroll;
    height: 88vh;
    padding-right: 10px;
  }
</style>
