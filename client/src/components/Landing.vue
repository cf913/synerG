<template>
  <div class="landing">
    <!-- Navigation -->
  <nav class="navbar navbar-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">SynerG<span class="beta">BETA</span> </a>
      <a class="btn btn-secondary" href="/auth/steam/steam"><i class="fa fa-steam fa-lg fa-fw"></i> Steam Login</a>
    </div>
  </nav>

  <!-- Masthead -->
  <header class="masthead text-white text-center">
    <div class="overlay"></div>
    <div class="container-fluid">
      <div class="title">
        <div class="jumbo">
          <h1 class="display-1 mt-5 mb-2">SynerG<span class="beta">BETA</span></h1>
          <p class="mb-1 subtitle">By the players. For the players.</p>
          <!-- <router-link to="/app"><button type="submit" class="btn btn-lg get-started">Get Started!</button></router-link> -->
          <a class="btn btn-lg get-started" href="/auth/steam/steam">Get Started!</a>
        </div>
      </div>
    </div>
  </header>

  <!-- Icons Grid -->
  <section class="features-icons text-center">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <i class="fa fa-steam"></i>
            </div>
            <h3>Login with Steam</h3>
            <p class="lead mb-0">No need to create a new account!</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <i class="fa fa-users"></i>
            </div>
            <h3>Find your team</h3>
            <p class="lead mb-0">Select the perfect teammates</p>

          </div>
        </div>
        <!-- <div class="col-lg-3">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <i class="fa fa-line-chart"></i>
            </div>
            <h3>Increase your MMR</h3>
            <p class="lead mb-0">Participate in one of our weekly tournaments</p>
          </div>
        </div> -->
        <div class="col-lg-4">
          <div class="features-icons-item mx-auto mb-0 mb-lg-3">
            <div class="features-icons-icon d-flex">
              <i class="fa fa-trophy"></i>
            </div>
            <h3>Win tournaments!</h3>
            <p class="lead mb-0">Participate in one of our weekly tournaments</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Image Showcases -->
  <section class="showcase">
    <div class="container-fluid p-0">
      <div class="row no-gutters">
        <div class="col-lg-6 order-lg-2 text-white showcase-img signals"></div>
        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
          <h2>Send out signals</h2>
          <p class="lead mb-0">For those of you, who don't know where to start in finding new members of your team
              or struggling to find a team to join, just send out a signal to other members listing 
              your requirements and let them approach you.</p>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-lg-6 text-white showcase-img cal"></div>
        <div class="col-lg-6 my-auto showcase-text">
          <h2>Form a team</h2>
          <p class="lead mb-0">Create your own new team and maybe you can be the next breakout team to snatch the prize 
              pool of the next tournament. Use our in-built timetable to set routine team practices or 
              even just a time to get together and simply enjoy the game.</p>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-lg-6 order-lg-2 text-white showcase-img chat"></div>
        <div class="col-lg-6 order-lg-1 my-auto showcase-text">
          <h2>Join communities</h2>
          <p class="lead mb-0">
              Form or join a community that shares something in common with you, whether that is simply 
              gamers in a nearby location, or you all share the passion for a custom game. 
              Make announcements in the community page to organise your next meetup or the next custom game tournament.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials text-center">
    <div class="container">
      <h2 class="mb-5">What people are saying...</h2>
      <div class="row">
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="img/testimonials-1.jpg" alt="">
            <h5>Dendi</h5>
            <p class="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="img/testimonials-2.jpg" alt="">
            <h5>YoungJoe1983</h5>
            <p class="font-weight-light mb-0">"Found my future wife thanks to SynerG!"</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="testimonial-item mx-auto mb-5 mb-lg-0">
            <img class="img-fluid rounded-circle mb-3" src="img/testimonials-3.jpg" alt="">
            <h5>Killer20</h5>
            <p class="font-weight-light mb-0">"Such a great time using SynerG, won the last tournament with my mates."</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="call-to-action text-white text-center">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 mx-auto">
          <h2 class="mb-4">Ready to get started?</h2>
        </div>
        <div class="col-md-10 col-lg-8 col-xl-7 mx-auto">
          <a class="btn btn-secondary" href="/auth/steam/steam"><i class="fa fa-steam fa-lg fa-fw"></i> Login with Steam</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ABOUT AND CONTACT -->
  <section class="about text-white text-center">
    <div class="container">
      <h2 class="mb-4">About us</h2>
      <div class="row">
        <div class="col-md-6 us">
          <div class="profile">
            <div class="profile-pic chad">
              <span class="name">Chad</span>
            </div>
            <div class="description">
              <h5>The 2k Support</h5>
              <p class="px-4 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus velit totam, 
                provident placeat distinctio accusantium fugit sit impedit eum alias?
              </p>
            </div>
          </div>
          <div class="profile">
            <div class="profile-pic terry">
              <span class="name">Terence</span>
            </div>
            <div class="description">
              <h5>The 7k Carry</h5>
              <p class="px-4 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolore molestias 
                alias quisquam necessitatibus atque?
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6 story">
          <div class="story-box">
            <h5>Story</h5>
            <p class="px-4 text-justify">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, magni aperiam eaque nihil, minus delectus tempore distinctio placeat aspernatur, soluta totam obcaecati! Sunt earum eaque nostrum, ducimus hic expedita est assumenda laboriosam voluptas molestiae quidem libero voluptatem totam blanditiis esse!
            </p>
            <p class="px-4 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia illum minus hic?
            </p>
            <p class="px-4 text-justify">
              Lorem ipsum dolor sit amet. Cupiditate commodi aliquam quidem quos eos alias officiis, ut sequi unde inventore.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
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
              <a href="#">Terms of Use</a>
            </li>
            <li class="list-inline-item">&sdot;</li>
            <li class="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p class="text-muted small mb-4 mb-lg-0">&copy; SynerG 2018. All Rights Reserved.</p>
        </div>
        <div class="col-lg-6 h-100 text-center text-lg-right my-auto">
          <ul class="list-inline mb-0">
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fa fa-facebook fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fa fa-twitter fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fa fa-reddit fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fa fa-steam fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item mr-3">
              <a href="#">
                <i class="fa fa-github fa-2x"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fa fa-gitlab fa-2x"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$route.query.token || this.$store.getters.idToken) {
      this.$store.dispatch('checkLogin', this.$route.query)
      this.$router.push('/app')
    }
  }
}
</script>

