import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  let numberOfItemsInCart =
    document.querySelector(".product-list").childElementCount;

  //task in progress
  //let dC = []

  // for(let i = 0; i < document.querySelector(".product-list").children.length; i++){
  //   if (!dC.includes(document.querySelector(".product-list").children[i].children[1].children[0].innerHTML)){
  //     dC.push(document.querySelector(".product-list").children[i].children[1].children[0].innerHTML)
  //   } else{
  //     let dup = document.querySelector(".product-list").children[i].children[1].children[0].innerHTML
  //     let dupValue = parseInt(dup)
  //     console.log("????????????????????????????????????")
  //     console.log(document.querySelector(".product-list").children[i].children[1].children[0].innerHTML)// name
  //     for (let k = 0; k < document.querySelector(".product-list").children.length; k++){
  //       let checkBack = document.querySelector(".product-list").children[k].children[1].children[0].innerHTML
  //       let checkBackValue = parseInt(checkBack)
  //       /////
  //       ////stopping for the night.  You need to get a dynamic count for the quality and save it to a variable
  //       ////with the variable you can write a string literal with the variable and then use innerHTML to rewrite the html

  //       let checkBackQuantity = parseInt(document.querySelector(".product-list").children[k].children[3].children[0].innerHTML)
  //       if( checkBack == dup){
  //         document.querySelector(".product-list").children[k].children[1].children[0].innerHTML = checkBackValue + dupValue
  //         document.querySelector(".product-list").children[k].children[3].children[0].innerHTML = checkBackQuantity + 1
  //       }
  //     }
  //   }
  // }

  // console.log("here is dcccccccccccccccccccccccccccccccc,'n\n",dC)

  // for(let i = 0; i < document.querySelector(".product-list").children.length; i++){
  //   console.log(document.querySelector(".product-list").children[i].children[1].children[0].innerHTML)
  //   let itemName =document.querySelector(".product-list").children[i].children[1].children[0].innerHTML
  //   if (!dC.includes(itemName)){
  //     dC.push(itemName)

  //   }else{
  //     for(let k = 0; k < document.querySelector(".product-list").children.length; k++){
  //       if(itemName == document.querySelector(".product-list").children[k].children[1].children[0].innerHTML){
  //         document.querySelector(".product-list").children[i].children[3].children[0].innerHTML
  //       }
  //     }
  //   }
  // }

  //total in cart functionality
  if (numberOfItemsInCart > 0) {
    let cartTotalSection = document.querySelector(".cart-footer-hide");
    cartTotalSection.style.color = "green";
    cartTotalSection.style.display = "block";
  }
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].FinalPrice;
  }
  document.querySelector(".cart-total").textContent =
    `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
