<template>
  <div class="container">
    <div class="insta">
      <h3>{{ $t('globalBox.shopTitle') }}</h3>
      <div class="insta__images images">
        <div class="images__item">
          <img src="/images/insta-block-1.jpeg" alt="image-instagram" />
        </div>
        <div class="images__item ins">
          <img src="/images/insta-block-2.jpeg" alt="image-instagram" />
          <icons-comp name="insta" size="32" color="white" class="icon-inst" />
        </div>
        <div class="images__item">
          <img src="/images/insta-block-3.jpeg" alt="image-instagram" />
        </div>
        <div class="images__item">
          <img src="/images/insta-block-4.jpeg" alt="image-instagram" />
        </div>
        <div class="images__item">
          <img src="/images/insta-block-5.jpeg" alt="image-instagram" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.insta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 100px;

  h3 {
    font-size: 30px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 6%;
    color: rgb(39, 39, 39);
  }
}
.images {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
}
.images__item {
  position: relative;
  width: 100%;
  padding-bottom: 235px;
  overflow: hidden;
}
.images__item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ins::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(22, 22, 22, 0.2);
  z-index: 2;
}
.icon-inst {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
}
@media (max-width: 1300px) {
  .images {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .images__item {
    padding-bottom: 200px;
  }
}
@media (max-width: 768px) {
  .insta {
    margin-bottom: 40px;
  }
  .images {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  .images__item {
    padding-bottom: 140px;
  }
}
</style>
