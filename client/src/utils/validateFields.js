export default (field, regex, message) => {
  const invalidField = regex.test(field) === false;
  console.log(invalidField);
  if (invalidField) {
    return message || `This data is invalid: ${field}`;
  }
};
