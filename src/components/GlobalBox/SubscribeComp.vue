<template>
  <div class="container">
    <div class="block">
      <div class="block__text">
        <h3>{{ $t('globalBox.subscribe') }}</h3>
        <p>{{ $t('globalBox.textSubscribe') }}</p>
      </div>
      <form @submit.prevent="onSubmit" class="block__form form">
        <div class="form__inp-block">
          <Field
            name="emailSab"
            class="form__input"
            type="email"
            placeholder="Your email address here"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <button type="submit" class="form__btn">{{ $t('globalBox.btnSubscribe') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
//=======Validate Email Input=================================================================================================================================================
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { emailSchema } from '@/validate/emailSend'
const { handleSubmit, resetForm } = useForm({
  validationSchema: emailSchema,
})
const onSubmit = handleSubmit(() => {
  resetForm()
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.block {
  display: flex;
  align-items: center;
  gap: 124px;
  background-color: rgb(39, 39, 39);
  padding: 80px 110px;
  margin-bottom: 120px;
}
.block__text {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgb(255, 255, 255);

  h3 {
    font-size: 30px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 6%;
  }
  p {
    font-family: 'Lato';
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    letter-spacing: 3%;
  }
}
.block__form {
  width: 50%;
  display: flex;
  align-items: center;
}
.form__inp-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.form__input {
  padding: 15px 30px 15px;
  background-color: rgb(255, 255, 255);
}
.form__btn {
  padding: 18px 40px;
  background-color: #72aec8;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 10%;
  color: rgb(255, 255, 255);
  font-family: 'Lato';
}
.error {
  color: red;
  font-weight: 700;
  font-style: italic;
}
@media (max-width: 965px) {
  .block {
    gap: 40px;
    padding: 40px;
  }
  .form__btn {
    padding: 18px 20px;
  }
}
@media (max-width: 768px) {
  .block {
    flex-direction: column;
    gap: 20px;
    padding: 40px;
    margin-bottom: 40px;
  }
  .block__text,
  .block__form {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .block {
    padding: 40px;
  }
  .block__text {
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
  .form__input {
    padding: 10px 5px 10px;
  }
  .form__btn {
    padding: 13px 10px;
  }
}
</style>
