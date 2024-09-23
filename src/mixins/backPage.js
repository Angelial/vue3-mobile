import { useRoute, useRouter } from 'vue-router'

export default function () {
  const router = useRouter()
  const route = useRoute()

  const type = route.query.type
  const onBack = () => {
    router.back()
  }

  return {
    type,
    onBack
  }
}
