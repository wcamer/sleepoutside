import { loadHeaderFooter, getLocalStorage, setLocalStorage} from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key
        this.outputSelector = outputSelector
        this.list =[];
        this.numberOfItems =  0 //this.list.length
        this.itemTotal = 0
        this.shipping =  0 //10 + ((this.list.length - 1 ) * 2 )
        this.tax = this.itemTotal * .06
        this.orderTotal= 0

    }

    init() {
        this.list = getLocalStorage(this.key)
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        this.numberOfItems = this.list.length
        //setLocalStorage("numOfItemsInCart", numberOfItems)
        
        for(i = 0; i < this.list.length; i++){
            this.itemTotal += this.list[i].FinalPrice
        }


    }

    calculateOrderTotal() {
        this.shipping = 10 +(this.list.length-1 * 2)
        this.tax = this.itemTotal * .06
        let orderTotal = this.itemTotal + this.shipping + this.tax 

        // let shippingSelecter = document.querySelector("#shipping")
        // shippingSelecter.innerHTML = shipping
        // let taxSelecter = document.querySelector("#tax")
        // taxSelecter.innerHTML = tax
        this.displayOrderTotals()


    }

    displayOrderTotals() {
        document.querySelector("#orderSubtotalNum").innerHTML = "$" +this.itemTotal.toFixed(2)
        document.querySelector("#shippingNum").innerHTML = "$" + this.shipping.toFixed(2)
        document.querySelector("#taxNum").innerHTML = "$" +this.tax.toFixed(2)
        document.querySelector("#orderTotal").innerHTML = "Order Total: $" + this.orderTotal.toFixed(2)
        
    }


}