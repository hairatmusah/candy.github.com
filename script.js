let cart = JSON.parse(localStorage.getItem("ayishaCart")) || [];


// ADD PRODUCT TO CART

function addToCart(name, price, image) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    saveCart();

    updateCart();

    openCart();

}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "ayishaCart",
        JSON.stringify(cart)
    );

}


// UPDATE CART

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        GH₵ ${item.price}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        ${item.quantity}

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <span
                        class="remove"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </span>

                </div>

            </div>

        `;

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "GH₵ " + total.toFixed(2);

}


// CHANGE QUANTITY

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}


// OPEN CART

function openCart() {

    document
        .getElementById("cart")
        .classList.add("open");

}


// CLOSE CART

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("open");

}


// SEARCH

function searchProducts() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product
            .dataset
            .name
            .toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// CATEGORY FILTER

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// START CART

updateCart();
