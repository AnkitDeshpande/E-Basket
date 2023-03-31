let productData = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.querySelector(".product-container");

    
    function displayProduct(productData){
        container.innerHTML = "";

    let total = document.getElementById("totalprice") 
     let count = document.getElementById("totalItem")

    productData.forEach((element, index) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
     image.src = element.image;

     let brand =  document.createElement("h3");
     brand.innerText = element.brands;

     let size = document.createElement("p")
      size.textContent = "Size:- "+element.size;

      let price = document.createElement("h4")
      price.textContent = "$"+element.price;

    let deletebtn = document.createElement("button")
    deletebtn.textContent = "Remove";

       
    deletebtn.addEventListener("click", (ele) => {
        productData.splice(ele, 1)
        displayProduct(productData)
       localStorage.setItem("cart", JSON.stringify(productData))     
     })
     
    card.append(image, brand, size, price, deletebtn )
    container.append(card);

    document.querySelector(".btn").style.display= "none"
 });
let sum = 0;
for(let i=0; i<productData.length; i++){
    sum += productData[i].price;
}
total.textContent = sum;
count.textContent = productData.length;


if(productData == ""){
    document.querySelector(".total").style.display = "none";
    document.querySelector(".btn").style.display= "block"
}
}

    displayProduct(productData)