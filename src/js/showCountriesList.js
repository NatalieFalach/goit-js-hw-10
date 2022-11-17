export function showCountryList(data) {
  return data
    .map(country => {
      return `
    <li>
      <img class="flag-img" src="${country.flags.svg}" alt="${country.name.official}">
      ${country.name.official}
    </li>`;
    })
    .join('');
}
