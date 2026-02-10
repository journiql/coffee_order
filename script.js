// Coffee menu data
const menu = [
    { name: "Espresso", price: 2.50 },
    { name: "Latte", price: 3.50 },
    { name: "Cappuccino", price: 3.00 },
    { name: "Americano with salt", price: 2.00 },
    { name: "Mocha", price: 4.00 },
    { name: "this makes you poo", price: 100.00 },
    { name: "Need to toilet 5000", price: 5000.00 },
    { name: "Laxatives", price: 2.00 }
];

// Order state
let order = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const orderItems = document.getElementById('orderItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const modal = document.createElement('div');
modal.className = 'modal';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    document.body.appendChild(modal);
    checkoutBtn.addEventListener('click', handleCheckout);
});

// Render menu items
function renderMenu() {
    menuGrid.innerHTML = '';
    menu.forEach((coffee, index) => {
        const item = document.createElement('div');
        item.className = 'menu-item';
        item.innerHTML = `
            <h3>${coffee.name}</h3>
            <div class="price">$${coffee.price.toFixed(2)}</div>
            <button onclick="addToOrder(${index})">Add to Order</button>
        `;
        menuGrid.appendChild(item);
    });
}

// Add item to order
function addToOrder(index) {
    const coffee = menu[index];
    order.push(coffee);
    updateOrderDisplay();
}

// Remove item from order
function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderDisplay();
}

// Update order display
function updateOrderDisplay() {
    orderItems.innerHTML = '';
    
    if (order.length === 0) {
        orderItems.innerHTML = '<p class="empty-message">No items in order :0</p>';
        checkoutBtn.disabled = true;
        totalPrice.textContent = '$0.00';
        return;
    }

    checkoutBtn.disabled = false;

    order.forEach((coffee, index) => {
        const item = document.createElement('div');
        item.className = 'order-item';
        item.innerHTML = `
            <div class="order-item-info">
                <div class="order-item-name">${coffee.name}</div>
                <div class="order-item-price">$${coffee.price.toFixed(2)}</div>
            </div>
            <button class="order-item-remove" onclick="removeFromOrder(${index})">Remove</button>
        `;
        orderItems.appendChild(item);
    });

    updateTotal();
}

// Calculate and display total
function updateTotal() {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Confirm Order</h2>
            <p>You're about to pay $${total.toFixed(2)} for ${order.length} item(s).</p>
            <p>You sure you wanna pay up? 💸</p>
            <div class="modal-buttons">
                <button class="confirm-btn" onclick="confirmCheckout()">Yes, take my money!</button>
                <button class="cancel-btn" onclick="cancelCheckout()">No way, I'm out!</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Confirm checkout
function confirmCheckout() {
    const total = order.reduce((sum, item) => sum + item.price, 0);
    
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Thanks for your money, you sucker! 🎉</h2>
            <p>You just spent $${total.toFixed(2)} on coffee!</p>
            <div class="modal-buttons">
                <button class="confirm-btn" onclick="closeModal()">Great, let's do this again!</button>
            </div>
        </div>
    `;
    
    order = [];
    updateOrderDisplay();
    
    setTimeout(() => {
        closeModal();
    }, 3000);
}

// Cancel checkout
function cancelCheckout() {
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Order cancelled!</h2>
            <p>What a LOSER! 😄</p>
            <div class="modal-buttons">
                <button class="cancel-btn" onclick="closeModal()">Okay, I'll be back...</button>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

