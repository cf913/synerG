<template>
  <div>
  <app-header></app-header>
  <div class="terms">
    <div class="container">
      <div>
        <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, SynerG accessible at https://b1g-synerg.herokuapp.com/.</p>
        <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you  disagree with any of these Website Standard Terms and Conditions.</p>
      </div>
      <div>
        <h5 class="title">Intellectual Property Rights</h5>
        <p>Other than the content you own, under these Terms, SynerG and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
        <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
      </div>
      <div>
        <h5 class="title">Restrictions</h5>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>using this Website in any way that is or may be damaging to this Website;</li>
          <li>using this Website in any way that impacts user access to this Website;</li>
          <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
          <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
        </ul>
        <p>Certain areas of this Website are restricted from being access by you and SynerG may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
      </div>
      <div>
        <h5 class="title">Your Content</h5>
        <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant SynerG a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
        <p>Your Content must be your own and must not be invading any third-party’s rights. SynerG reserves the right to remove any of Your Content from this Website at any time without notice.</p>
      </div>
      <div>
        <h5 class="title">User Comments</h5>
        <p>Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments') in areas of the website. SynerG does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of SynerG, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws SynerG shall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
        <p>SynerG reserves the right to monitor all Comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.</p>
        <p>You warrant and represent that:</p>
        <ul>
          <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
          <li>The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary right of any third party;</li>
          <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy;</li>
          <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
        </ul>
        <p>You hereby grant to SynerG a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
      </div>
      <div>
        <h5 class="title">Reservation of Rights</h5>
        <p>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p>
      </div>
      <div>
        <h5 class="title">Removal of links from our website</h5>
        <p>If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.</p>
        <p>Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.</p>
      </div>
      <div>
        <h5 class="title">No warranties</h5>
        <p>This Website is provided "as is," with all faults, and SynerG express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>
      </div>
      <div>
        <h5 class="title">Limitation of liability</h5>
        <p>In no event shall SynerG, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  SynerG, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
      </div>
      <div>
        <h5 class="title">Indemnification</h5>
        <p>You hereby indemnify to the fullest extent SynerG from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
      </div>
      <div>
        <h5 class="title">Severability</h5>
        <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
      </div>
      <div>
        <h5 class="title">Variation of Terms</h5>
        <p>SynerG is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
      </div>
      <p>These terms and conditions have been generated using termsandconditionssample.com and termsandconditionstemplate.com</p>
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
  div#app div.terms {
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