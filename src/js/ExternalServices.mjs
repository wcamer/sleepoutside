const baseURL = import.meta.env.VITE_SERVER_URL;

// const ne = baseURL + "checkout"
// console.log(baseURL,"$$$$$$$$$$$$$$$\n", ne)

////before the refactor
// function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     throw new Error("Bad Response");
//   }
// }

async function convertToJson(res) {
  let data = await res.json() 
  if (res.ok) {
    return data;
  } else {
    throw  { name: "servicesError", message: data};
  }
}

export default class ExternalServices {
  constructor(category) {
    ////Removed as per instructions
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }

  //updated per instructions
  async getData(category) {
    // return fetch(this.path)
    //   .then(convertToJson)
    //   .then((data) => data);
    const response = await fetch(baseURL + `products/search/${category}`)
    const data = await convertToJson(response);
    //console.log("3333333333333333",data)
    return data.Result;
  }
  //updated per instructions
  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
    const response = await fetch(baseURL+ `product/${id}`)
    const data =  await convertToJson(response)
    //console.log("444444444444444",data,"\n555555555555555555555555",data.Result)
    return data.Result;
  }

  async checkout(payload){
    const options = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    }
    return await fetch(baseURL +"checkout/", options).then(convertToJson(options))


  }

}
