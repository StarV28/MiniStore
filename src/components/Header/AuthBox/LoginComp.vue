<template>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <v-card max-width="400" class="card">
        <img class="card__image" src="/images/insta-block-3.jpeg" alt="" />
        <p class="card__closes" @click="dialog = false">X</p>
        <div class="card__title" v-show="!forgotPass">
          <h1>{{ $t('menu.signIn.title') }}</h1>
          <p>{{ $t('menu.signIn.text') }}</p>
        </div>
        <form
          @submit.prevent="submitLogin"
          class="card__form form"
          v-show="!forgotPass"
          @close-forget-all="forgotPass = false"
        >
          <div class="form__item">
            <label for="email">{{ $t('menu.signIn.labelEmail') }}</label>
            <Field
              class="form__input"
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" class="error" />
          </div>
          <div class="form__item">
            <label for="password">{{ $t('menu.signIn.labelPassword') }}</label>
            <Field
              class="form__input"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" class="error" />
            <icons-comp
              name="eye"
              size="18"
              color="rgb(58, 58, 58)"
              class="form__eys"
              @click="togglePasswordVisibility"
              v-if="showPassword"
            />
            <icons-comp
              name="closed-eye"
              size="18"
              color="gray"
              class="form__eys"
              @click="togglePasswordVisibility"
              v-if="!showPassword"
            />
          </div>
          <div class="form__forgot-pass">
            <button type="button" class="form__forgot-btn" @click="onForgotPass">
              <span>{{ $t('menu.signIn.fagot') }}</span>
            </button>
          </div>
          <button class="form__btn" type="submit" :disabled="!meta.valid">
            {{ $t('menu.signIn.title') }}
          </button>
        </form>
        <div v-show="forgotPass" class="card__forgot" @close-forgot="forgotPass = false">
          <forgot-email-comp />
        </div>
        <!-- <div class="card__social">
          <p>Or sign in with</p>
          <div class="card__social-icons">
            <icons-comp name="Google" size="18" color="72aec8" />
            <icons-comp name="fb" size="18" color="72aec8" />
          </div>
        </div> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { loginSchema } from '@/validate/loginValid'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import ForgotEmailComp from './ForgotEmailComp.vue'

//========================================================================================================================================================
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const dialog = computed({
  get: () => authStore.dialog,
  set: (val) => (authStore.dialog = val),
})

//======Show Password==================================================================================================================================================

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

//=====Valid Form===================================================================================================================================================

const {
  handleSubmit: handleSubmitLogin,
  resetForm,
  meta,
} = useForm({
  validationSchema: loginSchema,
})
//========================================================================================================================================================
const forgotPass = ref(false)
const onForgotPass = () => {
  forgotPass.value = !forgotPass.value
}
//=====Authorization===================================================================================================================================================

const submitLogin = handleSubmitLogin(async (values) => {
  try {
    await authStore.login(values)

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('Incorrect email or password')
      return
    }

    await cartStore.initCart()

    dialog.value = false

    const redirectTo = localStorage.getItem('redirectTo') || '/'
    localStorage.removeItem('redirectTo')
    router.push(redirectTo)

    resetForm()
  } catch (error) {
    console.error('Login error:', error)
  }
})
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  max-width: 400px;
  margin: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.897);
    z-index: 2;
  }
  .card__closes {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 700;
    color: #000;
  }
  .card__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }
  .card__title {
    position: relative;
    z-index: 5;
    text-align: center;
    margin-bottom: 20px;
    h1 {
      font-size: 30px;
      font-weight: 400;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;
      color: #666;
    }
  }
}
.card__forgot {
  position: relative;
  z-index: 5;
  max-width: 400px;
}
.form {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-bottom: 1px solid rgb(217, 217, 217);
  margin-bottom: 20px;
}
.form__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  label {
    font-size: 16px;
    font-family: 'Lato';
    font-weight: 400;
    line-height: 1.4;
    color: rgb(58, 58, 58);
  }
}
.form__input {
  padding: 20px;
  border: 1px solid rgb(217, 217, 217);
  font-size: 16px;
  font-family: 'Lato';
  font-weight: 400;
  line-height: 1.4;
  color: rgb(58, 58, 58);
}
.form__eys {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 10px;
  cursor: pointer;
}
.form__btn {
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
    background-color: rgba(128, 128, 128, 0.377);
    transform: scale(1);
    box-shadow: 0 0 0 0;
  }
}
.form__link {
  text-align: left;
  margin-bottom: 20px;
  p {
    font-size: 14px;
    font-family: 'Lato';
    font-weight: 400;
    line-height: 1.4;
    color: rgb(58, 58, 58);
    span {
      cursor: pointer;
      color: rgb(114, 174, 200);
      text-decoration: none;
      font-weight: 700;
    }
  }
}
.card__social {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  p {
    font-size: 14px;
    font-family: 'Lato';
    font-weight: 400;
    line-height: 1.4;
    color: rgb(58, 58, 58);
  }
}
.card__social-icons {
  display: flex;
  gap: 20px;
  svg {
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}
.error {
  font-size: 14px;
  font-style: italic;
  line-height: 1.5;
  color: red;
}
.v-overlay--scroll-blocked {
  background-color: rgba(114, 174, 200, 0.705);
}
.form__forgot-pass {
  position: relative;
  z-index: 5;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
.form__forgot-btn {
  span {
    font-size: 14px;
    font-family: 'Lato';
    font-weight: 700;
    line-height: 1.4;
    color: #72aec8;
  }
}
</style>
