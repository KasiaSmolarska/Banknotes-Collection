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
</style>`;

exports.passwordRecover = (name, link) => ({
  text: {
    pl: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Witaj ${name}, </h3>
  <div>Nie pamiętasz hasła do swojego konta?</div> 
  <div>To żaden problem! Kliknij w przycisk i zresetuj hasło.</div>
  <a class="btn" href="${link}">ZRESETUJ HASŁO</a>
  <div><small>Jeśli to nie ty próbowałeś zmienić hasło, zignoruj tą wiadomość. Twoje hasło pozostanie bez zmian.<small></div></div></body></html>`,
    eng: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Hi ${name}, </h3>
  <div>Please click on the following link to reset your password. <a  class="btn" href="${link}">RESET PASSWORD</a></div>
  <div><small>If you did not request this, please ignore this email and your password will remain unchanged.</small></div></div></body></html>`
  },
  subject: {
    pl: "Pangea - Prośba o zmianę hasła",
    eng: "Pangea - Password change request"
  }
});
