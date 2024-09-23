<template>
  <div class="faq">
    <div v-for="(item, index) in faqList" :key="index" class="faq-box">
      <div class="faq-cell" @click="showExpand(index, item.isExpand)">
        <span class="number">{{ index + 1 }}.</span>
        {{ item.title }}
        <van-icon class="icon" name="arrow-down" />
      </div>
      <div class="faq-detail" :class="{ 'is-hide': !item.isExpand }">
        <div v-html="item.content" class="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from 'vant'

export default defineComponent({
  components: {
    VanIcon: Icon
  },
  setup() {
    const faqList = ref([
      {
        title: 'How to open a MojoMojo box?',
        content:
          'Start your unboxing journey: <br/> •	Register your phone number +63)  to unlock the feature. <br /> • Choose a MojoBox you like and pay the price to unbox it!  <br /> •	Don’t like the item? Sell it back! Select the items you want to sell back from your inventory and earn MojoPoints equivalent to 70% of the box’s value. <br /> • Like the item? Checkout the item! Go to your inventory, choose at least 2 items, and click confirm shipment. Remember to input your shipping information, pay the shipping/transaction fee, and wait for delivery. ',
        isExpand: false
      },
      {
        title: 'Do you accept cash on delivery (COD)?',
        content:
          'Unfortunately, we do not offer cash on delivery as a payment method at the moment. Our currently accepted payment options include: <em style="font-weight: bold;">GCash, GrabPay, Paymaya, and Direct Debit via BPI or Unionbank.</em>',
        isExpand: false
      },
      {
        title:
          'Why is MojoMojo asking for my GCASH authentication code during checkout?',
        content:
          'This step in your payment is not monitored by MojoMojo, as you will be redirected to GCASH payment gateway (or your chosen online payment method). If you choose GCASH as your payment method, you will be asked to login to GCASH to pay. In order to validate and verify your purchase on MojoMojo, GCASH will send an authentication code to your number!',
        isExpand: false
      },
      {
        title: 'How do I view the products I have unboxed?',
        content:
          'To view all the products you’ve unboxed, click the “Inventory” tab located at the lower right side of your MojoMojo App. Products are automatically added to your account’s inventory every time you open a MojoBox and you can view all the items you’ve won. You can also check out two or multiple products all at once at this tab anytime you wish!  ',
        isExpand: false
      },
      {
        title: 'What if I don’t like the items I unboxed? ',
        content:
          'You can sell it back to us and earn MojoPoints equivalent to 70% of the box’s value which will be added to your MojoMojo account. You can use these points to buy items from our MojoMall or you can use it as a full or partial discount to open another MojoBox! ',
        isExpand: false
      },
      {
        title: 'Can I withdraw my MojoPoints as cash?',
        content:
          'Unfortunately, you cannot withdraw the MojoPoints earned in-app. However, you can use this to get a full or partial discount on MojoBoxes or exchange them for items from the Mall tab! ',
        isExpand: false
      },
      {
        title: 'How to check out the items I unboxed? ',
        content:
          'After opening MojoBoxes, you can go to inventory, choose the items for checkout and click confirm shipment. Remember to input your shipping information, pay the shipping/transaction fee, and wait for the delivery. Please note at least 2 items are needed to check out. ',
        isExpand: false
      },
      {
        title: 'How can I choose my shoe or cloth size?  ',
        content:
          'Kindly leave us a message regarding your size before checking out through our customer service live chat by clicking the “Contact Us” button located below. ',
        isExpand: false
      },
      {
        title: 'Do I have to pay for the shipping fee? ',
        content:
          'Yes. Shipping fee will vary depending on the item checked out and shipping address. Shipping fee and transaction fee will be shown to you before you check out. The shipping fee will not go beyond 200php in one transaction. However, due to handling limitations, we currently do not support shipping to Autonomous Region In Muslim Mindanao.',
        isExpand: false
      },
      {
        title:
          'After unboxing, do I have to pay for the original price of the items I received before checking out?',
        content:
          'No, the items you have unboxed are yours. If you want to check out the item, you only have to pay for the shipping and transaction fee. The shipping fee of your items to your location and transaction fee from your chosen payment method will be shown to you before checking out. ',
        isExpand: false
      },
      {
        title: "What's the status of my order? How do I track my deliveries?",
        content:
          'Go to My tab, click the "Shipped" button and you will be able to view your tracking number. Copy paste your tracking number to Parcel Monitor or Flash Express Track and Trace to check the status.',
        isExpand: false
      },
      {
        title:
          'Why are my items incomplete? Why are the items I checked out arriving separately?',
        content:
          'The items you have checked out may come from different collection points as we have multiple suppliers, hence they may arrive separately. The parcel may be delayed as well due to unforeseen events such as weather. Rest assured all the items you’ve checked out will be delivered. Should you have any concerns about your items, you may contact our customer service.',
        isExpand: false
      },
      {
        title: 'Do I get a reward for referring a friend?',
        content:
          'Yes, you will receive a free MojoBox once you invite a specific number of friends successfully registered to MojoMojo. Click the bee-in-a-box on the right of your screen and share your referral links to Facebook or Viber.',
        isExpand: false
      },
      {
        title: 'Where can I reach out if I have more concerns?',
        content:
          'For any concerns that need immediate attention, contact us through our app’s customer service live chat by clicking the “Contact Us” button located below. You may also contact us via our facebook page, @MojoMojoPH. ',
        isExpand: false
      }
    ])
    const showExpand = (index, isExpand) => {
      faqList.value[index].isExpand = !isExpand
    }

    onMounted(() => {
      ;(document as any).title = 'FAQs'
    })

    onBeforeUnmount(() => {
      ;(document as any).title = 'MojoMojo'
    })
    return {
      faqList,
      showExpand
    }
  }
})
</script>

<style lang="less" scoped>
.faq {
  color: #333;
  .faq-box {
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    .faq-cell {
      display: flex;
      align-items: center;
      min-height: 50px;
      font-size: 16px;
      padding: 10px 0;
      color: #333;
      .icon {
        margin-left: auto;
      }
      .number {
        margin-right: 10px;
      }
    }
    .faq-detail {
      overflow: hidden;
      max-height: 1000px;
      transition: all 1s ease-in;
      .content {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        padding: 15px;
        margin-bottom: 15px;
        color: #666;
        background-color: #f7f7f7;
      }
      &.is-hide {
        max-height: 0;
        transition: all 1s ease-in;
      }
    }
  }
}
</style>
