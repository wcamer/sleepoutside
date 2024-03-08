import { renderListWithTemplate } from "./utils.mjs"

function productCartTemplate(product){

let template = `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p></a
            >
          </li>`
    return template
}

export default class ProductListing {

    constructor(category, dataSource, listElement){
        this.category = category
        this.dataSource = dataSource
        this.listElement = listElement 
    }

    async init(){
        const list = await this.dataSource.getData() //an array
        for(let i = 0; i < list.length; i++){
            if (list[i].TopProduct == true){
                
            }else{
                list.splice(i,1)
                
            }
        }
        
        this.renderList(list)
    }

    // renderList(list){
        
    //     let filledTemplate = list.map(productCartTemplate)
    //     this.listElement.innerHTML = filledTemplate;
    // }

    // renderList(list) {
    //     const htmlStrings = list.map(productCartTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    // }
    
    // after stretch refactor
    renderList(list){
        renderListWithTemplate(productCartTemplate,this.listElement, list)
    }

}