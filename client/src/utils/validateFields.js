export default (field, regex) => {
  const invalidField = regex.test(field) === false;

  if (invalidField) {
    return `This data is invalid: ${invalidField}`;
  }
};
