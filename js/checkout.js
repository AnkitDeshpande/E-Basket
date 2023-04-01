let nameEl = document.getElementById("fname")
let lastname = document.getElementById("lname")
let streetEl = document.querySelector(".street")
let cityEl = document.getElementById("city")
let StateEl = document.querySelector(".State")
let zipEl = document.querySelector(".zip")
let cardnoEl = document.getElementById("card_no")
let expEl = document.getElementById("exp")
let cvvEl = document.getElementById("cvv")
let proceedbtn = document.querySelector(".proceed")
let phoneEl = document.getElementById("phone")
let form = document.querySelector("form")
let enterbtn = document.getElementById("enter")
// console.log(proceedbtn)
document.querySelector("#otp").style.display = "none"
let data = JSON.parse(localStorage.getItem("checkoutdetails"));
if(data === null){
    data = [];
}

form.addEventListener("submit", (e) => {
e.preventDefault()
    let obj = {
        name: nameEl.value,
        last : lastname.value,
        street : streetEl.value,
        city : cityEl.value,
        state : StateEl.value,
        zip : zipEl.value,
        cardno : cardnoEl.value,
        exp : expEl.value,
        cvv : cvvEl.value,
        phone : phoneEl.value
    }

    if(nameEl.value=="" || lastname.value=="" ||streetEl.value=="" || cityEl.value=="" || StateEl.value=="" || zipEl.value=="" || cardnoEl.value=="" || expEl.value=="" || cvvEl.value=="" || phoneEl.value==""){
        alert("Please enter your correct details")
    }
    else{

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your payment was successfull',
                showConfirmButton: false,
                timer: 3000
              })
              setTimeout(() => {
                window.location.href="./liked.html"
            }, 2000)
          
    }
   
    data.push(obj)
    localStorage.setItem("checkoutdetails", JSON.stringify(data))
   
})

   let cartbtn = document.querySelector(".cart")

   cartbtn.addEventListener("click", () =>{
    window.location.href="./liked.html"
   })

  