import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";
// console.log("11111111111111111111111111")
loadHeaderFooter();
const category = getParams("category");
// console.log("666666666666666666666",category)
const dataSource = new ExternalServices();
// console.log("7777777777777777777",dataSource)

//const pD = new ExternalServices("tents");
const list = document.querySelector(".product-list");
//const pL = new ProductListing("tents", pD, list);

const myProdList = new ProductListing(category, dataSource, list);
// console.log("88888888888888888888",myProdList)

myProdList.init();


