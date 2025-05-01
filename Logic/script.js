var cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("destinations-container");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cart-count");

// Update cart count across all pages
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Call this function on every page load
updateCartCount();

// ✅ Destination cards render function
function renderDestinations(data) {
  container.innerHTML = "";
  data.forEach(dest => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${dest.image}" />
      <div class="card-content">
        <h3>${dest.title}</h3>
        <p>${dest.location}</p>
        <p>${dest.duration}</p>
        <p>$${dest.price}</p>
        <button onclick="addToCart(${dest.id})">Book Now</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ✅ Add to Cart
function addToCart(id) {
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Use the new function instead
    alert("Added to cart!");
  } else {
    alert("Already in cart");
  }
}

// ✅ Remove from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// ✅ Load Cart Content (if on cart.html)
function cartConent() {
  let cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  // Check if cart is empty
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-message">
        <h3>Your cart is empty</h3>
        <p>You haven't added any destinations to your cart yet.</p>
        <a href="destinations.html" class="btn primary-btn">Browse Destinations</a>
      </div>
    `;
    return;
  }

  let totalPrice = 0;

  cart.forEach(id => {
    const des = destinationsData.find(d => d.id === id);
    if (!des) return;

    // Add to total price
    totalPrice += Number(des.price);

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${des.image}" />
      <div class="cart-item-content">
        <div class="cart-item-details">
          <h3>${des.title}</h3>
          <p>${des.location}</p>
          <p>${des.duration}</p>
          <button onclick="removeFromCart(${id})">Remove</button>
        </div>
        <div class="cart-item-price">
          $${des.price}
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Add total price section after all items
  const summarySection = document.querySelector('.cart-summary');
  if (summarySection) {
    // Create total element if it doesn't exist
    if (!document.querySelector('.cart-total')) {
      const totalElement = document.createElement('div');
      totalElement.className = 'cart-total';
      totalElement.innerHTML = `Total: $${totalPrice}`;
      summarySection.insertBefore(totalElement, summarySection.firstChild);
    } else {
      document.querySelector('.cart-total').innerHTML = `Total: $${totalPrice}`;
    }
  }
}

// Determine the current page
const currentPage = window.location.pathname.split("/").pop();

// ✅ If on destination page
if (container && searchInput) {
  searchInput.addEventListener("input", e => {
    const val = e.target.value.toLowerCase();
    const filtered = destinationsData.filter(d =>
      d.title.toLowerCase().includes(val) ||
      d.location.toLowerCase().includes(val) ||
      d.description.toLowerCase().includes(val)
    );
    renderDestinations(filtered);
  });

  // Show only 6 destinations on the home page, all destinations on the destinations page
  if (currentPage === "index.html") {
    renderDestinations(destinationsData.slice(0, 6));
  } else if (currentPage === "destinations.html") {
    renderDestinations(destinationsData);
  }
}

// ✅ If on cart page
if (document.getElementById("cart-items")) {
  cartConent();
}
