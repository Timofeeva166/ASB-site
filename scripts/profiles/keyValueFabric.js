export const createKeyValuePair = () => {
  const createKey = (text, keyClassName) => {
    const span = document.createElement('span');
    span.className = keyClassName;
    span.textContent = text;
    return span;
  }
  const createValue = (text, valueClassName) => {
    const span = document.createElement('span');
    span.className = valueClassName;
    span.textContent = text;
    return span;
  }

  return {createKey, createValue};
}