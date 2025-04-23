document.querySelector(".exercici").addEventListener("click", (e) => {
    if (e.target.matches("a")) {
        e.preventDefault();
        alert(`Click des de ${e.target.textContent}`);
    }
});
