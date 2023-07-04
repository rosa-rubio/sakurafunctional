import axios from 'axios';

export const fetchFilteredCards = async () => {
  try {
    const response = await axios.get(
      'https://6388b6e5a4bb27a7f78f96a5.mockapi.io/sakura-cards'
    );
    const filteredCards = response.data.filter((card) => card.id !== '53' && card.id !== '55');
    return filteredCards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};
