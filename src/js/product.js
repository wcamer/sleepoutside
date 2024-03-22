import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ExternalServices("tents");
const product = new ProductDetails(productId, dataSource);

product.init();
