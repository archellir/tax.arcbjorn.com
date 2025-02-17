export const restrictToIntegers = (event: KeyboardEvent): void => {
  const digitsRegExp = /[0-9]/;
  const input = event.target as HTMLInputElement;

  // Allow control keys (backspace, delete, arrows, etc.)
  if (!(event.key && event.key.length === 1)) {
    return;
  }

  // Allow copy/paste operations
  if (event.ctrlKey || event.metaKey) {
    return;
  }

  // Check if input is a digit and won't exceed 5 characters
  if (
    !digitsRegExp.test(event.key) ||
    (input.value.length >= 5 && !input.selectionStart)
  ) {
    event.preventDefault();
  }
};

export const handlePaste = (event: ClipboardEvent): void => {
  const input = event.target as HTMLInputElement;
  const pastedData = event.clipboardData?.getData('text');
  if (!pastedData) return;

  const digitsOnly = pastedData.replace(/\D/g, '');

  // Get the current selection range
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? 0;

  // Calculate what the new value would be after paste
  const beforeSelection = input.value.slice(0, start);
  const afterSelection = input.value.slice(end);
  const newValue = beforeSelection + digitsOnly + afterSelection;

  // If the resulting number would be more than 5 digits, prevent paste
  if (newValue.length > 5) {
    event.preventDefault();
  }
};
