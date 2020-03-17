const styles = `<style>
  .email-content {
    line-height:1.5;
    font-size:14px;
  }
</style>`;

exports.emailResetSuccess = (name, email) => ({
  text: {
    pl: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Witaj ${name}, </h3>
  <div>Hasło dla konta ${email} do serwisu Pangea.eu zostało zmienione.</div></div></body></html>`,
    eng: `<html>
    <head>${styles}</head> <body><div class="email-content"><h3>Hi ${name}, </h3>
  <div>This is a confirmation that the password for your account ${email} has just been changed.</div></div></body></html>`
  },
  subject: {
    pl: "Pangea - Hasło zostało zmienione",
    eng: "Pangea - Your password has been changed"
  }
});
