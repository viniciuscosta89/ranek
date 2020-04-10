/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export function serialize(obj) {
  let queryString = '';

  for (const key in obj) {
    queryString += `&${key}=${obj[key]}`;
  }

  return queryString;
}

export function mapFields(options) {
  const object = {};
  // eslint-disable-next-line no-plusplus
  for (let x = 0; x < options.fields.length; x++) {
    const field = [options.fields[x]];
    object[field] = {
      get() {
        return this.$store.state[options.base][field];
      },
      set(value) {
        this.$store.commit(options.mutation, { [field]: value });
      },
    };
  }
  return object;
}
