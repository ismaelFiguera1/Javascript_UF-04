



async function obtenirUsuaris() {
  try {
    const resposta = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('Usuaris obtinguts:', resposta.data);
  } catch (error) {
    console.error('Error en carregar usuaris:', error);
  }
}

obtenirUsuaris();