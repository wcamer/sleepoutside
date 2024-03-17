import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  let numberOfItemsInCart =
    document.querySelector(".product-list").childElementCount;


  //total in cart functionality
  if (numberOfItemsInCart > 0) {
    let cartTotalSection = document.querySelector(".cart-footer-hide");
    cartTotalSection.style.color = "green";
    cartTotalSection.style.display = "block";
  }
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += (cartItems[i].FinalPrice * cartItems[i].quantity);
  }
  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
