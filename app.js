const firstSelect = document.getElementById('first-select');
const secondSelect = document.getElementById('second-select');
let amountInput = document.getElementById('amount');
const covertButton = document.querySelector('button');
let currenciesObject = {};
let from = 0;
let to = 0;
let amount = 0;
let result = document.querySelector('h1');




amountInput.addEventListener('change', (e) =>{
  amount = e.currentTarget.value;
})

covertButton.addEventListener('click', (e)=>{
  e.preventDefault();
  result.innerText = (to * amount);
  // alert(result.outerHTML)
})


const initDropDowns = () =>{
  fetch('https://v6.exchangerate-api.com/v6/390e877136e9a229ba09b410/latest/USD')
  .then(res => res.json().then(res =>{
   Object.keys(res.conversion_rates).forEach(rate => {
      const optionTagOne = document.createElement('option');
      const optionTagTwo = document.createElement('option');
      optionTagOne.innerText = rate;
      optionTagTwo.innerText = rate;
      firstSelect.appendChild(optionTagOne);
      secondSelect.appendChild(optionTagTwo);    
  })}))
  

}

const getValuesFromFirstSelect = () =>{
  firstSelect.addEventListener('change', e =>{
    if(e.currentTarget.value !== 'FROM'){
      fetch(`https://v6.exchangerate-api.com/v6/390e877136e9a229ba09b410/latest/${e.currentTarget.value}`)
      .then(res => res.json().then(res =>{
        currenciesObject = res.conversion_rates;
    }))
    from = currenciesObject[e.currentTarget.value];
    console.log(currenciesObject)
    secondSelect.disabled = false;
  }
  })
}

const getValuesFromSecondSelect = () =>{
  secondSelect.addEventListener('change', e =>{
    to = currenciesObject[e.currentTarget.value];
    
  })
}

initDropDowns();

getValuesFromFirstSelect();
getValuesFromSecondSelect();



//para mirar el json no mas
// const printRates = () => {
//   fetch('https://v6.exchangerate-api.com/v6/390e877136e9a229ba09b410/latest/USD')
//   .then(res => res.json().then(res => console.log(res.conversion_rates.EUR)))
// }