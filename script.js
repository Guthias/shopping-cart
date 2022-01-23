const body = document.getElementById('body');
const productArea = document.getElementById('product-area');
const cartArea = document.getElementById('cart-area');
const cartPrice = document.getElementById('total-price');
const clearCart = document.getElementById('clear-cart');
const searchInput = document.getElementById('search-input');
const toggleCartButton = document.getElementById('toggle-cart');
const cartContainer = document.getElementById('cart-container');

let cartItems = [];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item-image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCustomEventElement(element, className, text, event) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = text;
  e.addEventListener('click', event);
  return e;
}

const refreshCartPrice = () => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.salePrice, 0);
  cartPrice.innerText = totalPrice.toFixed(2); 
};

function deleteItemFromCart(event) {
  let cartItem = event.target.parentElement;
  while (cartItem.className !== 'cart-item') {
    cartItem = cartItem.parentElement;
  }
  const productID = cartItem.querySelector('.cart-product-id').innerText;
  
  const item = cartItems.find(({ sku }) => sku === productID);
  const itemIndex = cartItems.indexOf(item);
  cartItems.splice(itemIndex, 1);
  saveCartItems(cartItems);
  refreshCartPrice();
  cartItem.remove();
}

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const cartItem = document.createElement('li');
  cartItem.className = 'cart-item';
  const image = document.createElement('img');
  image.className = 'cart-image';
  image.src = thumbnail;
  cartItem.appendChild(image);
  cartItem.innerHTML += `<div class="cart-product-info-area">
   <span class="cart-product-name">${name}</span>
   <div class="cart-product-row"><span class="cart-product-price">R$ ${salePrice.toFixed(2)}</span>
   </div><div class="cart-product-id">${sku}</div></div>`;
  const deleteCartItem = document.createElement('div');
  deleteCartItem.className = 'cart-delete-product';
  deleteCartItem.innerHTML = '<i class="material-icons">delete</i>';
  deleteCartItem.addEventListener('click', deleteItemFromCart);
  cartItem.appendChild(deleteCartItem);
  return cartItem;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item-sku').innerText;
}

const getProductDetails = async (productID) => {
  const response = await fetchItem(productID);

  return {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
    thumbnail: response.thumbnail,
  };
};

async function addProductToCart(event) {
  const productID = getSkuFromProductItem(event.target.parentElement);
  const productDetails = await getProductDetails(productID);
  cartItems.push(productDetails);
  await refreshCartPrice();
  saveCartItems(cartItems);
  cartArea.appendChild(createCartItemElement(productDetails));
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item-border';

  const productItem = document.createElement('div');
  productItem.className = 'item';
  
  productItem.appendChild(createCustomElement('span', 'item-sku', sku));
  productItem.appendChild(createProductImageElement(image));
  productItem.appendChild(createCustomElement('span', 'item-title', name));
  productItem.appendChild(createCustomElement('span', 'item-price', `R$ ${price}`));
  section.appendChild(productItem);
  productItem.appendChild(
    createCustomEventElement('button', 'item-add', 'Adicionar ao carrinho', addProductToCart),
  );

  return section;
}

async function getGoodQualityPicture(productID) {
  const response = await fetchItem(productID);
  return response.pictures[0].url;
}

async function getProductsInfo(query) {
  const { results } = await fetchProducts(query);

  const pictureArray = results.map(({ id }) => getGoodQualityPicture(id));
  const pictures = await Promise.all(pictureArray);

  return results.map((result, index) => ({ 
    sku: result.id,
    name: result.title,
    image: pictures[index],
    price: result.price.toFixed(2),
  }));
}

function removeLoading() {
  document.getElementById('loading').remove();
}

async function createItemList(query) {
  const products = await getProductsInfo(query);
  products.forEach((product) => {
    productArea.appendChild(createProductItemElement(product));
  });
  removeLoading();
}

const loadSavedCart = () => {
  const savedItems = getSavedCartItems();
  if (!savedItems) return;
  cartItems = JSON.parse(savedItems); // Atualizando registro local do carrinho
  cartItems.forEach((item) => cartArea.appendChild(createCartItemElement(item)));
  refreshCartPrice();
};

const removeAllProductsFromCart = () => {
  // Source: https://medium.com/front-end-weekly/remove-all-children-of-the-node-in-javascript-968ad8f120eb
  cartArea.querySelectorAll('*').forEach((element) => element.remove());
  cartItems = [];
  refreshCartPrice();
  saveCartItems(cartItems);
};

function showLoading() {
  const element = document.createElement('div');
  element.id = 'loading';
  element.className = 'loading';
  element.innerHTML = `<div class="line"></div>
  <div class="line"></div>
  <div class="line"></div>`;
  body.appendChild(element);
}

function removeProducts() {
  productArea.querySelectorAll('.item-border').forEach((element) => element.remove());
}

function loadProducts(query) {
  showLoading();
  removeProducts();
  createItemList(query);
}

function searchProductInput(event) {
  if (event.key !== 'Enter') return;
  const inputText = encodeURIComponent(event.target.value);
  loadProducts(inputText);
}

function toggleCart() {
  cartContainer.classList.toggle('hidden');
}

toggleCartButton.addEventListener('click', toggleCart);
clearCart.addEventListener('click', removeAllProductsFromCart);
searchInput.addEventListener('keyup', searchProductInput);

window.onload = () => {
  loadProducts('computador');
  loadSavedCart();
};
