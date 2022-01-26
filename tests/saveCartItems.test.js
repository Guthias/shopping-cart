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

  it('Verifica-se saveCartItems ao receber um array converte o conteudo para JSON', () => {
    const content = [
      { 
        sku: "MLB1937079157", 
        name: "Pc Computador Cpu Core I5 650 + Ssd 240gb, 8gb Memória Ram",
        salePrice: 1439 
      }, {
        sku: "MLB1607748387",
        name: "Pc Computador Cpu Intel Core I5 + Ssd 240gb, 8gb Memória Ram",
        salePrice: 1720.19 
      }
    ];
    saveCartItems(content);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify(content));
  });
});
