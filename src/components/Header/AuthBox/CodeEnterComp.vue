<template>
  <form @submit.prevent="SentCode" class="forgot">
    <p>{{ $t('menu.signIn.secondCode') }} {{ timer }} {{ $t('menu.signIn.second') }}</p>
    <label class="forgot__label-email">
      {{ $t('menu.signIn.code') }}
      <Field type="text" name="code" placeholder="Enter Code" />
      <ErrorMessage name="code" class="error" />
    </label>
    <button type="submit" class="forgot__send-email" :disabled="!meta.valid">
      {{ $t('menu.signIn.sendCode') }}
    </button>
  </form>
</template>

<script setup>
import { ref, defineEmits, onMounted, computed } from 'vue'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { codeSchema } from '../../../validate/codeSchema'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

//========================================================================================================================================================
const timer = ref(180)
let interval = null
const userStore = useUserStore()
const router = useRouter()
const authStore = useAuthStore()
const dialog = computed({
  get: () => authStore.dialog,
  set: (val) => (authStore.dialog = val),
})

const emit = defineEmits(['close-forgot', 'close-email-forgot', 'close-forget-all'])
//========================================================================================================================================================
//========================================================================================================================================================
const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: codeSchema,
})
//========================================================================================================================================================
const startTimer = () => {
  timer.value = 180

  interval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(interval)
      emit('close-email-forgot')
      emit('close-forgot')
    }
  }, 1000)
}
//========================================================================================================================================================
const SentCode = handleSubmit(async (values) => {
  try {
    const token = localStorage.getItem('token')
    if (!token || !values.code) {
      alert('Please enter the code and make sure you are authorized.')
      return
    }

    const data = {
      ...values,
      token: `Bearer ${token}`,
    }
    const result = await userStore.submitPasswordRecovery('user/enter', data)

    if (result) {
      localStorage.setItem('user', JSON.stringify(result))

      emit('close-email-forgot')
      dialog.value = false

      router.push({ name: 'user', params: { id: result.user.id } })
    } else {
      alert('The code is not correct')
    }
    emit('close-email-forgot')
    resetForm()
  } catch (error) {
    console.error('Email is not found', error)
  }
})
//========================================================================================================================================================
onMounted(() => {
  startTimer()
})
</script>

<style lang="scss" scoped>
.forgot {
  width: 100%;
  padding: 35px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.forgot__label-email {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: 'Lato';
  font-weight: 400;
  line-height: 1.4;
  input {
    width: 320px;
    padding: 20px;
    border: 1px solid rgb(217, 217, 217);
    font-size: 16px;
    font-family: 'Lato';
    font-weight: 400;
    line-height: 1.4;
    color: rgb(58, 58, 58);
  }
}
.forgot__send-email {
  padding: 16px 20px;
  background-color: rgb(39, 39, 39);
  color: #fff;
  font-size: 14px;
  font-family: 'Lato';
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.03);
    box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.7);
  }
  &:disabled {
    background-color: rgba(128, 128, 128, 0.384);
    &:hover {
      transform: scale(1);
      box-shadow: 0 0 0 0;
    }
  }
}
.error {
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
  color: red;
}
</style>
