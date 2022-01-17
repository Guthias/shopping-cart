const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Verifica-se getSavedCartItems com argumentos chama o metodo localStorage.setItem', () => {
    expect(saveCartItems('<ol><li>Item</li></ol>')).toHaveBeenCalled(localStorage.setItem());
  });
  fail('Teste vazio');
});
