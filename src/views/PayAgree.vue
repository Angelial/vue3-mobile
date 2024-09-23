<template>
  <nav-bar
    v-if="type === 'h5'"
    left-text="Payment Agreement"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onBack"
  />
  <div class="privacy">
    <h3 class="title">Payment Service Agreement</h3>
    <p class="bold">I. Service description</p>
    <p class="content">
      Users who pay for purchases on the MojoMojo platform shall comply with
      these rules. The user starts to use and/or continues to use the service,
      that is, the user agrees to or has accepted all the contents of these
      rules. Thereafter, the user shall not raise any form of defense for not
      reading/not agreeing to the content of these rules or similar reasons.
    </p>
    <p class="bold">II. Payment</p>
    <p class="content">
      1、You must provide us and keep us up to date with accurate contact and
      payment information, including name, shipping address, All such personal
      information is subject to the Privacy Policy. You are responsible for any
      fees or charges your issuing bank or credit card provider may charge you.
      If your payment to us is returned for any reason, we may bill your account
      again directly and seek payment by another method. Any account changes
      made after the processing cut off date should not be expected to reflect
      on the subscription until the following shipping period. Our shipping
      service does not include the forwarding with your mail to an updated
      address. Any forwarding fees incurred will not be reimbursed or credited
      to your subscription.
    </p>
    <p class="content">
      2、Unless otherwise specified in this agreement, The virtual MojoMojo
      points cannot be exchanged back to Pesos, please check carefully and
      confirm your consumption needs before making payment.
    </p>
    <p class="content">
      3、If failed to sold your items, the amount will be credit back to your
      account balance.
    </p>
    <p class="content">
      4. Correct order information: When you submit an order for purchase/ or
      shipping, please carefully confirm the name, price, quantity, size and
      color of the items ordered (some goods involve model, specification, size
      and color but do not indicate the specification information and provide a
      choice, or are marked as "random", they will be delivered randomly by
      Mojo). If the recipient is not you, the act and intention of the recipient
      will be regarded as your act and intention. and your submission of the
      order means that you are responsible for the accuracy of the goods
      shipping information in your order. If you provided the wrong information
      such as the recipient’s name, contact phone number and address. causing
      delayed delivery, failure to deliver, the facial loss caused shall be
      borne by you.
    </p>
    <p class="content">
      5. By using this APP, you agree that you are at least 18 years of age or
      are visiting the APp under the supervision of an adult or guardian and
      that you possess the authority to enter into a binding legal agreement.
    </p>
    <p class="bold">III. After-sales service</p>
    <p class="content">
      1. We want you to love every MojoMojo items purchase you make, but,
      occasionally, a product may not meet your expectations. We do not accept
      returns or exchanges. We do not issue refunds. However, your feedback on
      the products you received, whether you liked them or loathed them, is
      greatly appreciated. You may contact us with these comments or concerns by
      using our contact page.
    </p>
    <p class="content">
      2. due to lighting, equipment, monitor resolution and other factors, the
      items may has color differences from picture. subject to the real thing;
      original factory defects (see product details page rule notes) violent
      express, non-controllable objective factors (weather, accidents, etc.) are
      not part of the scope of the sale.
    </p>
    <p class="content">
      3. If the items/ package you received is broken, please refuse to sign,
      missing items, broken, wrong sent or other quality problems, please
      contact our cs in 7 days, and please also provide a proof.
    </p>
    <p class="content">
      4. After-sales scope: missing items / broken / serious defects and other
      non-human damage; proof requirements: photos / videos or other evidence to
      prove the problem.
    </p>
    <p class="bold">IV. Account Balance Purchase</p>
    <p class="content">
      1、Users can use their account Mojo points to purchase the items and
      services provided in the "MojoMojo Box" App, which are provided by Mojo
      Code Technology Inc.
    </p>
    <p class="content">
      2、After users use their account balance to purchase items and services,
      if there are any quality problems, they will be executed in accordance
      with the relevant regulations announced by Mojo Code Technology Inc. or
      resolved by MojoMojo Box in consultation with the users.
    </p>
    <p class="bold">V. Account Balance Management</p>
    <p class="content">
      If the user has installed the "MojoMojo Box" application but does not use
      it normally or uses hacking methods to attack the MojoMojo Box server and
      other improper means to obtain the account balance, MojoMojo Box will
      consider the user as cheating. MojoMo Box considers the user's cheating
      behavior and has the right to cancel the user's qualification and delete
      all the user's account balance, and reserves the right to pursue legal
      responsibility for hacking actions such as attacking MojoMojo servers.
    </p>
    <p class="content">
      Miscellaneous: You warrant and represent to Us that you have all necessary
      rights, power, and authority to agree to these Terms and perform your
      obligations hereunder, and nothing contained in this Agreement or in the
      performance of such obligations will place you in breach of any other
      contract or obligation. The failure of either party to exercise in any
      respect any right provided for herein will not be deemed a waiver of any
      further rights hereunder. If any provision of this Agreement is found to
      be unenforceable or invalid, that provision will be limited or eliminated
      to the minimum extent necessary so that this Agreement will otherwise
      remain in full force and effect and enforceable. Any new features,
      changes, updates or improvements of the Program shall be subject to this
      Agreement unless explicitly stated otherwise in writing. We reserve the
      right to change this Agreement from time to time. Any updates to this
      Agreement shall be communicated to you. You acknowledge your
      responsibility to review this Agreement from time to time and to be aware
      of any such changes. By continuing to participate in the Program after any
      such changes, you accept this Agreement, as modified.
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
