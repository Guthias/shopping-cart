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
  
  it('Verifica-se a API do Mercado Livre está sendo consultada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('Verifica-se está sendo retornado o Objeto esperado', async () => {
    const consulta = await fetchProducts('computador');
    expect(consulta).toBe(computadorSearch);
  })
});
