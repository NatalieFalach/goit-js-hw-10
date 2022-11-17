import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { showCountryList } from './js/showCountriesList';
import { showCountryCard } from './js/showCountryCard';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(e) {
  const countryName = e.target.value.trim();

  if (countryName.length === 0) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.status === 404) {
        throw new Error('Oops, there is no country with that name');
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 2 && data.length < 10) {
        refs.countryList.innerHTML = showCountryList(data);
        refs.countryInfo.innerHTML = '';
      } else if (data.length === 1) {
        refs.countryInfo.innerHTML = showCountryCard(data);
        refs.countryList.innerHTML = '';
      }
    })
    .catch(e => {
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
      Notify.failure(e.message);
    });
}
