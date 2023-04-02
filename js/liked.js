let productData = JSON.parse(localStorage.getItem("cart")) || [];
let WishlistData = JSON.parse(localStorage.getItem("wish-list")) || []

    let container = document.querySelector(".product-container");

    
    displayProduct(productData)
    
    function displayProduct(productData){
        container.innerHTML = "";

        let total = document.getElementById("totalprice")
        let count = document.getElementById("totalItem")
        let itemprice = document.getElementById("totalitem")

        productData.forEach((element, index) => {
        let cardlist = document.createElement("div");
        cardlist.setAttribute("class", "card-list");
      
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("data-id", element.id);
      
        let cardImage = document.createElement("div");
        cardImage.classList.add("card_img");
      
        let img = document.createElement("img");
        img.src = element.images[0];
        img.setAttribute("alt", "food");
      
        cardImage.append(img);
      
        let cardbody = document.createElement("div");
        cardbody.classList.add("class", "card_body");
      
        let cardTitle = document.createElement("h2");
        cardTitle.classList.add("card_item", "card_title");
        cardTitle.innerText = element.brand;

        let cardDesc = document.createElement("p");
        cardDesc.classList.add("card_desc", "card_descrip");
        cardDesc.innerText = element.description;

        cardbody.append(cardTitle);
        cardbody.append(cardDesc)
      
        let cardprice = document.createElement("div");
        cardprice.classList.add("card_itemprice", "card_price");
        cardprice.innerText = "$ " + element.price;

        let carddiscount = document.createElement("div");
        carddiscount.classList.add("card_dis", "card_dis");
        carddiscount.innerText = `${element.discountPercentage}% OFF` ;

        let deletebtn = document.createElement("button")
        deletebtn.classList.add("card_remove", "card_removebtn");
        deletebtn.textContent = "Remove";

       
        deletebtn.addEventListener("click", (e) => {
            e.preventDefault()
            productData.splice(index, 1)
            displayProduct(productData) 
           localStorage.setItem("cart", JSON.stringify(productData))  
            
         })
     
     let likebtn = document.createElement("button");
        likebtn.classList.add("card_like", "card_likebtn");
        likebtn.innerText = "Add to Watchlist"

        likebtn.addEventListener("click", () => {
        WishlistData.push(element)
         localStorage.setItem("wish-list", JSON.stringify(WishlistData))
         alert("Product Added To Watchlist")
      })


   
     card.append(cardImage)
     card.append(cardbody)
     card.append(cardprice)
     card.append(carddiscount)
     card.append(likebtn)
    card.append(deletebtn)
     cardlist.append(card)
     container.append(cardlist)
     
     document.querySelector(".btn").style.display = "none"
 });

let sum = 0;
let sum2 = 0;
let subtotal = 0
for(let i=0; i<productData.length; i++){
    sum2 += productData[i].price
    sum += Math.floor(sum2/productData[i].discountPercentage)
    subtotal = sum2-sum
}
total.textContent = subtotal;
itemprice.textContent = sum2;
count.textContent = productData.length;

if(productData == ""){
    document.querySelector(".total").style.display = "none";
    document.querySelector(".btn").style.display= "block"
}
}
  