/*
// timeout en milisegons 
setTimeout(() => {
  console.log("Executant setTimeout passats 5 segons");
}, 5000);

// setInterval permet executar un callback a intervals de tems regulars 

setInterval(() => {
  // console.log("M'executo cada 2 segons");
  console.log(new Date().toLocaleTimeString());
}, 1000);
*/
/*
setTimeout(function () {
  console.log("Aquesst missatge hauria de ser el primer");
}, 0);

console.log("Sorpresa");
*/
// Cancelar temporitzadors
/*
let back1 = setTimeout(() => {
  console.log("Hola");
}, 5000);

clearTimeout(back1);

console.log("fi");

let back2 = setInterval(() => {
  console.log("interval");
}, 1000);

clearInterval(back2);
*/

/* La Callback es una funcio que es passa com a argument o com a parametre d'una altra funcio i que sera invocada posteriorment per completar algun tipus d'accio. Es el mecanisme mes utilitzat en Javascript per fer crides assincrones */

function quadratCallback(numero, callback) {
  setTimeout(() => {
    callback(numero, numero * numero);
  }, 5000);
}
/*
quadratCallback(10, (numero, resultat) => {
  console.log("Inicia la callback");
  console.log(`${numero} al quadrat es ${resultat}`);
  quadratCallback(11, (numero, resultat) => {
    console.log(`${numero} al quadrat es ${resultat}`);
  });
  quadratCallback(12, (numero, resultat) => {
    console.log(`${numero} al quadrat es ${resultat}`);
  });
  quadratCallback(13, (numero, resultat) => {
    console.log(`${numero} al quadrat es ${resultat}`);
  });
  quadratCallback(14, (numero, resultat) => {
    console.log(`${numero} al quadrat es ${resultat}`);
  });
});
*/

// crides assincrones amb resultats sincrons

/*
quadratCallback(10, (numero, resultat) => {
  console.log("Inicia la callback");
  console.log(`${numero} al quadrat es ${resultat}`);
  quadratCallback(11, (numero, resultat) => {
    console.log(`${numero} al quadrat es ${resultat}`);

    quadratCallback(12, (numero, resultat) => {
      console.log(`${numero} al quadrat es ${resultat}`);

      quadratCallback(13, (numero, resultat) => {
        console.log(`${numero} al quadrat es ${resultat}`);

        quadratCallback(14, (numero, resultat) => {
          console.log(`${numero} al quadrat es ${resultat}`);
        });
      });
    });
  });
});
*/

// Funcio equivalent amb promise

function quadratPromise(valor) {
  if (typeof valor !== "number") {
    return Promise.reject(`El valor ${valor} no es un numero`);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        valor,
        rtat: valor * valor,
      });
    }, 3000);
  });
}

quadratPromise(2)
  .then((obj) => {
    console.log("inici promise");
    console.log(`Promise: ${obj.valor}, ${obj.rtat}`);
    return quadratPromise(3);
  })
  .then((obj) => {
    console.log(`Promise: ${obj.valor}, ${obj.rtat}`);
    return quadratPromise("abc");
  })
  .then((obj) => {
    console.log(`Promise: ${obj.valor}, ${obj.rtat}`);
    return quadratPromise(5);
  })
  .then((obj) => {
    console.log(`Promise: ${obj.valor}, ${obj.rtat}`);
    console.log("FI promise");
  })
  .catch((err) => {
    console.error(err);
  });
