const body = document.getElementById('body');
const productArea = document.getElementById('product-area');
const cartArea = document.getElementById('cart-area');
const cartPrice = document.getElementById('total-price');
const clearCart = document.getElementById('clear-cart');

let cartItems = [];

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
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
  cartPrice.innerText = totalPrice; 
};

function cartItemClickListener(event) {
  const item = cartItems.find(({ sku, name, salePrice }) => 
    `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}` === event.target.innerText);
  const itemIndex = cartItems.indexOf(item);
  cartItems.splice(itemIndex, 1);
  saveCartItems(cartItems);
  refreshCartPrice();
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getProductDetails = async (productID) => {
  const response = await fetchItem(productID);

  return {
    sku: response.id,
    name: response.title,
    salePrice: response.price };
};

async function addProductToCart(event) {
  const productID = getSkuFromProductItem(event.target.parentElement);
  const productDetails = await getProductDetails(productID);
  cartItems.push(productDetails);
  await refreshCartPrice();
  saveCartItems(cartItems);
  cartArea.appendChild(createCartItemElement(productDetails));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomEventElement('button', 'item__add', 'Adicionar ao carrinho!', addProductToCart),
  );
  // section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function getGoodQualityPicture(productID) {
  const response = await fetchItem(productID);
  return response.pictures[0].url;
}

async function getProductsInfo() {
  const { results } = await fetchProducts('computador');

  const pictureArray = results.map(({ id }) => getGoodQualityPicture(id));
  const pictures = await Promise.all(pictureArray);

  return results.map((result, index) => ({ 
    sku: result.id,
    name: result.title,
    image: pictures[index], 
  }));
}

function removeLoading() {
  document.getElementById('loading').remove();
}

async function createItemList() {
  const products = await getProductsInfo();
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
  element.innerText = 'Carregando...';
  body.appendChild(element);
}

clearCart.addEventListener('click', removeAllProductsFromCart);

window.onload = () => {
  showLoading();
  createItemList();
  loadSavedCart();
};
