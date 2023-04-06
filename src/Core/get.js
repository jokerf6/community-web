export default async function Get(URL) {
  await fetch(URL, {
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
