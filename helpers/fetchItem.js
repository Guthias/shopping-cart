const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    if (!itemID) throw new Error('You must provide an URL');

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
