const d = document,
  $divMarkdown = d.querySelector("#markdown");

fetch("markdown.md")
  .then((resposta) => resposta.text())
  .then((text) => {
    $divMarkdown.innerHTML = marked.parse(text);
  });
