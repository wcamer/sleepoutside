import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

let cP = new CheckoutProcess();

cP.init();

document.querySelector("#checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let form = document.forms[0];
  //console.log("$$$$$$$$$$$$$$$",form)
  let formStatusCheck = form.checkValidity();

  if (formStatusCheck) {
    cP.checkout();
  }
});
