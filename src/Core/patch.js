export default async function Post(URL, Body) {
  await fetch(URL, {
    method: "PATCH",
    body: Body,
  })
    .then((res) => {
      res.json().then((data) => {
        if (res.status !== 200) {
          return false;
        } else {
          return data;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
