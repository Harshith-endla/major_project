document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    alert(`Showing products for ${card.textContent}`);
  });
});

document.querySelectorAll(".product-card button").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Product added to cart!");
  });
});

const cart = {
  items: [],
  total: 0,
};

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll(".product-card button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = parseInt(
      productCard
        .querySelector("p")
        .textContent.replace("₹", "")
        .replace(",", "")
    );

    // Add item to the cart
    addItemToCart(productName, productPrice);
  });
});

// Function to add an item to the cart
function addItemToCart(name, price) {
  cart.items.push({ id: Date.now(), name, price });
  cart.total += price;
  updateCartDisplay();
}

// Function to remove an item from the cart
function removeItemFromCart(itemId) {
  const itemIndex = cart.items.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cart.total -= cart.items[itemIndex].price;
    cart.items.splice(itemIndex, 1);
    updateCartDisplay();
  }
}

// Function to update the cart display
function updateCartDisplay() {
  const cartContents = document.getElementById("cart-contents");
  const cartTotalFooter = document.getElementById("cart-total-footer");

  // Update the table contents
  if (cart.items.length === 0) {
    cartContents.innerHTML =
      <tr><td colspan="3">Your cart is empty.</td></tr>'
  } else {
    cartContents.innerHTML = cart.items
      .map(
        (item) => 
        <tr>
          <td>${item.name}</td>
          <td>₹${item.price.toLocaleString()}</td>
          <td><button class="remove-btn" data-id="${
            item.id
          }">Remove</button></td>
        </tr>
      )
      .join("");
  }

  // Update the total
  cartTotalFooter.textContent = `₹${cart.total.toLocaleString()}`;

  // Attach remove button event listeners
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.dataset.id);
      removeItemFromCart(itemId);
    });
  });
}
