# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview
  This was another project on front end developement. Product list with cart is a project that is about building a shopping webpage with cart functionality and in a responsive design manner.
### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](.design/Screenshote.jpeg)



### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- ChatGPT.com


### What I learned

I learnt about setting and reseting. used in the js to make the product items and the carts interactive.
I also learnt how to include html in js by using innerHtml.
when I try using the json file provided, I am sure i would be able to learn some json too.

To see how you can add code snippets, see below:


```js
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
```


### Continued development

As with most of my projects, I would like to continue developing my js DOM manipulation skills.
- Json knowledge.
- Mobile first workflow.

### Useful resources

- [Example resource 1](https://www.chatGpt.com) - This helped me almost all research and refactoring. I really liked this pattern and will use it going forward.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
