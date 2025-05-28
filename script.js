document.addEventListener('DOMContentLoaded', function () {
  const cartCountEl = document.getElementById('cart-count');
  const cartSection = document.getElementById('cart-section');
  const cartMessagePlaceholder = document.getElementById('cart-message-placeholder');
  const cartEmptyPicture = document.getElementById('cart-empty-icon');
  const carbonNeutralMessage = document.getElementById('carbon-neutral-phrase');

  let cart = {};

  function resetAllProductUI() {
  document.querySelectorAll('.product').forEach(product => {
    const addToCartBtn = product.querySelector('.add-to-cart-button');
    const regulateQtyBtn = product.querySelector('.regulate-product-quantity');
    const quantitySpan = product.querySelector('.product-quantity');
    const productPicture = product.querySelector('picture');

    if (addToCartBtn) addToCartBtn.classList.remove('d-none');
    if (regulateQtyBtn) regulateQtyBtn.classList.add('d-none');
    if (quantitySpan) quantitySpan.textContent = '1';
    if (productPicture) productPicture.classList.remove('picture-border');
  });
}


  // Create and append Confirm Order button ONCE 
  const confirmOrderBtn = document.createElement('button');
  confirmOrderBtn.id = 'confirm-order-button';
  confirmOrderBtn.textContent = 'Confirm Order';
  confirmOrderBtn.style.background = 'red';
  confirmOrderBtn.style.color = 'white';
  confirmOrderBtn.style.border = 'none';
  confirmOrderBtn.style.borderRadius = '32px';
  confirmOrderBtn.style.padding = '10px 24px';
  confirmOrderBtn.style.marginTop = '10px';
  confirmOrderBtn.style.display = 'none'; // hidden initially
  cartSection.appendChild(confirmOrderBtn);

  confirmOrderBtn.addEventListener('click', function () {
    // Clear cart and update User Interface
    const orderedItems = Object.entries(cart).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      price: data.price,
      total: (data.quantity * data.price).toFixed(2)
    }));
    const orderTotal = orderedItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);

    cart = {};
    updateCartCount();
    updateCartDisplay();
    toggleCartEmptyPicture(0);
    displayTotalPrice();
    resetAllProductUI();

    // Remove any existing popup
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) existingPopup.remove();

    // Create popup
    const popup = document.createElement('div');
    popup.className = 'popup';

    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    const img = document.createElement('img');
    img.src = 'assets/images/icon-order-confirmed.svg';
    img.alt = 'order confirmed icon';

    const h2 = document.createElement('h2');
    const checkOutMessage = document.createElement('p');
    checkOutMessage.textContent = 'We hope you enjoy your food!';
    h2.textContent = 'Order Confirmed';


    // Order details
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'order-details';
    if (orderedItems.length) {
      const ul = document.createElement('ul');
      ul.style.paddingLeft = '5px';
      ul.style.textAlign = 'left';
      orderedItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong> &mdash; ${item.quantity} x $${item.price} = $${item.total}`;
        ul.appendChild(li);
      });
      detailsContainer.appendChild(ul);

      const totalDiv = document.createElement('div');
      totalDiv.style.fontWeight = 'bold';
      totalDiv.style.marginTop = '10px';
      totalDiv.textContent = `Total: $${orderTotal}`;
      detailsContainer.appendChild(totalDiv);
    } else {
      detailsContainer.innerHTML = '<div>No items ordered.</div>';
    }
    const details = document.createElement('div');
    details.style.margin = '16px 0';

    // Helper to get image src for a product name
    function getProductImageSrc(productName) {
      // Try to find the product element by name
      const productEl = Array.from(document.querySelectorAll('.product')).find(
      el => el.querySelector('.product-name') && el.querySelector('.product-name').textContent === productName
      );
      if (productEl) {
      // Try to get the <img> inside <picture>
      const imgEl = productEl.querySelector('picture img');
      if (imgEl) return imgEl.src;
      }
      // fallback image
      return 'assets/images/default-product-image.svg';
    }

    details.innerHTML = orderedItems.length
      ? `<ul style="padding:10px; text-align:left; display:flex; flex-direction:column; gap:5px; background-color:#FDF6E4;">
      ${orderedItems.map(item =>
      `<li style="list-style:none; margin:0; display:flex; align-items:center; gap:8px; ">
        <div style="display:flex; justify-content:space-evenly; align-items:center; width:100%;">
        <img src="${getProductImageSrc(item.name)}" alt="${item.name}" style="width:32px; height:32px; object-fit:cover; border-radius:8px; border:1px solid #eee;">
        <div style="margin-left:8px;">
          <strong>${item.name}</strong>
          <span style="display:block; color:gray;">${item.quantity}x  &nbsp $${item.price}</span>
        </div>
        <div style="margin-left:auto; font-weight:bold;">$${item.total}</div>
        </div>
        

      </li>
      <hr style="border: none; height: 0.5px; background-color: lightgray;">`
      ).join('')}
      </ul>
      <div style="font-weight:bold; margin-top:10px;">Total: $${orderTotal}</div>`
      : '<div>No items ordered.</div>';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-popup-button';
    closeBtn.textContent = 'start new order';
    closeBtn.addEventListener('click', () => popup.remove());

    popupContent.append(img, h2, details, closeBtn);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
  });

  function updateCart(name, quantity, price, productElement) {
    if (quantity === 0) {
      delete cart[name];
      if (productElement) {
        const productPicture = productElement.querySelector('picture');
        if (productPicture) {
          productPicture.classList.remove('picture-border');
        }
      }
    } else {
      cart[name] = { quantity, price };
    }

    updateCartCount();
    updateCartDisplay();
    displayTotalPrice();
    toggleCartEmptyPicture(Object.keys(cart).length);
  }

  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartMessagePlaceholder.style.display = totalItems > 0 ? 'none' : 'block';
  }

  function toggleCartEmptyPicture(cartItemCount) {
    if (cartEmptyPicture) {
      cartEmptyPicture.classList.toggle('d-none', cartItemCount > 0);
    }
  }

  function createCartItemElement(name, quantity, unitPrice) {
    const total = (unitPrice * quantity).toFixed(2);

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item my-2';

    const row = document.createElement('div');
    row.className = 'd-flex justify-content-between align-items-center';

    const textEl = document.createElement('div');
    textEl.textContent = `${name} ${quantity}x @$${unitPrice} $${total}`;

    const imgEl = Object.assign(document.createElement('img'), {
      src: 'assets/images/icon-remove-item.svg',
      alt: name,
      className: 'cart-item-image',
      style:
        'cursor:pointer; padding:5px; border:1px solid hsl(7, 20%, 60%); border-radius:50%; object-fit: contain;',
    });

    row.append(textEl, imgEl);

    const hrEl = document.createElement('hr');
    hrEl.className = 'my-2';

    itemEl.append(row, hrEl);
    return itemEl;
  }


  function updateCartDisplay() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((el) => el.remove());

    for (const [name, data] of Object.entries(cart)) {
      const itemEl = createCartItemElement(name, data.quantity, data.price);

      // Modify itemEl to display name on a separate line
      const nameDiv = document.createElement('div');
      nameDiv.textContent = name;
      nameDiv.style.fontWeight = 'bold';

      const detailsDiv = document.createElement('div');
      // Add a space between quantity and price
      detailsDiv.innerHTML = `<span style="color:brown"> ${data.quantity}x</span>&nbsp;&nbsp;&nbsp;@&nbsp;&nbsp;&nbsp;$${data.price}&nbsp;&nbsp;&nbsp;$${(data.quantity * data.price).toFixed(2)}`;


      // Find the row inside itemEl and replace its text content
      const row = itemEl.querySelector('.d-flex');
      if (row) {
        // Remove the old text node (first child)
        row.firstChild && row.removeChild(row.firstChild);
        // Insert name and details
        const textContainer = document.createElement('div');
        textContainer.appendChild(nameDiv);
        textContainer.appendChild(detailsDiv);
        row.insertBefore(textContainer, row.firstChild);
      }
      cartSection.insertBefore(itemEl, cartMessagePlaceholder.nextSibling);
    }
  }

  function displayTotalPrice() {
    const existingTotalEl = document.getElementById('cart-total-display');
    if (existingTotalEl) {
      existingTotalEl.remove();
    }

    const total = Object.values(cart)
      .reduce((sum, item) => sum + item.quantity * item.price, 0)
      .toFixed(2);

    const totalContainer = document.createElement('div');
    totalContainer.id = 'cart-total-display';
    totalContainer.className = 'd-flex justify-content-evenly align-items-center my-3';

    const label = document.createElement('span');
    label.textContent = 'Order total';

    const totalAmount = document.createElement('h1');
    totalAmount.textContent = `$${total}`;
    totalAmount.classList.add('m-0');

    totalContainer.append(label, totalAmount);
    cartSection.appendChild(totalContainer);

    // Toggle carbon neutral message
    if (carbonNeutralMessage) {
      if (Object.keys(cart).length > 0) {
        carbonNeutralMessage.classList.remove('d-none');
        cartSection.appendChild(carbonNeutralMessage);
      } else {
        carbonNeutralMessage.classList.add('d-none');
      }
    }

    /*
    function showAllAddToCartButtons() {
      document.querySelectorAll('.regulate-product-quantity').forEach(btn => {
        btn.classList.add('d-none');
      });
    }  
    */

    // Show/hide confirm order button
    confirmOrderBtn.style.display = Object.keys(cart).length > 0 ? 'block' : 'none';
  }

  cartSection.addEventListener('click', function (event) {
    showAllAddToCartButtons();
    if (event.target.classList.contains('cart-item-image')) {
      const itemName = event.target.alt;
      delete cart[itemName];
      updateCartCount();
      updateCartDisplay();
      toggleCartEmptyPicture(Object.keys(cart).length);
      displayTotalPrice();

      // Remove border from product
      const productElements = document.querySelectorAll('.product');
      productElements.forEach(product => {
        const productNameElement = product.querySelector('.product-name');
        if (productNameElement && productNameElement.textContent === itemName) {
          const productPicture = product.querySelector('picture');
          if (productPicture) {
            productPicture.classList.remove('picture-border');
          }
        }
      });
    }
  });

  document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    button.addEventListener('click', function () {
      const product = this.closest('.product');
      const name = product.querySelector('.product-name').textContent;
      const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
      const quantityEl = product.querySelector('.product-quantity');
      const quantity = parseInt(quantityEl.textContent);

      updateCart(name, quantity, price, product);
      this.classList.add('d-none');
      product.querySelector('.regulate-product-quantity').classList.remove('d-none');
      product.querySelector('picture').classList.add('picture-border');
    });
  });

  document.querySelectorAll('.regulate-product-quantity').forEach((container) => {
    const product = container.closest('.product');
    const name = product.querySelector('.product-name').textContent;
    const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
    const quantityEl = container.querySelector('.product-quantity');
    const decrementBtn = container.querySelector('img[alt="subtract item"]');
    const incrementBtn = container.querySelector('img[alt="add item"]');

    incrementBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityEl.textContent);
      quantity++;
      quantityEl.textContent = quantity;
      updateCart(name, quantity, price, product);
    }); 

    decrementBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityEl.textContent);
      if (quantity > 1) {
        quantity--;
        quantityEl.textContent = quantity;
        updateCart(name, quantity, price, product);
      } else {
        updateCart(name, 0, price, product);
        container.classList.add('d-none');
        product.querySelector('.add-to-cart-button').classList.remove('d-none');
      }
    });
  });

  // Initial state
  toggleCartEmptyPicture(0);
  if (carbonNeutralMessage) {
    carbonNeutralMessage.classList.add('d-none');
  }
});
