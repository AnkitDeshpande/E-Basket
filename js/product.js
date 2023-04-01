// const baseDataUrl = `http://localhost:3000/products`

// console.log(baseDataUrl)
let mainSection = document.getElementById("product-data")


// window.addEventListener("load", (e) => {
//     fetchItems(1);
// });

let globalData = []
let WishlistData = JSON.parse(localStorage.getItem("wish-list")) || []
let productData = JSON.parse(localStorage.getItem("cart")) || []
let pag = document.getElementById("pagination");

let len = 0

fetchData()
async function fetchData(){
    try {
        let res = await fetch(`http://localhost:3000/products`);
        let data = await res.json();
        data.forEach(element => {
            globalData.push(element);
        });
        displaydata(globalData)
       
    } catch (error) {
        console.log(error);
    }
}
console.log(globalData);

// async function fetchItems(page) {
//     try {
//         let res = await fetch(
//             `http://localhost:3000/products?_limit=6&_page=${page}`
//         );
//         let data = await res.json();
//         console.log(data);

//         len = globalData.length;
//         let btns = Math.ceil(len / 6);
//         displaydata(data);

//         pag.innerHTML = null;
//         for (let i = 1; i <= btns; i++) {
//             pag.append(createBtn(i));
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// -----------------Appenging Cards-----------------

function displaydata(request){

mainSection.innerHTML="";

    request.forEach(element => {
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

        let cartbtn = document.createElement("button");
        cartbtn.classList.add("card_cart", "card_cartbtn");
        cartbtn.innerText = "Add to Cart"

        cartbtn.addEventListener("click", () => {
            if(checkDuplicate(element)){
                alert("Product Already in Cart")
            }
           else{ productData.push({...element, quantity:1})
            localStorage.setItem("cart", JSON.stringify(productData))
            alert("Product Added To Cart")
           }
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
        card.append(cartbtn)
        card.append(likebtn)

        cardlist.append(card)
        mainSection.append(cardlist)
       });
}
function checkDuplicate(element){
    for(let i=0; i<productData.length; i++){
    if(productData[i].id === element.id){
      return true;
    }
  }
  return false;
  }
// -----------------Sorting Cards-----------------

document.getElementById('sorting').addEventListener('change', (e)=>{
    // console.log("ok")
    if(sorting.value === "default"){
    displaydata(globalData)
    }else if(sorting.value === "sort-low-to-high"){

    let sorted = globalData.sort((a,b)=>a.price-b.price);
    // len = sorted.length;
    // let btns = Math.ceil(len / 6);
    // console.log(btns);
    
    // pag.innerHTML = null;
    // mainSection.innerHTML=""
    // for (let i = 1; i <= btns; i++) {
    //     pag.append(createBtn(i));
    // }
    displaydata(sorted)

    }else{
        let sorted = globalData.sort((a, b) => b.price - a.price);
           displaydata(sorted)   
    }  
   
})




// function createBtn(i) {
//     let btn = document.createElement("button");
//     btn.innerText = i;
//     btn.className = "PageBtn";
//     btn.addEventListener("click", (e) => {
//         fetchItems(i);
//     });
//     return btn;
// }