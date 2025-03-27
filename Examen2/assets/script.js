const d = document,
  $body = d.querySelector("body"),
  $template = d.querySelector("template");

const getDades = async () => {
  try {
    // eslint-disable-next-line no-undef
    let res = await axios.get("https://api.thecatapi.com/v1/images/0XYvRd7oD");
    let json = await res.data;
    console.log(json);

    console.log($template);
    let $clonat = $template.content.cloneNode(true);
    console.log($clonat);
    $clonat.querySelector(".name").textContent = `${json.breeds[0].name}`;

    $clonat.querySelector(".vetstreet_url").textContent = "VetStreet_URL";
    $clonat
      .querySelector(".vetstreet_url")
      .setAttribute("href", `${json.breeds[0].vetstreet_url}`);

    $clonat.querySelector(".vcahospitals_url").textContent = "VCAHospitals_URL";
    $clonat
      .querySelector(".vcahospitals_url")
      .setAttribute("href", `${json.breeds[0].vcahospitals_url}`);

    $clonat.querySelector(".cfa").textContent = "CFA";
    $clonat
      .querySelector(".cfa")
      .setAttribute("href", `${json.breeds[0].cfa_url}`);

    $clonat.querySelector(
      ".temperament"
    ).textContent = `${json.breeds[0].temperament}`;

    $clonat.querySelector(".origin").textContent = `${json.breeds[0].origin}`;

    $clonat.querySelector(
      ".description"
    ).textContent = `${json.breeds[0].description}`;

    $clonat.querySelector(
      ".life_span"
    ).textContent = `${json.breeds[0].life_span}`;

    $clonat.querySelector(
      ".affection_level"
    ).textContent = `${json.breeds[0].affection_level}`;

    $clonat.querySelector(
      ".energy_level"
    ).textContent = `${json.breeds[0].energy_level}`;

    $clonat.querySelector(
      ".intelligence"
    ).textContent = `${json.breeds[0].intelligence}`;

    $clonat.querySelector(
      ".social_needs"
    ).textContent = `${json.breeds[0].social_needs}`;

    $clonat.querySelector(".wikipedia_url").textContent = "Wikipedia_URL";
    $clonat
      .querySelector(".wikipedia_url")
      .setAttribute("href", `${json.breeds[0].wikipedia_url}`);

    $clonat.querySelector(".id").textContent = `${json.id}`;

    $clonat.querySelector(".url").setAttribute("src", `${json.url}`);

    $clonat.querySelector(".width").textContent = `${parseInt(json.width)}`;

    $clonat.querySelector(".height").textContent = `${json.height}`;

    let $div = d.createElement("div");

    $div.appendChild($clonat);

    console.log($div);

    $body.insertAdjacentElement("afterbegin", $div);
  } catch (error) {
    let message =
      error.statusText || "S'ha Produit un error al recuperar les dades";
    $body.insertAdjacentHTML(
      "afterend",
      `<p><mark><b>${error.status}: ${message}</b><mark></p>`
    );
    console.log(error.statusText);
  }
};

d.addEventListener("DOMContentLoaded", getDades);
