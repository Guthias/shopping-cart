const productArea = document.getElementById('product-area');
const cartArea = document.getElementById('cart-area');

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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function addProductToCart(event) {
  const productID = getSkuFromProductItem(event.target.parentElement);
  console.log(productID);
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

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getProductsInfo() {
  const { results } = await fetchProducts('computador');
  
  return results.reduce((acc, result) => {
    acc.push({
      sku: result.id,
      name: result.title,
      image: result.thumbnail });
    return acc;
  }, []);
}

async function createItemList() {
  const products = await getProductsInfo();
  products.forEach((product) => {
    productArea.appendChild(createProductItemElement(product));
  });
}

window.onload = () => {
  createItemList();
};