<style scoped>

.landing {
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.navbar.navbar-dark {
  background: rgba(118, 0, 0, 0.8);
}

.navbar-brand {
  font-weight: 700;
}

.beta {
  font-size: 0.5em;
}

h1 .beta {
  font-size: 0.2em;
}

.btn {
  border-radius: 25px;
}

header.masthead {
  position: relative;
  background-color: #343a40;
  background: url("../assets/img/profileV2.png") no-repeat top center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding-top: 8rem;
  padding-bottom: 8rem;
  overflow: hidden;
  min-height: 65vh;
}

header.masthead .overlay {
  position: absolute;
  background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.3) 50%, rgba(80,0,0,1));
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.title {
  margin: 0 0 0 auto;
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #f4f4f4;
}

.jumbo {
  margin-right: 10%;
  transform: translateX(900px);
  animation: key-in  1s forwards;
}

p.subtitle {
  font-size: 1.2em;
  font-weight: 500;
  position: relative;
  top: -30px;
  left: 22px;
}

.signals {
  background: url("../assets/img/signalsV1.png");
}

.cal {
  background: url("../assets/img/calV1.png");
}

.chat {
  background: url("../assets/img/chatV1.png");
}
@keyframes key-in {
  from { 
    opacity: 0;
    transform: translateX(900px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

.get-started {
  color: white;
  background: rgba(169, 1, 1, 0.8);
  cursor: pointer;
}

header.masthead h1 {
  font-size: 7rem !important;
}

.features-icons-icon.d-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.features-icons {
  color: #f4f4f4;
  background-color: rgb(133, 9, 9);
}

.showcase {
  background-color: #111;
  color: #f4f4f4;
}

.showcase .content {
  margin: 0 auto;
  width: 80%;
}

.showcase h2 {
  color: rgba(238, 23, 23, 0.8); 
}

.about {
  padding-top: 40px;
  background: #111;
}


.profile {
  padding: 20px;
  display: flex;
}

.us {
  padding: 10px;
  border-right: 3px solid rgba(238, 23, 23, 0.6);
}

.story {
  padding: 30px;
}

.about h5 {
  color: rgba(238, 23, 23, 0.8);
}

.profile-pic {
  height: 100px;
  width: 100px;
  border: 3px solid ;
  border-radius: 50%;
}

.profile-pic.chad {
  background: url('../assets/img/chad.jpg') center center;
  background-size: cover;
}

.profile-pic.terry {
  background: url('../assets/img/pic.png') center center;
  background-size: cover;
}

.description {
  flex:1;
}

span.name {
  display: block;
  font-weight: 600;
  position: relative;
  top: 105px;
}




@media (min-width: 768px) {
  header.masthead {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }
  header.masthead h1 {
    font-size: 3rem;
  }
}

.showcase .showcase-text {
  padding: 3rem;
}

.showcase .showcase-img {
  min-height: 20rem;
  background-size: cover;
}

@media (min-width: 768px) {
  .showcase .showcase-text {
    padding: 7rem;
  }
}

.features-icons {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.features-icons .features-icons-item {
  max-width: 20rem;
}

.features-icons .features-icons-item .features-icons-icon {
  height: 5rem;
}

.features-icons .features-icons-item .features-icons-icon i {
  font-size: 4rem;
}

/* .features-icons .features-icons-item:hover .features-icons-icon i {
  font-size: 5rem;
} */

.testimonials {
  color: #f4f4f4;
  background-color: rgb(133, 9, 9);
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.testimonials .testimonial-item {
  max-width: 18rem;
}

.testimonials .testimonial-item img {
  max-width: 12rem;
  box-shadow: 0px 5px 5px 0px #adb5bd;
}

.call-to-action {
  position: relative;
  background-color: #333;
  padding-top: 4rem;
  padding-bottom: 4rem;
}

footer.footer {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #111;
  color: rgba(169, 1, 1, 0.8); 
}

footer.footer a {
  color: rgba(169, 1, 1, 0.8); 
}

@media (max-width: 640px) {

  .navbar.navbar-dark {
    background: rgba(118, 0, 0, 0.8);
    height: 40px;
  }

  .navbar.navbar-dark .btn.btn-secondary {
    font-size: 0.75em;
    padding-top: 3px;
    padding-bottom: 3px;
  }

  header.masthead {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .title {
    margin-top: 0 !important;
    align-items: center;
  }
  .title h1.display-1{
    font-size: 4em !important;
  }

  p.subtitle {
    font-size: 1.2em;
    position: relative;
    margin-bottom: 20px !important;
    top: 0;
    left: 0;
  }

  .jumbo {
    margin-right: 0;
  }
}

</style>


