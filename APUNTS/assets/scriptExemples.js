function multiplicacio(valor) {
  if (typeof valor !== "number") {
    return Promise.reject(`El valor ${valor} no es un numero`);
  }
  return new Promise((resolve, reject) => {
    resolve({
      valor,
      rtat: valor * valor,
    });
  });
}


const executarMultiplicacio = async () => {
  try {
    const resultat = await multiplicacio(5);
    console.log(`El quadrat de ${resultat.valor} és ${resultat.rtat}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

executarMultiplicacio();

