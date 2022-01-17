const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica-se saveCartItems com argumentos chama o metodo localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Verifica-se saveCartItems ao receber uma String salva exatamente o conteudo recebido', () => {
    const content = '<ol><li>Item</li></ol>';
    saveCartItems(content);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', content);
  });
});
