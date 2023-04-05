import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY))

function countrySearch(e) {
    const countryToFind = e.target.value.toLowerCase().trim();
    console.log(countryToFind);

    fetchCountries(countryToFind)
        .then(countryMarkUp)
        .catch(err => { console.log(err, "error") })
}

function countryMarkUp(data) {
    let markUp = null;
    if (data.length >= 2 && data.length <= 10) {
        markUp = data.map((item) => {
            return `<li class="country-item">
            <img class="country-image" src=${item.flags.svg} alt="${item.flags.alt} width="20">
            ${item.name.common}
            </li>`
        }).join('');

        countryList.innerHTML = markUp;

    } else if (data.length === 1) {
        countryList.innerHTML = " ";
        markUp = data.map((item) => {
            return `<li class="item">
            <div class="country">
                <img
                    class="country-image"
                    src="${item.flags.svg}"
                    alt="${item.flags.alt}"
                    width="30"
                />
                <p class="country-name">${item.name.common}</p>
            </div>
            <div class="country-description">
                <ul class="description-list">
                    <li class="description-list__item">
                        <h4 class="list-option">Capital:</h4>
                        ${item.capital}
                    </li>
                    <li class="description-list__item">
                        <h4 class="list-option">Population: </h4>
                        ${item.population}
                    </li>
                    <li class="description-list__item">
                        <h4 class="list-option">Languages: </h4>
                        ${Object.values(item.languages).join(',')}
                    </li>
                </ul>
            </div>
        </li>
          `
        })

        countryList.innerHTML = markUp;

    } else if (data.length > 10) {
        countryList.innerHTML = " ";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
}

