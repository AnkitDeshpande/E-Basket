let WishlistData = JSON.parse(localStorage.getItem("wish-list")) || []
let productData = JSON.parse(localStorage.getItem("cart")) || []

    let container = document.querySelector(".product-container");
    displayProduct(WishlistData)
    
    function displayProduct(WishlistData){
        container.innerHTML = "";

        WishlistData.forEach((element, index) => {
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

       
        deletebtn.addEventListener("click", () => {
        WishlistData.splice(index, 1)
        displayProduct(WishlistData)
       localStorage.setItem("wish-list", JSON.stringify(WishlistData))     
     })
     
     let cartbtn = document.createElement("button");
     cartbtn.classList.add("card_cart", "card_cartbtn");
     cartbtn.innerText = "Add to Cart"

     cartbtn.addEventListener("click", () => {
        productData.push(element)
         localStorage.setItem("cart", JSON.stringify(productData))
         alert("Product Added To Cart")
      })
   
     card.append(cardImage)
     card.append(cardbody)
     card.append(cardprice)
     card.append(carddiscount)
     card.append(cartbtn)
    card.append(deletebtn)
     cardlist.append(card)
     container.append(cardlist)
 });
}

   