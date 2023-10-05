export function displayProducts(response) {
    // ... (existing code)
    const products = response.products;
    const displayedImages = {}; // Use an object to track displayed images for each category

    // Assuming productDisplayElement is the container where you want to display products
    const productDisplayElement = document.getElementById('productDisplay');

    // Clear existing content
    productDisplayElement.innerHTML = '';

    // Check if products is an array
    if (Array.isArray(products)) {
        // Iterate through products and create product elements
        products.forEach(product => {
            const category = product.category; // Assuming there's a category property in your product data
            displayedImages[category] = displayedImages[category] || 0;

            // Limit the number of displayed images to 3 per category
            if (displayedImages[category] < 3) {
                // Create a container div for the product
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-container'); // Add a class for styling

                // Create product image element
                const productImage = document.createElement('img');
                productImage.src = product.images[0]; // Assuming the first image URL from the product data
                productImage.alt = product.title; // Set alt text for accessibility

                // Create a div for product information
                const productInfoDiv = document.createElement('div');
                productInfoDiv.classList.add('product-info');

                // Create product title element
                const productName = document.createElement('h2');
                productName.textContent = product.title; // Assuming product title property

                // Create product description element
                const productDescription = document.createElement('p');
                productDescription.textContent = product.description; // Assuming product description property

                // Create product price element
                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: DKK ${product.price}`; // Assuming product price property

                // Create buy button
                const buyButton = document.createElement('button');
                buyButton.textContent = 'Køb'; // Text for the buy button
                let quantity = 0; // Initialize quantity to 0
                const productIndex = basket.findIndex(item => item.product.title === product.title);
                if (productIndex !== -1) {
                    // If the product is in the basket, get its quantity
                    quantity = basket[productIndex].quantity + 1;
                }

                buyButton.addEventListener('click', () => {
                    // Check if the product is already in the basket
                    const productIndex = basket.findIndex(item => item.product.title === product.title);

                    if (productIndex !== -1) {
                        // If the product is in the basket, update its quantity
                        basket[productIndex].quantity++;
                    } else {
                        // If the product is not in the basket, add it with quantity 1
                        basket.push({ product, quantity: 1 });
                    }

                    // Update the cart badge and cart items display
                    updateCartBadge();
                    updateCartDisplay();

                    // Change button text and disable it when clicked
                    buyButton.textContent = 'Lagt i kurv';
                    buyButton.disabled = false;
                    buyButton.style.color = 'green'; // Set text color to green

                    console.log(`Added ${product.title} to cart`);
                });

                // Append elements to product container
                productInfoDiv.appendChild(productName);
                productInfoDiv.appendChild(productDescription);
                productInfoDiv.appendChild(productPrice);
                productInfoDiv.appendChild(buyButton);

                productContainer.appendChild(productImage);
                productContainer.appendChild(productInfoDiv);

                // Append product container to the display element
                productDisplayElement.appendChild(productContainer);

                // Increment the count of displayed images for the category
                displayedImages[category]++;
            }
        });
    } // <-- Closing bracket for if (Array.isArray(products))
} // <-- Closing bracket fo