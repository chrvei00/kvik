const form = document.getElementById("reklamasjon-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("http://www.rookieprogrammer.no/reklamasjon/send", {
    method: "post",
    body: mail,
  }).then((response) => {
    return response.json();
  });
};
