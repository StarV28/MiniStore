<template>
  <div class="about">
    <main-page>
      <div class="page__title">
        <h1>{{ $t('namePage.about') }}</h1>
      </div>
      <div class="page__container">
        <guaranty-comp class="guaranty" />
        <div class="page__found">
          <div class="found__image">
            <img :src="fullImagePath" alt="" />
          </div>
          <div class="found__description">
            <h3>How was Ministore Found?</h3>
            <div class="description__text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nesciunt, animi
                assumenda tempore recusandae tempora doloribus quasi! Impedit, id temporibus.
                Itaque, consequuntur ullam. Voluptatum esse fugit blanditiis numquam molestiae
                aliquam, repellat optio modi consequuntur suscipit earum assumenda itaque tempora
                architecto deserunt? Architecto veniam rem accusamus dolores, sunt consequatur
                labore dicta mollitia aliquid similique ab in.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nulla sint
                repudiandae maiores vel similique ipsum sunt quasi inventore. Accusamus ad, minus
                ipsa iusto porro sit cum impedit, quisquam voluptatibus repellendus aliquid, nam
                illum quam.
              </p>
            </div>
            <div class="description__btn"><span>Shop Our store</span></div>
          </div>
        </div>
        <div class="page__testimonial">
          <v-carousel height="200" hide-delimiters>
            <template #prev="{ props }">
              <button class="carousel-arrow prev" v-bind="props">
                <icons-comp name="arrow-prev" color="#72aec8" />
              </button>
            </template>

            <template #next="{ props }">
              <button class="carousel-arrow next" v-bind="props">
                <icons-comp name="arrow-next" color="#72aec8" />
              </button>
            </template>

            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet height="100%">
                <div class="d-flex fill-height align-center">
                  <div class="testimonial__block">
                    <div class="block__text">{{ slide.text }}</div>
                    <div class="block__rating">
                      <icons-comp
                        name="star-blue"
                        color="#72aec8"
                        size="17"
                        v-for="(star, index) in Number(slide.stars)"
                        :key="index"
                      />
                      <div class="block__name">{{ slide.name }}</div>
                    </div>
                  </div>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </main-page>
  </div>
</template>
<script setup>
import GuarantyComp from '../components/GlobalBox/GuarantyComp.vue'
import { computed } from 'vue'
import { useProductsStore } from '@/stores/productStore'

const prodStore = useProductsStore()
const imagePath = '/uploads/about/about.jpeg'
//====image====================================================================================================================================================
const fullImagePath = computed(() => `${prodStore.baseURL}${imagePath}`)
//========================================================================================================================================================
const slides = [
  {
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, quibusdam vero eaque tempora excepturi veritatis, blanditiis tempore consequatur esse a exercitationem maxime? Ullam qui reprehenderit similique aliquam quae explicabo libero, laborum nisi, officiis quam nemo!',
    name: 'Emma Chamberlin',
    stars: '5',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, quibusdam vero eaque tempora excepturi veritatis, blanditiis tempore consequatur esse a exercitationem maxime? Ullam qui reprehenderit similique aliquam quae explicabo libero, laborum nisi, officiis quam nemo!',
    name: 'Iryna Hordieieva',
    stars: '5',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, quibusdam vero eaque tempora excepturi veritatis, blanditiis tempore consequatur esse a exercitationem maxime? Ullam qui reprehenderit similique aliquam quae explicabo libero, laborum nisi, officiis quam nemo!',
    name: 'Liam Becker',
    stars: '4',
  },
  {
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate, quibusdam vero eaque tempora excepturi veritatis, blanditiis tempore consequatur esse a exercitationem maxime? Ullam qui reprehenderit similique aliquam quae explicabo libero, laborum nisi, officiis quam nemo!',
    name: 'Marta Müller',
    stars: '3',
  },
]
</script>

<style lang="scss" scoped>
.guaranty {
  &:not(:last-child) {
    margin-bottom: 120px;
  }
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
.page__found {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 70px;
  &:not(:last-child) {
    margin-bottom: 120px;
  }
}
.found__image {
  position: relative;
  width: 640px;
  padding-bottom: 600px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.found__description {
  flex-basis: 50%;
  h3 {
    font-size: 30px;
    font-weight: 400;
    line-height: 1.1;
    color: rgb(39, 39, 39);
    display: inline-flex;
    padding-bottom: 10px;
  }
  p {
    font-family: 'Lato';
    font-weight: 300;
    font-size: 16px;
    line-height: 1.4;
    color: rgb(58, 58, 58);
    &:last-child {
      margin-bottom: 40px;
    }
  }
}

.description__btn {
  max-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 50px;
  background-color: rgb(39, 39, 39);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.03);
    box-shadow: 2px 2px 5px black;
  }
  span {
    font-family: 'Lato';
    font-weight: 500;
    font-size: 14px;
    line-height: 1.5;
    color: #ffff;
  }
}
.testimonial__block {
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  text-align: center;
}
.block__text {
  font-family: 'Lato';
  font-weight: 300;
  font-size: 24px;
  color: rgb(58, 58, 58);
  text-align: center;
}
.block__name {
  font-family: 'Lato';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 10%;
}
@media (max-width: 1330px) {
  .testimonial__block {
    gap: 20px;
  }
  .block__text {
    font-size: 18px;
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
  .guaranty {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
  .page__found {
    flex-direction: column;
    gap: 30px;
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
  .found__image {
    width: 100%;
    padding-bottom: 300px;
  }
  .found__description {
    flex-basis: 100%;
    h3 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
  .description__btn {
    max-width: 240px;
    padding: 8px 30px;
    cursor: pointer;
  }
  .testimonial__block {
    gap: 15px;
    padding: 0 15px;
  }
  .block__text {
    font-size: 14px;
  }
  .block__name {
    font-size: 12px;
  }
}
@media (max-width: 505px) {
  .found__image {
    width: 100%;
    padding-bottom: 200px;
  }
  .description__btn {
    max-width: 100%;
    padding: 8px 30px;
  }
  .block__text {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.next {
}
</style>
