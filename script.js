const API_KEY = "6e0ba3f6d29514900a013f2f";

const API = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function handleChangeBaseCurrency(event) {
  const baseCurrency = document.getElementById("baseCurrency");

  const list = document.querySelector(".list-group");

  const items = document.querySelectorAll(".list-group-item");
  items.forEach((item) => item.remove());

  let response = null;

  if (event) {
    response = await fetch(API + event.target.value);
  } else {
    response = await fetch(API + "KGS");
  }
  const result = await response.json();

  let myCurrencies = {};

  for (let key in result.conversion_rates) {
    if (
      key === "KGS" ||
      key === "USD" ||
      key === "KZT" ||
      key === "EUR" ||
      key === "RUB"
    ) {
      myCurrencies = { ...myCurrencies, [key]: result.conversion_rates[key] };
    }
  }

  for (let key in myCurrencies) {
    const li = document.createElement("li");
    li.innerHTML = `${key}: ${myCurrencies[key]}`;
    li.classList.add("list-group-item");

    if (baseCurrency.value === key) {
      li.style.fontWeight = 900;
    }

    list.appendChild(li);
  }
}

handleChangeBaseCurrency();

async function convert() {
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
  );
  const result = await response.json();
  const result11 = document.getElementById("result");

  result11.innerHTML = result.conversion_result;

  const rate1 = document.getElementById("rate");

  rate1.innerHTML = result.conversion_rates;
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    convert();
  }
});
