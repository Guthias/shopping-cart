const fetchItem = async (itemID) => {
  const url = `https://api.mercadolibre.com/items/${itemID}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

fetchItem('MLB1341706310');
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
