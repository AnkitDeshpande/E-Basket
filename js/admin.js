// Inputs
const itemNameInput = document.getElementById("item-name");
const itemImageInput = document.getElementById("item-image");
const itemDeptInput = document.getElementById("item-dept");
const itemPriceInput = document.getElementById("item-price");

const updateItemIdInput = document.getElementById("update-item-id");
const updateItemNameInput = document.getElementById("update-item-name");
const updateItemImageInput = document.getElementById("update-item-image");
const updateItemDeptInput = document.getElementById("update-item-dept");
const updateItemPriceInput = document.getElementById("update-item-price");

const updateScoreItemIdInput = document.getElementById("update-score-item-id");
const updateScoreItemPriceInput = document.getElementById(
    "update-score-item-price"
);

// Buttons
const addItemButton = document.getElementById("add-item");
const updateItemButton = document.getElementById("update-item");
const updateScoreItemButton = document.getElementById("update-score-item");
const sortLowToHighButton = document.getElementById("sort-low-to-high");
const sortHighToLowButton = document.getElementById("sort-high-to-low");
const filterLessThan1KButton = document.getElementById("filter-less-than-1L");
const filterMoreThanOrEqual1KButton = document.getElementById(
    "filter-more-than-equal-1L"
);
let pag = document.getElementById("pagination");

let content = document.querySelector(".content");
let items = [];
let len = 0;

window.addEventListener("load", (e) => {
    total();
    fetchItems(1);
});

async function total() {
    let res = await fetch(`http://localhost:3000/products`);
    let data = await res.json();
    console.log(data);
    items = data;
}

async function fetchItems(page) {
    try {
        let res = await fetch(
            `http://localhost:3000/products?_limit=6&_page=${page}`
        );
        let data = await res.json();
        console.log(data);

        len = items.length;
        let btns = Math.ceil(len / 6);
        display(data);

        pag.innerHTML = null;
        for (let i = 1; i <= btns; i++) {
            pag.append(createBtn(i));
        }
    } catch (error) {
        console.log(error);
    }
}

function display(data) {
    content.innerHTML = "";
    data.forEach((e) => {
        let imagesHTML = "";
        if (e.images && e.images.length > 0) {
            imagesHTML = `<img src="${e.images[0]}">`;
        }
        content.innerHTML += `<div class="card">
                    ${imagesHTML}
                    <h3>${e.title}</h3>
                    <h4>$${e.price}</h4>
                    <h4>${e.category}</h4>
                    <h4> ID : ${e.id}</h4>
                    <button data-id="${e.id}" class="deletebtn">Delete</button>
                </div>`;
    });
    const deleteButtons = document.querySelectorAll(".card button");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // TODO: Call a function to delete the item with the given ID
            // console.log(button.dataset.id);
            deleteCard(button.dataset.id);
        });
    });
}

//DELETE

async function deleteCard(id) {
    try {
        let res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });
        let updated = await res.json();
        console.log(updated);
        display(updated);
    } catch (error) {
        console.log(error);
    }
    });
}

//post
addItemButton.addEventListener("click", async (e) => {
    try {
        let res = await fetch(`http://localhost:3000/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: itemNameInput.value,
                images: [itemImageInput.value],
                category: itemDeptInput.value,
                price: itemPriceInput.value,
            }),
        });
        let data = await res.json();
        display(data);
    } catch (error) {
        console.log(error);
    }
});

//patch
updateItemButton.addEventListener("click", async (e) => {
    try {
        id = updateItemIdInput.value;
        let res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: updateItemNameInput.value,
                images: [updateItemImageInput.value],
                category: updateItemDeptInput.value,
                price: updateItemPriceInput.value,
            }),
        });
        let data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
});

//put
updateScoreItemButton.addEventListener("click", async (e) => {
    try {
        id = updateScoreItemIdInput.value;
        let res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                price: updateScoreItemPriceInput.value,
            }),
        });
        let data = await res.json();
        console.log(data);
        display(data);
    } catch (error) {
        console.log(error);
    }
});

// sorting
sortLowToHighButton.addEventListener("click", async (e) => {
    let sorted = items.sort((a, b) => a.price - b.price);
    len = sorted.length;
    let btns = Math.ceil(len / 6);
    console.log(btns);

    display(sorted);

    pag.innerHTML = null;
    for (let i = 1; i <= btns; i++) {
        pag.append(createBtn(i));
    }
    display(sorted);
});
sortHighToLowButton.addEventListener("click", async (e) => {
    let sorted = items.sort((a, b) => b.price - a.price);
    display(sorted);
});

// filtering
filterLessThan1KButton.addEventListener("click", async (e) => {
    let filtered = items.filter((e) => e.price < 1000);
    display(filtered);
});
filterMoreThanOrEqual1KButton.addEventListener("click", async (e) => {
    let filtered = items.filter((e) => e.price >= 1000);
    display(filtered);
});

function createBtn(i) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "PageBtn";
    btn.addEventListener("click", (e) => {
        fetchItems(i);
    });
    return btn;
}

let srchInp = document.getElementById("searchbox");
document.getElementById("srchbtn").addEventListener("click", () => {
    let searchParams = srchInp.value;
    let searched = items.filter((element) => {
        if (
            element.title &&
            element.title.toUpperCase().includes(searchParams.toUpperCase())
        ) {
            return true;
        } else {
            return false;
        }
    });
    display(searched);
});
