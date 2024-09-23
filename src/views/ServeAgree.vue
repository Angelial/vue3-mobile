<template>
  <nav-bar
    v-if="type === 'h5'"
    left-text="Terms of Service"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onBack"
  />
  <div class="privacy">
    <h3 class="title">Services Agreement</h3>
    <p class="content">
      When you use, access, download, browse or register to the MojoMojo service
      on the MojoMojo website, the MojoMojo mobile application (“MojoMojo
      Application”), or other related digital medium or media including social
      media (“MojoMojo Facility”), you signify that you have read, understood,
      and accepted these Terms of Service and agree to be bound by them, them,
      including all related rules and regulations for the use and availment of
      any service, product or information of the MojoMojo Facility. You also
      agree to be bound by any and all laws, rules, regulations and governmental
      issuances applicable to the MojoMojo Facility or the Company (as
      hereinafter defined below), as well as such other terms and conditions
      governing the use of other facilities, benefits, products or services
      which we may make available to you in connection with the MojoMojo
      service, or referral programs as may be offered in the future. You may be
      required to register an account (“MojoMojo Account”) to use the MojoMojo
      service. If you access the MojoMojo service via any MojoMojo Facility,
      these Terms of Service shall be a binding agreement between you and
      MojoMojo Crop. (“Company”). If you do not agree, do not fully understand
      or have reservations with respect to any provision of these Terms of
      Service, please exit and stop your use of this MojoMojo Facility.
    </p>
    <p class="content">
      These Terms together with any other additional rules, terms and conditions
      that appear on the website (and associated sites) or that specifically
      relate to and govern any particular event, game, Software or tournament,
      constitute a legally binding agreement between you and MojoMojo.
    </p>
    <p class="bold">Services</p>
    <p class="content">
      All Services available on the APP are subject to these Terms. Services are
      available to you pursuant to your compliance with our Terms, Policies, and
      applicable laws. We reserve the right to add, remove, or change the
      available services at any time and without notice. MojoMojo is not liable
      for any modification, suspension, or discontinuance of Services. We may,
      at our own discretion, limit the number of available Services or refuse to
      provide the Service without the need to deliberate on the reasons for such
      action. We may establish limits concerning use of the Service and the
      frequency with which you may access the Service. Access to our Services
      may involve third party costs and expenses. You agree that you are solely
      responsible for covering all such fees and expenses necessary for
      accessing our Services.
    </p>
    <p class="bold">MojoMojo Boxes</p>
    <p class="content">
      Purchase of MojoMojo Itemes/ Box is possible through Mojo points added on
      the User’s account. Users may topup money to their account through the app
      and such deposit is non-refundable. MojoMojo Box contain multiple items
      generated with different percent chance. You may only obtain one item from
      one box. The item is generated in the moment of opening a MojoMojo Box
      opening the MojoMojo Box you accept the item that it generates. actual
      value of the generated item may be different from the value you paid for
      the MojoMojo Box and by purchasing the MojoMojo Box you accept such
      possibility and forfeit any claim or additional compensation for such
      difference in value. items will be sent upon request to the shipping
      address provided by the User. For more information about shipping please
      see our Shipping Policy.
    </p>
    <p class="bold">Privacy Policy Document</p>
    <p class="content">
      When using our APP we may collect some information about you, your device
      or about how you are using our App. For easier understanding we placed all
      information about data collection in separate document called Privacy
      Policy, which is available on the official site and app. Please review our
      Privacy Policy in its entirety to get a clear picture on how we collect,
      store, use and remove any data which we may collect from you.
    </p>
    <p class="bold">Registering On The Site</p>
    <p class="content">
      Some Services require you to register on the App in order to use them. The
      Services are only for personal use. You are not allowed to use our
      Services in someone else’s name or in their account. You may only register
      one account under your name. When registering on the App you are
      responsible for providing information that is true, accurate, and
      complete, since otherwise we may not be able to provide you with the
      Service. If any information is changed after your registration, it is up
      to you to update it, so we may continue providing you with the Service.
      Your data – your responsibility: we are not responsible for any issues
      which might arise in connection with untrue or inaccurate information or
      information which is not complete. You understand that it is your
      responsibility to keep your log in information confidential. You are
      responsible for all activity under your account. If you ever find out or
      suspect that someone accessed your account without authorization, you are
      advised to inform us immediately.
    </p>
    <p class="bold">Rule of Conduct</p>
    <p class="content">
      During your use of our Services, you will not behave contrary to the
      Terms, Policies, applicable laws and regulations, and you will especially
      not, without limitation, do anything of the following:
    </p>
    <p class="content">
      • send or otherwise post unauthorized commercial communications (such as
      spam) through the App;
    </p>
    <p class="content">
      • collect users' content or information, or otherwise access the App,
      using automated means (such as harvesting bots, robots, spiders, or
      scrapers) without our permission;
    </p>
    <p class="content">
      • solicit login information or access an account belonging to someone
      else;
    </p>
    <p class="content">• bully, intimidate, or harass any other User;</p>
    <p class="content">
      • provide any false personal information on the App, or create an account
      for anyone other than yourself without permission;
    </p>
    <p class="content">
      • post or transmit content which is illegal, hateful, obscene,
      threatening, incites violence, insulting, defamatory, infringing of
      intellectual property rights, invasive of privacy, or contains graphic or
      gratuitous violence or is otherwise objectionable to third parties;
    </p>
    <p class="content">
      • take any action creating a disproportionately large usage load on the
      Site unless expressly permitted by us;
    </p>
    <p class="bold">Termination And Access Restriction</p>
    <p class="content">
      We may limit or completely cancel your access to the App and Services if
      you are not complying with our Terms. We can, in our sole discretion,
      suspend or or terminate access to all or parts of the Site and Services to
      anyone, without prior notice or need to deliberate on reasons for such
      measure. We reserve the right to deny Services to anyone at any time.
    </p>
    <p class="bold">Governing Laws</p>
    <p class="content">
      This Agreement shall be governed by and construed under the laws of the
      Philippines, without regard to its conflict of law provisions.
    </p>
    <p>Final Provisions</p>
    <p class="content">
      If any part of these Terms is found to be invalid, illegal or
      unenforceable in any respect, it will not affect the validity or
      enforceability of the remainder of the Terms. The section titles in the
      Terms are for convenience only and have no legal or contractual effect.
      Any failure to exercise or enforce any right or the provision of this
      agreement shall not constitute a waiver of such right or provision.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { NavBar } from 'vant'
import useBack from '@/mixins/backPage'
const { type, onBack } = useBack()
</script>

<style lang="less" scoped>
.privacy {
  padding: 15px;
  .right {
    text-align: right;
  }
  .title {
    font-size: 20px;
    color: #333;
    text-align: center;
    line-height: 40px;
    padding: 10px;
  }
  .content {
    text-indent: 25px;
  }
  .content em {
    font-style: normal;
    text-decoration: underline;
  }
  .content b {
    color: #333;
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: #333;
    line-height: 24px;
    margin-bottom: 7px;
    word-break: break-all;
  }
}
</style>
