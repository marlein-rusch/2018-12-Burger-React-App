// l. 307. Refactoring Reducers. Optional. Ik gebruik 'm NIET

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
};

// l. 336. Sharing the Validation method.
// Was in 'Auth' file zo: checkValidity(value, rules) {
// Nu in apart file geconverteerd naar arrow function, dus zo:

export const checkValidity = (value, rules) => {
  // l.234. Omdraaien logica: eerst isValid op true, en naar false zetten naargelang condities.
  let isValid = true;

  if (rules.required) {
    // trim = remove whitespace at beginning and end
    isValid = value.trim() !== '' && isValid;
  }
  // die &&isValid is een beetje een trick
  // .. zodat all rules need to resolve to true
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
}