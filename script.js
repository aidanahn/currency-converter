function Currency(type, value) {
    this.type = type;
    this.value = value;
}

function Flag(country) {
    this.country = country;
}

Flag.prototype.returnFlag = function() {
    return Flags[this.country];
}

const Flags = {
    USD: 'icons/USA.svg',
    EUR: 'icons/Euro.png',
    GBP: 'icons/UK.png',
    JPY: 'icons/Japan.svg'
}

const Exchange = {
    USD: 1,
    EUR: 0.92115,
    GBP: 0.7758,
    JPY: 160.258
}

const currency1 = new Currency(document.querySelector('#first-currency').value);
const currency2 = new Currency(document.querySelector('#second-currency').value);


const exchangeButton = document.querySelector('.submit-btn');
const selectButtons = document.querySelectorAll('select');
const switchButton = document.querySelector('.swap-btn');

exchangeButton.onclick = () =>  {
    setCurrency();
    setExchangedCurrency(getExchangedCurrency());
    setFlags();
}

for (let i = 0; i < selectButtons.length; i++) {
    selectButtons[i].oninput = () => {
        setCurrency();
        setFlags()
    }
}

switchButton.onclick = () => {
    switchCurrency();
    
    setFlags();
}


function switchCurrency() {
    let temp = currency1.type;
    currency1.type = currency2.type;
    currency2.type = temp;
    selectButtons[0].value = currency1.type
    selectButtons[1].value = currency2.type
}

function setFlags() {
    const flagOne = new Flag(currency1.type);
    const flagTwo = new Flag(currency2.type);

    document.querySelector('#flag-one').src = flagOne.returnFlag();
    document.querySelector('#flag-two').src = flagTwo.returnFlag();
}

function setCurrency() {
    currency1.type = document.querySelector('#first-currency').value
    currency2.type = document.querySelector('#second-currency').value
    if (document.querySelector('#amount').value === '') {
        currency1.value = 0;
    }
    else {
        currency1.value = document.querySelector('#amount').value;
    }
}

function getExchangedCurrency() {
    let finalValue;
    if (currency1.type === 'USD') {
        finalValue = currency1.value * Exchange[currency2.type];
    }
    else {
        finalValue = (currency1.value / Exchange[currency1.type]) * Exchange[currency2.type];
    }
    return finalValue.toFixed(5);;
}

function setExchangedCurrency(finalValue) {
    const result = document.querySelector('#result-text');
    result.textContent = `${currency1.value} ${currency1.type} = ${finalValue} ${currency2.type}`;
}