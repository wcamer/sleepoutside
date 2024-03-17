// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param) //used to be 'product'
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if(clear == true) {
    
    parentElement = "";
  }
  else{

     parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
      
  }
 

}




export function renderWithTemplate(template, parentElement, data, callBack) {
  
  parentElement.insertAdjacentHTML("afterbegin",template);
  if(callBack){
    callBack(data);
  }

 

}

async function loadTemplate(path){
  //console.log("--------------------",path) "../partials/header.html"
  //const html = await fetch(path).then((response)=>{return response.text()}); //getting the path and converting it to text
  // console.log("$$$$$$$$$$$$$$$$$$",html)
  // const template = document.createElement("template");//creating a template tag
  // console.log("?????????????", template)
  // // const template = templateT.content.cloneNode(true)//.getElementsById("document-fragment")
  
  // let templateC = template.cloneNode(true)
  // console.log("^^^^^^^^^^^^^^^ clone template here",template)
  // templateC.innerHTML =   html//.text(); //this needs to await so its not just showing a promise
  // console.log("!!!!!!!!!!!!!",templateC.content)//.querySelector("#document-gragment"))
  //const template = document.createElement("template")
  //let templateC = template.content.childNodes[1]
  //console.log("????????????????",template)
  //template.innerHTML = html 
  //let templateC = template.content.cloneNode(true)
  //console.log("!!!!!!!!!!!!!!!",template.content.childNodes[1])
  //console.log(">>>>>>>>>>>>>>>>>>>>>",templateC.content)
  // template.content.childNodes.forEach(node => {
  //   console.log(node);
  // });/
  const html = await fetch(path).then((response)=>{return response.text()});
  const template = document.createElement("template")
  template.innerHTML = html 
  return template.innerHTML//.content.childNodes[1];

}

export async function loadHeaderFooter (){
  //Making the header piece
  let headerSection = document.querySelector("#headerPiece") //grabbing our header section in the DOM
  let hPathTemplate = await loadTemplate("../partials/header.html")
  //console.log("#########################",hPathTemplate)
  renderWithTemplate(hPathTemplate, headerSection)
  
  //Making the footer piece
  let footerSection = document.querySelector("#footerPiece") //grabbing our footer section in the DOM
  let fPathTemplate = await loadTemplate("../partials/footer.html")
  renderWithTemplate(fPathTemplate, footerSection)
  


}