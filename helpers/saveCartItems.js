const saveCartItems = (items) => {
  if (typeof items === 'string') {
    localStorage.setItem('cartItems', items);
  } else {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
