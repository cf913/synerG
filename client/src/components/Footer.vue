<template>
  <footer class="footer page-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 h-100 text-center text-lg-left my-auto">
          <ul class="list-inline mb-2">
            <li class="list-inline-item">
              <a href="#">About</a>
            </li>
            <li class="list-inline-item">&sdot;</li>
            <li class="list-inline-item">
              <a href="#">Contact</a>
            </li>
            <li class="list-inline-item">&sdot;</li>
            <li class="list-inline-item">
              <router-link :to="{name: 'terms'}">Terms of Use</router-link>
            </li>
            <li class="list-inline-item">&sdot;</li>
            <li class="list-inline-item">
              <router-link :to="{name: 'privacy'}">Privacy Policy</router-link>
            </li>
            <li class="list-inline-item">
              <span class="text-muted small mb-4 mb-lg-0">&copy; SynerG 2018. All Rights Reserved.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 5px;
  background: #111;
}

footer.footer {
  background-color: #111;
  color: rgba(169, 1, 1, 0.8); 
}

footer.footer a {
  color: rgba(169, 1, 1, 0.8);
  font-size: 12px; 
}

footer.footer span {
  font-size: 12px;
}
</style>