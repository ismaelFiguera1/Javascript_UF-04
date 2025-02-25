const $quoteDiv = document.querySelector("#quote");
const $boto = document.getElementById("ajaxBtn");
$boto.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.breakingbadquotes.xyz/v1/quotes", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.responseText);
      $quoteDiv.textContent = response[0].quote;
    } else {
      $quoteDiv.textContent = "Error carregant la frase";
    }
  };
});

async function traduir(text) {
  const resposta = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|es`
  );
  await console.log(resposta);

  const textTraduit = await resposta.json();

  await console.log(textTraduit);

  return textTraduit.responseData.translatedText;
}

document.querySelector("#promiseBtn").addEventListener("click", () => {
  fetch("https://api.breakingbadquotes.xyz/v1/quotes")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return new Error("Error carregant la frase");
      }
    })
    .then(async (response) => {
      $quoteDiv.textContent = await traduir(response[0].quote);
    })
    .catch((err) => {
      $quoteDiv.textContent = `error: ${err}`;
    });
});
