export default function checkDir(text) {
  var arabic = /[\u0600-\u06FF]/;

  return arabic.test(text);
}
