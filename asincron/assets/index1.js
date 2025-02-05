new Promise((resolve) => resolve([1, 2, 3])).then((resul) =>
  console.log(resul)
);

// divisio de dos numeros a/b -> si b es > 0. altrament error

function dividir(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) reject(new Error(`La divisio per ${b} no pot ser`));
    else resolve(a / b);
  });
}

dividir(6, 3)
  .then((rtat) => {
    console.log(`El resultat es ${rtat}`);
  })
  .catch((err) => {
    console.log(err); // es el mateix que err.stack
  });

/* Cuan creem l'objecte new error obtenim : name, stack, message */

function acces(edat) {
  return new Promise((resolve, reject) => {
    if (edat >= 18) resolve("Acces");
    else reject({ edat, lininiaCodi: 27 });
  });
}

acces(18)
  .then((rtat) => console.log(rtat))
  .catch((err) =>
    console.log(`Edat: ${err.edat}, linia codi error ${err.lininiaCodi}`)
  );
