<template>
  <div class="container">
    <div class="footer">
      <div class="footer__partner partner">
        <div class="partner__item">
          <p>{{ $t('footer.textShip') }}</p>
          <icons-comp name="dhl" size="34" color="lightgrey" />
          <icons-comp name="post" size="34" color="lightgrey" />
        </div>
        <div class="partner__item">
          <p>{{ $t('footer.textPayment') }}</p>
          <icons-comp name="visa" color="lightgrey" />
          <icons-comp name="mastercard" color="lightgrey" />
          <icons-comp name="paypal" color="lightgrey" />
        </div>
      </div>
      <div class="footer__copyright">
        <icons-comp name="copyright" size="16" color="lightgrey" />
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 0 24px 0;
  font-family: 'lato';
  font-size: 16px;
  font-weight: 300;
  line-height: 1.4;
  color: #3a3a3a;
}
.partner {
  display: flex;
  align-items: center;
  gap: 45px;
}
.partner__item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer__copyright {
  display: flex;
  align-items: center;
  gap: 5px;
}
@media (max-width: 955px) {
  .footer {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .partner {
    gap: 20px;
  }
}
@media (max-width: 465px) {
  .footer {
    font-size: 12px;
  }
}
</style>
