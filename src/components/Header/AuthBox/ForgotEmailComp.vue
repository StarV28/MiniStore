<template>
  <form @submit.prevent="onSubmit" class="forgot" v-show="!isCodeForEnter">
    <label class="forgot__label-email">
      {{ $t('menu.signIn.fagotEmail') }}
      <Field type="email" name="emailSab" placeholder="E-mail" />
      <ErrorMessage name="emailSab" class="error" />
    </label>
    <button type="submit" class="forgot__send-email" :disabled="!meta.valid">
      {{ $t('menu.signIn.fagotBtn') }}
    </button>
  </form>
  <div v-show="isCodeForEnter">
    <code-enter-comp @close-email-forgot="isCodeForEnter = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { emailSchema } from '@/validate/emailSend'
import { useUserStore } from '@/stores/userStore'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import CodeEnterComp from './CodeEnterComp.vue'

//========================================================================================================================================================
const userStore = useUserStore()
const isCodeForEnter = ref(false)

//========================================================================================================================================================
const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: emailSchema,
})

//========================================================================================================================================================
//========================================================================================================================================================
const onSubmit = handleSubmit(async (values) => {
  try {
    const token = ref(null)
    const result = await userStore.submitPasswordRecovery('user/forgot', values)
    if (result) {
      token.value = result.tokenCode
      localStorage.setItem('token', token.value)
      isCodeForEnter.value = true
      resetForm()
    } else {
      alert("This email wasn't found")
      resetForm()
    }
  } catch (error) {
    console.error('Email is not found', error)
  }
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
