export default (field, regex, message) => {
  // [colud] może warto dodać eslinta który dbał by o usuwanie console.log ów ?
  const invalidField = regex.test(field) === false;
  if (invalidField) {
    return message || `This data is invalid: ${field}`;
  }
};
