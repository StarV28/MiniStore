<template>
  <div>
    <div class="page__box">
      <div class="box">
        <div class="box__title">
          <icons-comp name="cart-color" color="#72aec8" size="25" />
          <h2>{{ $t('guarantyComp.delivery') }}</h2>
        </div>
        <div class="box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div class="box">
        <div class="box__title">
          <icons-comp name="quality" color="#72aec8" size="25" />
          <h2>{{ $t('guarantyComp.quality') }}</h2>
        </div>
        <div class="box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div class="box">
        <div class="box__title">
          <icons-comp name="daily-ofers" color="#72aec8" size="25" />
          <h2>{{ $t('guarantyComp.daily') }}</h2>
        </div>
        <div class="box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div class="box">
        <div class="box__title">
          <icons-comp name="secury" color="#72aec8" size="25" />
          <h2>{{ $t('guarantyComp.payment') }}</h2>
        </div>
        <div class="box__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.page__box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-template-rows: auto;
  column-gap: 55px;
  row-gap: 25px;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
}
.box__title {
  display: flex;
  align-items: center;
  gap: 14px;

  h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.1;
  }
}
.box__text {
  font-family: 'Lato';
  font-weight: 300;
  line-height: 1.4;
  font-size: 16px;
  color: rgb(58, 58, 58);
}
@media (max-width: 768px) {
  .page__box {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .box__title {
    gap: 10px;

    h2 {
      font-size: 16px;
    }
  }
  .box__text {
    font-size: 12px;
  }
}
</style>
