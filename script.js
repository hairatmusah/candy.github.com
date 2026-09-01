
// ==========================================
// AYISHA COSMETICS - SHOPPING CART
// ==========================================


// GET SAVED CART

let cart =
    JSON.parse(
        localStorage.getItem("ayishaCart")
    ) || [];


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "ayishaCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// ADD PRODUCT
// ==========================================

function addToCart(name, price, image) {

    const existingProduct =
        cart.find(
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


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    const cartTotal =
        document.getElementById(
            "cart-total"
        );


    // If the page doesn't have a cart,
    // stop here.

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    let total = 0;

    let itemCount = 0;


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some beautiful products
                    to your cart.
                </p>

                <a
                    href="index.html#products"
                    class="shop-btn"
                >
                    Continue Shopping
                </a>

            </div>

        `;

    }


    // PRODUCTS

    cart.forEach(
        (item, index) => {

            total +=
                item.price *
                item.quantity;


            itemCount +=
                item.quantity;


            cartItems.innerHTML += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            GH₵ ${item.price}
                        </p>


                        <div
                            class="quantity"
                        >

                            <button
                                onclick="changeQuantity(
                                    ${index},
                                    -1
                                )"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                onclick="changeQuantity(
                                    ${index},
                                    1
                                )"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove"
                            onclick="removeItem(
                                ${index}
                            )"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }
    );


    // CART COUNT

    if (cartCount) {

        cartCount.textContent =
            itemCount;

    }


    // CART TOTAL

    if (cartTotal) {

        cartTotal.textContent =
            "GH₵ " +
            total.toFixed(2);

    }

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(
    index,
    amount
) {

    cart[index].quantity +=
        amount;


    // Remove if quantity becomes zero

    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeItem(index) {

    cart.splice(
        index,
        1
    );


    saveCart();

    updateCart();

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    const cartBox =
        document.getElementById(
            "cart"
        );


    if (cartBox) {

        cartBox.classList.add(
            "open"
        );

    }

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    const cartBox =
        document.getElementById(
            "cart"
        );


    if (cartBox) {

        cartBox.classList.remove(
            "open"
        );

    }

}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const searchInput =
        document.getElementById(
            "search"
        );


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value
        .toLowerCase();


    const products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(
        product => {

            const name =
                product.dataset.name
                .toLowerCase();


            if (
                name.includes(search)
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterProducts(
    category
) {

    const products =
        document.querySelectorAll(
            ".product"
        );


    products.forEach(
        product => {

            if (
                category === "all" ||
                product.dataset.category ===
                category
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


// ==========================================
// START WEBSITE
// ==========================================

updateCart();
