<template>
  <div>
    <main-page>
      <div class="page__title">
        <h1>{{ $t('namePage.contact') }}</h1>
      </div>
      <div class="page__container">
        <div class="page__wrapper">
          <div class="page__contacts">
            <div class="contact">
              <div class="contact__title">
                <h3>{{ $t('contact.titleOne') }}</h3>
                <p>{{ $t('contact.subtitle') }}</p>
              </div>
              <div class="contact__data">
                <div class="data__one">
                  <h4>{{ $t('contact.office') }}</h4>
                  <ul>
                    <li>
                      {{ $t('contact.map') }}:<a
                        href="https://maps.app.goo.gl/6XfMug9vNCshjW9R8"
                        target="_blank"
                        rel="noopener noreferrer"
                        >730 Glenstone Ave 65802, Springfield, US</a
                      >
                    </li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12322233344">+123 222 333 44</a></li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12366677788">+123 666 777 88</a></li>
                    <li>
                      E-mail:<a href="mailto:ministore@yourinfo.com">ministore@yourinfo.com</a>
                    </li>
                  </ul>
                </div>
                <div class="data__two">
                  <h4>{{ $t('contact.manage') }}</h4>
                  <ul>
                    <li>
                      {{ $t('contact.map') }}:<a
                        href="https://maps.app.goo.gl/6XfMug9vNCshjW9R8"
                        target="_blank"
                        rel="noopener noreferrer"
                        >730 Glenstone Ave 65802, Springfield, US</a
                      >
                    </li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12322233344">+123 222 333 44</a></li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12366677788">+123 666 777 88</a></li>
                    <li>
                      E-mail:<a href="mailto:ministore@yourinfo.com">ministore@yourinfo.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="contact">
              <div class="contact__title">
                <h3>{{ $t('contact.store') }}</h3>
                <p>{{ $t('contact.subtitleTwo') }}</p>
              </div>
              <div class="contact__data">
                <div class="data__one">
                  <h4>{{ $t('contact.usa') }}</h4>
                  <ul>
                    <li>
                      {{ $t('contact.map') }}:<a
                        href="https://maps.app.goo.gl/6XfMug9vNCshjW9R8"
                        target="_blank"
                        rel="noopener noreferrer"
                        >730 Glenstone Ave 65802, Springfield, US</a
                      >
                    </li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12322233344">+123 222 333 44</a></li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12366677788">+123 666 777 88</a></li>
                    <li>
                      E-mail:<a href="mailto:ministore@yourinfo.com">ministore@yourinfo.com</a>
                    </li>
                  </ul>
                </div>
                <div class="data__two">
                  <h4>{{ $t('contact.germany') }}</h4>
                  <ul>
                    <li>
                      {{ $t('contact.map') }}:<a
                        href="https://maps.app.goo.gl/1V1RMxQ2uGXaLLs49"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Französische Str., 10117 Berlin</a
                      >
                    </li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12322233344">+123 222 333 44</a></li>
                    <li>{{ $t('contact.tel') }}:<a href="tel:+12366677788">+123 666 777 88</a></li>
                    <li>
                      E-mail:<a href="mailto:ministore@yourinfo.com">ministore@yourinfo.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="page__image">
            <img :src="fullImagePath" alt="" />
          </div>
        </div>
      </div>
    </main-page>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '@/stores/productStore'

const prodStore = useProductsStore()
const imagePath = '/uploads/contact/contactOne.jpeg'
//====image====================================================================================================================================================
const fullImagePath = computed(() => `${prodStore.baseURL}${imagePath}`)
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
.page__wrapper {
  display: flex;
  flex-direction: column;
  gap: 120px;
}
.page__contacts {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.contact {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.contact__title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  justify-content: center;

  h3 {
    font-weight: 400;
    font-size: 30px;
    letter-spacing: 6%;
    text-transform: uppercase;
    color: rgb(39, 39, 39);
  }
  p {
    font-family: 'Lato';
    font-weight: 300;
    font-size: 16px;
    line-height: 1.3;
  }
}
.contact__data {
  display: flex;
  gap: 20px;
  align-items: center;

  h4 {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style-type: none;
    max-width: 350px;

    li {
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Lato';
      font-weight: 600;
      font-size: 16px;
      line-height: 1.4;
      color: #72aec8;

      a {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;
        text-decoration: none;
        color: rgb(58, 58, 58);
        transition: all 0.3s ease;
        &:hover {
          transition: all 0.3s ease;
          color: #3982a2;
          font-weight: 700;
        }
      }
    }
  }
}
.page__image {
  position: relative;
  width: 100%;
  padding-bottom: 530px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
@media (max-width: 1330px) {
  .page__contacts {
    flex-direction: column;
  }
}
@media (max-width: 768px) {
  .page__wrapper {
    gap: 30px;
  }
  .page__title {
    padding: 35px 0 55px 0;
    &:not(:last-child) {
      margin-bottom: 60px;
    }
    h1 {
      font-size: 53px;
    }
  }
  .contact {
    gap: 15px;
  }
  .contact__title {
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 12px;
    }
  }
  .contact__data {
    gap: 10px;

    h4 {
      font-size: 14px;
    }
    ul {
      li {
        display: flex;
        gap: 5px;
        font-size: 12px;

        a {
          font-size: 13px;
        }
      }
    }
  }
  .page__image {
    padding-bottom: 330px;
  }
}
@media (max-width: 590px) {
  .contact__data {
    flex-direction: column;
    .data__one,
    .data__two {
      width: 100%;
    }
  }
  .page__image {
    padding-bottom: 130px;
  }
}
</style>
