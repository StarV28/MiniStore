<template>
  <div>
    <main-page>
      <div class="page__title">
        <h1>{{ $t('namePage.checkout') }}</h1>
      </div>
      <div class="page__container">
        <div class="page__checkout">
          <h2>{{ $t('checkout.titleOne') }}</h2>
          <form @submit.prevent="onSubmit" class="page__form form">
            <div class="form__all-inp">
              <div class="form__item">
                <label>{{ $t('checkout.name') }} *</label>
                <Field name="name" type="text" />
                <ErrorMessage name="name" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.last') }} *</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.company') }}</label>
                <Field name="company" type="text" />
                <ErrorMessage name="company" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.country') }} *</label>
                <Field name="country" type="text" />
                <ErrorMessage name="country" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.city') }} *</label>
                <Field name="city" type="text" />
                <ErrorMessage name="city" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.address') }} *</label>
                <Field name="address" type="text" />
                <ErrorMessage name="address" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.zip') }} *</label>
                <Field name="zip" type="text" />
                <ErrorMessage name="zip" class="error" />
              </div>
              <div class="form__item">
                <label>{{ $t('checkout.phone') }} *</label>
                <Field name="phone" type="text" />
                <ErrorMessage name="phone" class="error" />
              </div>
              <div class="form__item">
                <h2>{{ $t('checkout.titleTwo') }}</h2>
                <label>{{ $t('checkout.notes') }}</label>
                <Field
                  name="notes"
                  as="textarea"
                  placeholder="Notes about your order. Like special notes for delivery."
                />
                <ErrorMessage name="notes" class="error" />
              </div>
            </div>
            <total-price-comp />
            <div class="form__payment-method">
              <div class="form__radio-btn">
                <label>
                  {{ $t('checkout.bank') }}
                  <Field as="input" type="radio" name="paymentMethod" value="bank" />
                </label>
                <label
                  >{{ $t('checkout.check') }}
                  <Field as="input" type="radio" name="paymentMethod" value="check" />
                </label>
                <label>
                  {{ $t('checkout.cash') }}
                  <Field as="input" type="radio" name="paymentMethod" value="cash" />
                </label>
                <label>
                  PayPal
                  <Field as="input" type="radio" name="paymentMethod" value="paypal" />
                </label>
              </div>
              <button type="submit" class="form__submit-btn" :disabled="!meta.valid">
                {{ $t('checkout.btnOrder') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main-page>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { checkoutSchema } from '@/validate/checkout'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { sanitizeInput } from '../util/sanitizeFunc'
import { useCheckoutStore } from '@/stores/checkoutStore'
import TotalPriceComp from '../components/GlobalBox/TotalPriceComp.vue'
import { useCartStore } from '../stores/cartStore'
//========================================================================================================================================================
const user = JSON.parse(localStorage.getItem('user'))
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const router = useRouter()

const { handleSubmit, resetForm, setValues, meta } = useForm({
  validationSchema: checkoutSchema,
  initialValues: {
    name: '',
    lastName: '',
    company: '',
    country: '',
    city: '',
    address: '',
    zip: '',
    phone: '',
    notes: '',
    paymentMethod: 'bank',
  },
})
//========================================================================================================================================================
const onSubmit = handleSubmit(async (values) => {
  try {
    const sanitizedValues = {}
    for (const key in values) {
      const val = values[key]
      sanitizedValues[key] = typeof val === 'string' ? sanitizeInput(val) : val
    }
    if (user?.id) {
      sanitizedValues.user_id = user.id
    }
    await checkoutStore.create('checkout/data', sanitizedValues)
    resetForm()
    router.push({ name: 'shop' })
    alert('Your order has been accepted, please wait for the email about the shipment.')
    cartStore.clearCart(user.id)
  } catch (error) {
    console.error('Error submit data form ', error)
  }
})
//========================================================================================================================================================
async function checkUserData(id) {
  try {
    const response = await checkoutStore.getByIdItem('checkout', id)
    if (!response.data) return
    const raw = response.data
    if (!raw || (Array.isArray(raw) && raw.length === 0)) return
    const record = Array.isArray(raw) ? raw[0] : raw

    if (!record) return
    setValues({
      name: record.name || '',
      lastName: record.lastName || '',
      company: record.company || '',
      country: record.country || '',
      city: record.city || '',
      address: record.address || '',
      zip: record.zip || '',
      phone: record.phone || '',
      notes: record.notes || '',
      paymentMethod: record.paymentMethod || 'bank',
    })
  } catch (error) {
    console.error('Error find data User', error)
  }
}
//========================================================================================================================================================
onMounted(async () => {
  if (user) {
    await checkUserData(user.id)
  }
})
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-weight: 700;
  font-style: italic;
}
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
.page__checkout {
  display: flex;
  flex-direction: column;
  gap: 30px;

  h2 {
    font-size: 30px;
    font-weight: 400;
    line-height: 1.14;
  }
}
.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.form__all-inp {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-template-rows: auto;
  row-gap: 30px;
  column-gap: 20px;
}

.form__item {
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-family: 'Lato';
    font-weight: 300;
    font-size: 16px;
    line-height: 1.38;
  }
  input,
  textarea {
    padding: 20px;
    border: 1px solid rgb(217, 217, 217);
  }
}
.form__radio-btn {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
  &:not(:last-child) {
    margin-bottom: 30px;
  }

  label {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 15px;
    font-family: 'Lato';
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 1.4;
  }
}
.form__submit-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 50px;
  background-color: rgb(39, 39, 39);
  font-family: 'Lato';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #ffff;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.03);
    box-shadow: 2px 2px 5px black;
  }
  &:disabled {
    &:hover {
      transform: scale(1);
      box-shadow: 0 0 0;
    }
    background-color: rgba(126, 124, 124, 0.655);
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
  .page__checkout {
    gap: 20px;

    h2 {
      font-size: 18px;
    }
  }
  .form {
    gap: 20px;
  }
  .form__all-inp {
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    row-gap: 20px;
    column-gap: 15px;
  }

  .form__item {
    label {
      font-size: 12px;
    }
    input,
    textarea {
      padding: 15px;
    }
  }
  .form__radio-btn {
    gap: 15px;
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    label {
      gap: 10px;
      font-size: 12px;
    }
  }
  .form__submit-btn {
    padding: 8px 30px;
    font-size: 12px;
  }
}
</style>
