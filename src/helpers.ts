export const restrictToIntegers = (event: KeyboardEvent): void => {
  const digitsRegExp = /[0-9]/;

  if (
    event.key &&
    event.key.length === 1 &&
    !digitsRegExp.test(event.key) &&
    !(event.ctrlKey || event.metaKey)
  ) {
    return event.preventDefault();
  }
};
