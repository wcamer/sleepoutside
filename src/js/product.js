import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

//og code below
// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

//solution
function addProductToCart(product) {
  let newArray = [];
  let array = getLocalStorage("so-cart");
  if (array == null) {
    array = newArray;
    array.push(product);
  } else {
    array.push(product);
  }

  setLocalStorage("so-cart", array);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
