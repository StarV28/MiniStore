<template>
  <div>
    <main-page>
      <div class="page">
        <div class="page__title">
          <h1>{{ $t('namePage.user') }}</h1>
        </div>
        <div class="container">
          <div class="page__user user">
            <form @submit.prevent="onSubmit" class="user__form">
              <div class="user__item">
                <div class="item__name title">
                  <label>{{ $t('user.nickname') }}:</label>
                  <Field
                    type="text"
                    v-model="user.nickname"
                    :disabled="disabled"
                    class="input"
                    name="nickname"
                  />
                </div>
                <div class="item__all">
                  <icons-comp
                    name="edit"
                    size="18"
                    class="edit"
                    @click="changeTypeEdit"
                    color="red"
                  />
                  <ErrorMessage name="nickname" class="error" />
                </div>
              </div>
              <div class="user__item">
                <div class="item__name email">
                  <label>{{ $t('user.email') }}:</label>
                  <Field
                    type="text"
                    v-model="user.email"
                    :disabled="disabled"
                    class="input"
                    name="email"
                  />
                </div>
                <div class="item__all">
                  <icons-comp
                    name="edit"
                    size="18"
                    class="edit"
                    @click="changeTypeEdit"
                    color="red"
                  />
                  <ErrorMessage name="email" class="error" />
                </div>
              </div>
              <div class="user__item">
                <div class="item__name pass">
                  <label>Password:</label>
                  <!-- <label>{{ $t('user.email') }}:</label> -->
                  <Field type="text" :disabled="disabled" class="input" name="password" />
                </div>
                <div class="item__all">
                  <icons-comp
                    name="edit"
                    size="18"
                    class="edit"
                    @click="changeTypeEdit"
                    color="red"
                  />
                  <ErrorMessage name="email" class="error" />
                </div>
              </div>
              <p>
                ID: <span>{{ user.id }}</span>
              </p>
              <div class="user__buttons">
                <button @click="onLogout" class="user__btn">
                  <span>{{ $t('user.btnLogout') }}</span>
                </button>
                <button type="submit" class="user__btn">
                  <span>{{ $t('user.btnEdit') }}</span>
                </button>
              </div>
              <button @click="onDelete(user.id)" class="user__btn-delete">
                {{ $t('user.btnDelete') }} <span>{{ user.nickname }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main-page>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { userSchema } from '../validate/userValid'
import { useCartStore } from '@/stores/cartStore'
//========================================================================================================================================================
const error = ref(null)
const userStore = useUserStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const route = useRoute()
const userID = route.params.id
const user = ref({ nickname: '', email: '' })
//=========get USER===============================================================================================================================================

const userFunc = async () => {
  try {
    const response = await userStore.getByIdItem('user', userID)
    user.value = response.data
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || 'Error Rating'
  }
}

//=======change Edit user=================================================================================================================================================
const disabled = ref(true)
const changeTypeEdit = () => {
  disabled.value = !disabled.value
}
//======send edit user data==================================================================================================================================================
const { handleSubmit, resetForm } = useForm({
  validationSchema: userSchema,
  initialValues: {
    nickname: '',
    email: '',
  },
})

//==========Logout==============================================================================================================================================
const onLogout = () => {
  router.push({ name: 'home' })
  authStore.logout()
  cartStore.initCart()
}
//==========Edit user==============================================================================================================================================

const onSubmit = handleSubmit(async (value) => {
  try {
    const response = await userStore.updateById('user', {
      id: user.value.id,
      ...value,
    })
    if (response) {
      resetForm()
      disabled.value = true
      alert('Password changed successfully')
      userFunc()
    } else {
      resetForm()
      userFunc()
      alert("Don't right correct ")
    }
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || "Didn't edit to user"
  }
})
//========================================================================================================================================================
async function onDelete(id) {
  try {
    await userStore.deleteByID('user', id)
    onLogout()
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Error while deleting:', error)
  }
}

//========================================================================================================================================================

onMounted(() => {
  userFunc()
})
</script>

<style lang="scss" scoped>
.page__title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 77px 0 109px 0;
  background-color: rgb(237, 241, 243);
  &:not(:last-child) {
    margin-bottom: 120px;
  }

  h1 {
    font-weight: 300;
    font-size: 83px;
    line-height: 1.14;
    letter-spacing: 2%;
  }
}

.user__form {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
  p {
    font-family: 'Lato';
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgb(39, 39, 39);
    display: flex;
    align-items: center;
    gap: 15px;
    span {
      font-size: 21px;
      font-weight: 500;
      line-height: 1.4;
      color: #72aec8b4;
    }
  }
}
.edit {
  cursor: pointer;
}

.user__item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.item__name {
  display: flex;
  align-items: center;
  gap: 15px;

  label {
    font-family: 'Lato';
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: rgb(39, 39, 39);
  }
  input {
    font-size: 21px;
    font-weight: 500;
    line-height: 1.4;
    color: red;
  }
}
.title {
  input {
    font-size: 34px;
    font-weight: 900;
  }
}

@media (max-width: 768px) {
  .page__title {
    padding: 35px 0 55px 0;
    &:not(:last-child) {
      margin-bottom: 60px;
    }
    h1 {
      font-size: 53px;
    }
  }
  .title {
    input {
      font-size: 21px;
      font-weight: 900;
    }
  }
}
.input:focus {
  padding: 0;
  border: none;
}
.input:disabled {
  color: #72aec8b4;
}
.user__buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.user__btn {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 35px;
  background-color: rgb(39, 39, 39);
  opacity: 1;
  text-decoration: none;
  transition: all 0.3s ease;

  span {
    text-transform: uppercase;
    font-family: 'Lato';
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 10%;
    color: #ffffff;
  }
  &:hover {
    transition: all 0.3s ease;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.594);
    background-color: rgba(39, 39, 39, 0.649);
  }
}
.user__btn-delete {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 35px;
  background-color: rgb(148, 24, 24);
  opacity: 1;
  text-decoration: none;
  transition: all 0.3s ease;

  &,
  span {
    text-transform: uppercase;
    font-family: 'Lato';
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 10%;
    color: #ffffff;
  }
  &:hover {
    transition: all 0.3s ease;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.594);
    background-color: rgb(246, 3, 3);
  }
}
</style>
