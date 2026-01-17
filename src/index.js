import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector('.input');
const countreList = document.querySelector('.countrie-list');
const countryOutput = document.querySelector('.output');

if(inputRef){inputRef.addEventListener('input', debounce(searchCountry, 500));}



function searchCountry(event) {
  const countryName = event.target.value.trim();
  countreList.innerHTML = ""
  fetchCountries(countryName).then(res => {
    if (res.length > 10) {
      error({
        text: 'make country more understandible',
        delay: 1000,
      });
      countryOutput.innerHTML = ""
      return;
    }

    if (res.length > 1 && res.length <= 10) {
      countryOutput.innerHTML = ""
      countreList.innerHTML = ""
      const country = res.map(item => {
        return `
        <li class="item">${item.name.common}</li>
        `;
      }).join("")
        countreList.innerHTML = country

    }

    if (res.length ===1 ){
      countreList.innerHTML = ""
      
      const countryInfo = res.map((item)=>{
        const languages = Object.values(item.languages)
        return countryOutput.innerHTML = `<h1 class="country-name">${item.name.common}</h1>
  <div class="wraper">
  <div class="box-one">
  
  
  <h3 class="capital">capital:   <span class="grey">${item.capital}</span></h3>
  <h3 class="population">population: <span class="grey">${item.population}</span></h3>
  <h3 class="langueges">languages:</h3>
  <ul class="language-list">${languages.map(item => {
    return `<li><span class="grey">${item}</span></li>`
  }).join("")}</ul>
  
 
    </div>
  <img src="${item.flags.png}" alt="${item.flags.alt}" class="img" width="200px">
 </div>`
      }).join()
    }
    return
  }).catch(error => console.log(error)
  )
}
