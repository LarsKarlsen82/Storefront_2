let basket = [];

// Update the cart badge with the total number of items in the cart
function updateCartBadge() {
    const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = totalItems;
    }

    cartButton.addEventListener('click', () => {
    // Toggle the 'hidden' class on cartItemsElement
    cartItemsElement.classList.toggle('hidden');

    // If cart is visible, update the cart content
    if (!cartItemsElement.classList.contains('hidden')) {
        // Clear existing content in the cart items element
        cartItemsElement.innerHTML = '';

        // Iterate through the basket and add items to the cart
        basket.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.product.title} - Antal: ${item.quantity}`;
            cartItemsElement.appendChild(cartItem);
        });
            // Update the total price when the cart is opened
            updateTotalPriceInCart();}
    });
        function calculateTotalPrice() {
            return basket.reduce((total, item) => total + item.product.price * item.quantity, 0);
        }

function updateTotalPriceInCart() {
    const totalPrice = calculateTotalPrice();
    const totalItem = document.createElement('div');
    totalItem.textContent = `Total Price: DKK ${totalPrice.toFixed(2)}`;
    totalItem.style.fontWeight = 'bold';

    // Først fjern den tidligere viste totalpris, hvis der er nogen
    const existingTotalItem = document.getElementById('totalPrice');
    if (existingTotalItem) {
        existingTotalItem.remove();
    }

    // Tilføj den nye totalpris til kurven
    totalItem.id = 'totalPrice'; // Tilføj en unik id for at lette fjernelsen senere, hvis nødvendigt
    cartItemsElement.appendChild(totalItem);
}


// Close cart by clicking outside or clearing cart
function addToCart(product, quantityToAdd) {
   
    // Find the product in the basket
    const productIndex = basket.findIndex(item => item.product.title === product.title);

    // If the product is in the basket, update its quantity by adding the new quantity
    if (productIndex !== -1) {
        basket[productIndex].quantity += quantityToAdd;
    } else {
        // If the product is not in the basket, add it with the specified quantity
        basket.push({ product, quantity: quantityToAdd });
    }

    // Update the cart badge and cart items display
    updateCartBadge();
    updateCartDisplay();
}

// Close cart by clicking outside or clearing cart
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; // Clear existing content

    let totalPrice = 0; // Initialize total price


    // Iterate through the basket and add items to the cart
    basket.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.product.title} - Antal: ${item.quantity}`;
        cartItemsElement.appendChild(cartItem);

                // Add item price to total price
        totalPrice += item.product.price * item.quantity;
    });

        // Display total price at the end of the cart items
        const totalItem = document.createElement('div');
        totalItem.textContent = `Total Price: DKK ${totalPrice.toFixed(2)}`;
        totalItem.style.fontWeight = 'bold'; // Set the font weight to bold
        cartItemsElement.appendChild(totalItem);
}

const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault(); // Prevent the default button behavior
        const productTitle = button.dataset.title; // Assuming product title is stored in a data attribute
        const product = products.find(product => product.title === productTitle);

        // Check if the button is disabled
        if (!button.disabled) {
            addToCart(product); // Add the product to the cart
            button.disabled = true; // Disable the button to prevent multiple clicks
            button.textContent = 'Lagt i kurv'; // Change button text
            button.style.color = 'green'; // Set text color to green
        }
    });
});

function initCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productTitle = button.dataset.title;
            const product = products.find(product => product.title === productTitle);

            if (!button.disabled) {
                addToCart(product, 1);
                button.disabled = true;
                button.textContent = 'Lagt i kurv';
                button.style.color = 'green';
            }
        });
    });
}

export {
    basket,
    updateCartBadge,
    updateTotalPriceInCart,
    addToCart,
    updateCartDisplay,
    initCartButtons
};
