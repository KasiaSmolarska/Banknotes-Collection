const styles = `<style>
  .btn, .btn:visited, .btn:link {
    text-decoration: none;
    padding: 10px 30px;
    display: inline-block;
    border-radius: 20px;
    background-color: #7a18e3;
    color: #fff!important;
    margin: 10px 0 16px;
    font-weight:700;
    letter-spacing: .05em;
    font-size:15x;
  }
  .email-content {
    line-height:1.5;
    font-size:14px;
  }

  .email-content h3{
    font-weight:400!important;
  }
</style>`;

exports.confirmYourAccount = (name, link) => ({
  text: {
    pl: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Witaj ${name}! <br> Potwierdź swój adres email!</h3>
  <div>Aby potwierdzić chęć rejestracji na stronie Pangea.eu prosimy o kliknięcie przycisku poniżej.</div>
  <a class="btn" href="${link}">POTWIERDŹ ADRES EMAIL</a>
  <div>Działaj szybko! Ten link traci ważność po 24 godzinach!</div>
  <div><small>Jeśli to nie ty próbowałeś zarejestrować się na Pangea.eu, zignoruj tą wiadomość.<small></div></div></body></html>`,
    eng: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Hi ${name}! <br> Let's confirm your email address! </h3>
  <div>Please click on the following button to confirm your email. <a  class="btn" href="${link}">CONFIRM EMAIL ADDRESS</a></div>
  <div>Act fast! The validation email expires after 24 hours.</div>
  <div><small>If you did not want to register on Pangea.eu, please ignore this email.</small></div></div></body></html>`
  },
  subject: {
    pl: "Witaj na portalu Pangea! Potwierdź Swój Email.",
    eng: "Welcome to Pangea! Confirm Your Email."
  }
});
