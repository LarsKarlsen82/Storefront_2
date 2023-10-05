import {getProductCategories} from "./modules/model/dummyjasonLib.js";
import { updateCartBadge, updateTotalPriceInCart, addToCart, updateCartDisplay, initCartButtons, basket } from './modules/model/cart.js';
import { categoriesCallBack } from './modules/model/kategori.js';
import { displayProducts } from './modules/model/productModule.js';


let categoriesDisplayElement='categoriesNav';
let productDisplayElement='productDisplay';

initApp();



function initApp(){
// just to get things started ... happy coding :)

    getProductCategories().then((categories)=>{
      
       console.log(categories);
            // Call the categories callback if available
            if (window._viewCallBacks && window._viewCallBacks.categoriesCallBack) {
            window._viewCallBacks.categoriesCallBack(categories);
        }
    })
    .catch((error) => {
        // Handle errors
        console.error("Error fetching categories:", error);
        // Log the error and handle it as needed

    });
    
}

function productCardCallback(productData) {
    // Handle product data here
    console.log("Product card callback:", productData);
}

function getAllProducts(myLimit, mySkip) {
    return new Promise((resolve, reject) => {
        // Validate myLimit and mySkip
        if (!Number.isInteger(myLimit) || !Number.isInteger(mySkip) || myLimit <= 0 || mySkip < 0) {
            const error = new Error("Invalid limit or skip values");
            console.error(error);
            reject(error);
        } else {
            // Simulate an asynchronous API call to fetch products
            setTimeout(() => {
                // Fetch products based on myLimit and mySkip logic
                // For example, use an API call like fetch(`/api/products?limit=${myLimit}&skip=${mySkip}`)
                // Simulated response data
                const products = []; // Store fetched products here

                // Resolve the promise with the fetched products
                resolve(products);
            }, 1000); // Simulating a delay of 1 second for the API call
        }
    });
}

// Example usage of getAllProducts function
const myLimit = 20;
const mySkip = 20;

getAllProducts(myLimit, mySkip)
    .then((products) => {
        console.log("Fetched products:", products);
        // Call the callback function with the fetched products
        productCardCallback(products);
    })
    .catch((error) => {
        // Handle errors here
        console.error("Error fetching products:", error);
        // Log the error and handle it as needed
    });

// Store the callbacks in the window object
window._viewCallBacks = { categoriesCallBack, productCardCallback };