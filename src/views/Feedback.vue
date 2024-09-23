<template>
  <div class="feedback">
    <van-form @submit="onSubmit">
      <cell-group :inset="true">
        <field
          v-model="txt"
          rows="4"
          name="txt"
          autosize
          required
          type="textarea"
          placeholder="Please let us know how we can do better."
        />
        <field
          v-model="linkPhone"
          name="linkPhone"
          maxlength="10"
          label="Contact Info"
          placeholder="Please provide your registered number."
        >
        </field>
        <field
          v-model="linkName"
          name="linkName"
          label="name"
          placeholder="Please provide your name."
        >
        </field>
      </cell-group>
      <div style="margin: 16px">
        <van-button
          class="my-button"
          round
          block
          type="primary"
          native-type="submit"
        >
          submit
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { sendFeedback } from '@/api/genericApi'

import { defineComponent, reactive, toRefs } from 'vue'
import { Field, CellGroup, Form, Button, Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
interface DataProps {
  txt: string
  linkName: string
  linkPhone: string
}
export default defineComponent({
  components: {
    Field,
    CellGroup,
    VanForm: Form,
    VanButton: Button
  },
  setup() {
    const data: DataProps = reactive({
      txt: '',
      linkName: '',
      linkPhone: ''
    })
    const refData = toRefs(data)
    const route: any = useRoute()
    const router: any = useRouter()
    const userId = route.query?.userId
    const type = route.query?.type
    const onSubmit = async (values) => {
      if (!values.txt) {
        Toast('Please let us know how we can do better.')
        return
      }
      if (!values.linkPhone) {
        Toast('Please provide your registered number.')
        return
      }
      if (!/^9\d{9}$/.test(values.linkPhone)) {
        Toast('Please fill in the correct mobile number.')
        return
      }
      if (!values.linkName) {
        Toast('Please provide your name.')
        return
      }
      const response: any = await sendFeedback({
        ...values,
        userId,
        type: Number(type)
      })
      if (response.code === 0) {
        Toast('Submitted successfully!')
        router.go(-1)
      }
    }
    return {
      ...refData,
      data,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.feedback {
  height: 100vh;
  padding-top: 20px;
  background: #f7f7f7;
}
.my-button {
  height: 48px;
  background: #000000;
  border-radius: 24px;
  border: none;
}
</style>
