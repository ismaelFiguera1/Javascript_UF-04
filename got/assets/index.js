fetch("https://thronesapi.com/api/v2/Characters")
  .then((res) => {
    return res.json();
  })
  .then((resJSON) => {
    console.log(resJSON);
  });
