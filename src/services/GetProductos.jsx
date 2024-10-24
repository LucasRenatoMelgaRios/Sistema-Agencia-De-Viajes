import axios from 'axios';

const API_URL = 'https://671845d0b910c6a6e02b83d8.mockapi.io/dashboard/productos';

export const GetProductos = async (page = 1, limit = 8) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        page,
        limit,
      }
    });

    // Intenta obtener el total de productos desde los headers, si está disponible
    const totalItemsFromHeaders = response.headers['x-total-count'];

    // Si el total de items no viene en los headers, haz una llamada adicional para obtener el número total
    const totalItems = totalItemsFromHeaders || (await obtenerTotalProductos());

    return {
      data: response.data,
      total: totalItems
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Función para obtener el número total de productos si no está en los headers
export const obtenerTotalProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.length; // Asumiendo que el endpoint te da todos los productos en una sola respuesta
  } catch (error) {
    console.error('Error fetching total products:', error);
    throw error;
  }
};