import { getLocalStorage, setLocalStorage } from "./utils.mjs";


  export default class ProductDetails{

    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails(this.product)
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        }

    addToCart(){
        let newArray = [];
        let oldArray = getLocalStorage("so-cart");
        let array = [];
        console.log("here is old array",oldArray)
        if(oldArray == null){
            oldArray = newArray // creates an empty array to be manipulated
            
            this.product["quantity"] = 1 // gives the product object an attrbute of "quantity" and sets value at 1
            //console.log("????????????????\nstarting a new cart with a new product\n",this.product)
            oldArray.push(this.product)
            array = oldArray
        }
        else{
            
            let dupCheck = [] // this will hold product Ids that will be used to check if an incoming product is already in oldArray
            for(let i = 0; i < oldArray.length; i++){
                //console.log("loading the dup checker")
                dupCheck.push(oldArray[i].Id)
            }


            //if dupCheck doesn't already have the incoming product.Id...
            if(!dupCheck.includes(this.product.Id)){
                //give the incoming product a "quantity" attribute and give it a value of 1
                this.product["quantity"] = 1
                oldArray.push(this.product)
                //add the product.Id to dupCheck to prevent future dups
                dupCheck.push(this.product.Id)
            }else{
                //means the incoming product.Id already exists so we find it in the oldArray and increase the quantity value by 1
                for(let i = oldArray.length -1; i >= 0; i--){
                        if(oldArray[i].Id == this.product.Id){
                            oldArray[i].quantity += 1
                        }
                }

            }

            
            array = oldArray;

        }

            


        setLocalStorage("so-cart", array);
        
    }


      

    renderProductDetails(product){
        document.querySelector("main").innerHTML = renderProductTemplate(product)
    }

    

}

function renderProductTemplate(product){
    return `<section class="product-detail">
    <h3>${product.Brand.Name}<h3>
    <h2>${product.NameWithoutBrand}<h2> 
    <img class="divider"
        src=${product.Image}
        alt=${product.NameWithoutBrand}/>

    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__decription">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
        <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
    </div>
</section>`

}
