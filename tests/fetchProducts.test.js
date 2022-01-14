require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica-se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it(`Verifica-se a função fetchProducts é chamada com o argumento 'Computador'`, async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })
  fail('Teste incompleto');
});
