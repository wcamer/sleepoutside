import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get the existing cart items from local storage
  let existingCart = getLocalStorage("so-cart");
  // If the existing cart is not an array, initialize it as an empty array
  if (!Array.isArray(existingCart)) {
    existingCart = [];
  }
  // Add the new product to the cart
  existingCart.push(product);
  // Save the updated cart back to local storage
  setLocalStorage("so-cart", existingCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  console.log("Add to cart button clicked");
  const product = await dataSource.findProductById(e.target.dataset.id);
  console.log("Product: ", product);
  addProductToCart(product);
}
// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
