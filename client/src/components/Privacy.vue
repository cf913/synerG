<template>
  <div>
    <app-header></app-header>
    <div class="privacy">
      <div class="container">
        <div>
          <p>This privacy policy sets out how SynerG uses and protects any information that you give SynerG when you use this website.</p>
          <p>SynerG may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 15th May 2018.</p>
        </div>
        <div>
          <h5 class="title">What We Collect</h5>
          <p>Data is gathered from public sources such as Steam WebAPI and Steam community profiles upon registration. Users may submit posts and images on their profile and send messages between other users; this is stored on SynerG servers.</p>
        </div>
        <div>
          <h5 class="title">What We Do With the Data</h5>
          <p>We use information collected from Steam to offer users a more personalised experience and also share user information with other users of SynerG. User uploaded content such as posts and image uploads may be shared with other users, however with the users permission (friends of the user).</p>
        </div>
        <div>
          <h5 class="title">How We Share The Information</h5>
          <p>Aside from features within the website where friends of the users may have access to user uploaded content, we do not share any user information with any third-parties.</p>
        </div>
        <div>
          <h5 class="title">Security</h5>
          <p>We are committed to ensuring that your information is secure. However, we cannot ensure that information stored on our servers is safe from intrusion.</p>
        </div>
        <div>
          <h5 class="title">Cookies</h5>
          <p>We do not use cookies for tracking purposes.</p>
        </div>
        <div>
          <h5 class="title">Links to Other Websites</h5>
          <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style scoped>
  div#app div.privacy {
    height: 100vh;
    text-align: left;
    background-color: rgba(35, 39, 44, 1);
    color: #f4f4f4;
    font-size: 14px;
    font-weight: 400;
    padding: 60px 0;
  }

  .title {
    font-weight: 600;
    color: #DAA520;
  }
</style>