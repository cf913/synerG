<template>
  <div class="message_details text-left container tile gray-tile tile-shadow" style="position: relative">
    <div class="tiled inner-tile">
      <p>Name of recipient</p>
    </div>
    <div class="tiled inner-tile">
      <p>Messages should appear here</p>
    </div>
    <div class="tiled inner-tile">
      <form>
        <div>
          <label class="col-form-label" for="message">Message:</label>
          <input type="text" class="form-control" id="message" name="message" v-model="message" placeholder="Write Message ...">
          <button><i class="fa fa-arrow-right fa-fw"></i></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  .tiled {
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 15px;
  }
</style>
