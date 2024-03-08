import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const pd = new ProductData("tents");
const list = document.querySelector(".product-list");
const pl = new ProductListing("tents", pd, list);

pl.init();
