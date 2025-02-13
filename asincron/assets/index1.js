/*
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
*/
/* Cuan creem l'objecte new error obtenim : name, stack, message */
/*
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
*/
/*
  Es una funcio normal que rep parametres, i retorna un promise, la promesa te un arrow function que te 2 valors, resolve o reject
  */

function suma(a, b) {
  return new Promise((rsl, rej) => {
    let c = a + b;
    if (c < 0) {
      rej(
        new Error(
          `El resultat no pot ser mes petit que 0 i el resultat es ${c}`
        )
      );
    } else rsl(c);
  });
}
/*
suma(12, 16)
  .then((rtat) => {
    console.log(rtat);
    return suma(5, 1);
  })
  .then((rtat) => {
    alert(rtat);
    return suma(-50, 52);
  })
  .then((rtat) => console.log(rtat))
  .catch((err) => console.log(err));
*/
console.log("*********Async/Await*********");

// Async/Await

// Funcio Declarada

async function unaFuncioDeclarada() {
  try {
    let obj = await suma(10, 10);
    alert(obj);

    obj = await suma(500, 10);
    console.log(obj);

    obj = await suma(30, 10);
    console.log(obj);
  } catch (err) {
    console.error(err);
  }
}

unaFuncioDeclarada();

// Funcio Expressada

const funcioExpressada = async () => {
  try {
    let obj = await suma(10, 10);
    alert(`${obj} desde una funcio expressada`);
    console.log("Funcio expressada");

    obj = await suma(1000, 10);
    console.log(obj);

    obj = await suma(100, 10);
    console.log(obj);
  } catch (err) {
    console.error(err);
  }
};

funcioExpressada();
