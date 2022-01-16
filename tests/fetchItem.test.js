require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica-se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it(`Verifica-se a função fetchItem é chamada com o argumento 'MLB1615760527'`, async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled()
  });

  it('Verifica-se a APi do Mercado Livre está sendo consultada na function fetchItem', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Verificando se fetchItem retorna o resultado esperado', async () => {
    const consulta = await fetchItem('MLB1615760527');
    expect(consulta).toEqual(item);
  })
});
