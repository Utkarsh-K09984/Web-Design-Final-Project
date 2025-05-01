// cart.js

let cart = [];

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `Total: $${totalPrice}`;
    cartContainer.appendChild(totalElement);
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// Example usage
// addToCart({ id: 1, name: 'Destination 1', price: 100 });
// addToCart({ id: 2, name: 'Destination 2', price: 150 });