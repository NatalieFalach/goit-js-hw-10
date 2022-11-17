export function fetchCountries(name) {
  const urlParams = new URLSearchParams({
    fields: ['name', 'capital', 'population', 'flags', 'languages'],
  });
  const filterFields = urlParams.toString();

  const url = `https://restcountries.com/v3.1/name/${name}?${filterFields}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}
