import Notiflix from 'notiflix';

export function fetchCountries(name) {
    if (name?.length >= 1) {

        return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,population,flags`)
            .then((r) => {
                if (r.status === 200) {
                    return r.json();
                } else if (r.status === 404) {
                    return Promise.reject(Notiflix.Notify.failure("Oops, there is no country with that name"))
                }
            })
    } else {
        countryList.innerHTML = " ";
    }
}