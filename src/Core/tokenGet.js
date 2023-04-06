export default async function Get(URL, Headers) {
  await fetch(URL, {
    headers: Headers,
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
