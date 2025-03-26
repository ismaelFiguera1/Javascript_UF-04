const d = document, $body = d.querySelector("body"), $template = d.querySelector("template");

const getCiutats = async () => {
    try {
        let res = await axios.get("http://localhost:3000/Ciutats");
        console.log(res);
        let json = res.data;
        let $taula = $template.querySelector("table");
console.log($template);
console.log($taula);


    } catch (error) {
        let message = error.statusText || "S'ha Produit un error al recuperar les dades";
        $body.insertAdjacentHTML(
          "afterend",
          `<p><mark><b>${error.status}: ${message}</b><mark></p>`
        );
    }
}

d.addEventListener("DOMContentLoaded", getCiutats())