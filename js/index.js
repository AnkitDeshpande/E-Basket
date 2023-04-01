let arr = [
    "./ebay_pic/slidepick1 (1).png",
    "./ebay_pic/slidepick1 (2).png",
    "./ebay_pic/slidepick1 (3).png",
    "./ebay_pic/slidepick1 (4).png"  
]

let div = document.getElementById("slidbox1")
let img = document.createElement("img")

let i = 0; 

//slideShow Effect 
function slidShow (){
img.src = arr[i];
div.append(img)
   // set timeOut  evry 5 sec 
   setInterval(function(){

   if(i==arr.length ){
     i = 0
   }
     img.src = arr[i]
     console.log(i);
     i = i + 1;
     div.append(img)
   },2000)
}
slidShow()