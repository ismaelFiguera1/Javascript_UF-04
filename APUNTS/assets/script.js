const d = document,
  $divMarkdown = d.querySelector("#markdown");

fetch("ApuntsUF2/a001.md")
  .then((resposta) => resposta.text())
  .then((text) => {
    $divMarkdown.innerHTML = marked.parse(text);
  });
