// 1. Data Source
const products = [
    { id: 101, name: "Echo Dot (5th Gen)", price: 49.99, img: "https://via.placeholder.com/150" },
    { id: 102, name: "Kindle Paperwhite", price: 139.99, img: "https://via.placeholder.com/150" },
    { id: 103, name: "Fire TV Stick 4K", price: 29.99, img: "https://via.placeholder.com/150" },
    { id: 104, name: "Sony Noise Canceling Headphones", price: 348.00, img: "https://via.placeholder.com/150" }
];

let cart = [];

// 2. Select Elements
const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');

// 3. Render Products to Page
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
            <img src="${product.img}" alt="${product.name}" class="w-full h-40 object-contain mb-4">
            <h3 class="font-bold text-gray-700 h-12 overflow-hidden">${product.name}</h3>
            <p class="text-lg font-bold text-orange-600 my-2">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})" class="bg-yellow-400 hover:bg-yellow-500 text-sm py-2 px-4 rounded transition shadow-sm">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// 4. Add to Cart Logic
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    openCart();
};

// 5. Delete/Remove Logic
window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

// 6. Update UI (Render Cart)
function updateCartUI() {
    // Update Count
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Render Cart Items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between mb-4 bg-gray-50 p-2 rounded">
            <div class="flex flex-col">
                <span class="text-sm font-semibold text-gray-700">${item.name}</span>
                <span class="text-xs text-gray-500">$${item.price} x ${item.quantity}</span>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 text-sm font-bold">
                Delete
            </button>
        </div>
    `).join('');

    // Update Total Price
    const totalMoney = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerText = `$${totalMoney.toFixed(2)}`;
}

// 7. Toggle Sidebar
const openCart = () => cartSidebar.classList.remove('translate-x-full');
const toggleCart = () => cartSidebar.classList.toggle('translate-x-full');

cartIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);

// Initial Load
displayProducts();