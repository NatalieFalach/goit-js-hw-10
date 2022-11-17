export function showCountryCard(data) {
  const country = data[0];
  return `
      <p>
        <img class="flag-img"
         src="${country.flags.svg}"
         alt="${country.name.official}">${country.name.official}
      </p>
      <p><b>Capital: </b>${country.capital[0]}</p>
      <p><b>Population: </b>${country.population}</p>
      <p><b>Language: </b>${Object.values(country.languages).join(', ')}</p>
  `;
}
