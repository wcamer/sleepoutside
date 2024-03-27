import { loadHeaderFooter, getLocalStorage, setLocalStorage, alertMessage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const eS = new ExternalServices

function packageItems(items) {
    let objArray = []
    // console.log("^^^^^^^^^^^^^^",items.length)
    for( let i = 0; i < items.length; i++){
        let itemObj = {}
        console.log("44444444444444",items[i])
        console.log("55555555555555",items)
        itemObj["id"]= items[i].Id
        itemObj["name"] = items[i].Name
        itemObj["price"] = items[i].FinalPrice
        itemObj["quantity"] = items[i].quantity
        objArray.push(itemObj)
    }
    // console.log("*****************",objArray)
    return objArray
    
    

}

export default class CheckoutProcess {
    constructor() {
        // this.key = key
        // this.outputSelector = outputSelector
        this.list =[];
        this.numberOfItems =  0 //this.list.length
        this.itemTotal = 0
        this.shipping =  0 //10 + ((this.list.length - 1 ) * 2 )
        this.tax = 0// this.itemTotal * .06
        this.orderTotal= 0

    }
   // 2021-01-27T18:18:26.095Z

    init() {
        this.list = getLocalStorage("so-cart")
        console.log("33333333333333")
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        this.numberOfItems = this.list.length
        //setLocalStorage("numOfItemsInCart", numberOfItems)
        
        for(let i = 0; i < this.list.length; i++){
            this.itemTotal += (this.list[i].FinalPrice * this.list[i].quantity)
            this.numberOfItems++
            console.log("a;sldkjfa;slkdfj",this.itemTotal)
            
            
        }
        const zip = document.querySelector("#zip").content
        console.log("000000000000000000000000",zip, "is here")
        if(zip != ""){
            this.calculateOrderTotal()
        }


    }

    calculateOrderTotal() {
        // this.shipping = (10 +(this.list.length-1 * 2)).toFixed(2)
        let totalQuantityOfAllItems = 0
        for(let i =0 ; i < this.list.length; i++){
            totalQuantityOfAllItems += this.list[i].quantity 
        }
        this.shipping = parseFloat(10 + (totalQuantityOfAllItems -1) *2).toFixed(2)
        this.tax = parseFloat(this.itemTotal * .06).toFixed(2)
        console.log("***********************************************",this.itemTotal)
        this.orderTotal = parseFloat(this.itemTotal + this.shipping + this.tax).toFixed(2)
        
        console.log("##################",this.shipping,this.tax,this.orderTotal,this.numberOfItems)
        this.displayOrderTotals()


    }

    displayOrderTotals() {
        document.querySelector("#orderSubtotalNum").innerHTML = "$" +this.itemTotal
        document.querySelector("#shippingNum").innerHTML = "$" + this.shipping
        document.querySelector("#taxNum").innerHTML = "$" +this.tax
        document.querySelector("#orderTotal").innerHTML = "Order Total: $" + this.orderTotal
        
    }
    FormDataToJson(form){
        const formData = new FormData(form), convertedJson = {}
        formData.forEach(function(value,key) {
            convertedJson[key] = value
        })
        return convertedJson
    }

    async checkout(form = document.forms["checkoutForm"]){
      
        console.log(form)
        const formToJson = this.FormDataToJson(form)
        //console.log("88888888888888",formToJson)
        formToJson["orderDate"] = new Date().toISOString()
        formToJson["orderTotal"] = this.orderTotal
        formToJson["shipping"] = this.shipping
        formToJson["tax"] = this.tax 
        formToJson["items"] = packageItems(this.list)
        
        try{
            const res = await eS.checkout(formToJson)
            setLocalStorage("so-cart",[]) // empties the array in "so-cart" in local storage
            location.assign("/checkout/success.html")
        }catch (err) {
            console.log(err)
            for(let mess in err.message)
             alertMessage(err.message[mess])
        }


    }

    






}