// services/Users/GetUsuarios.js
import axios from 'axios';

export const GetUsuarios = async () => {
  try {
    // Solicita los usuarios y ordénalos por 'id' descendente para que los más recientes aparezcan primero
    const response = await axios.get('https://67194f637fc4c5ff8f4d2969.mockapi.io/viajes/usuarios', {
      params: {
        sortBy: 'id',
        order: 'desc', // Si tu API lo permite, puedes utilizar 'order' para asegurarte que los nuevos aparezcan primero
      }
    });

    // Devolvemos los datos tal cual los recibimos
    return {
      data: response.data,  // Lista completa de usuarios
      total: response.data.length // Total calculado manualmente basado en la longitud de los datos
    };
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};


// export const GetUsuarios = async (page = 1, limit = 8) => {
//   try {
//     const response = await axios.get(`https://67194f637fc4c5ff8f4d2969.mockapi.io/viajes/usuarios`, {
//       params: {
//         page: page,
//         limit: limit
//       }
//     });

//     // Verifica si `x-total-count` está presente en los headers
//     const total = response.headers['x-total-count'] ? parseInt(response.headers['x-total-count'], 10) : null;

//     // Si no se encuentra en los headers, calcula el total manualmente
//     if (!total) {
//       const allData = await axios.get('https://67194f637fc4c5ff8f4d2969.mockapi.io/viajes/usuarios');
//       return {
//         data: response.data,  // Lista paginada de usuarios
//         total: allData.data.length  // Total calculado manualmente
//       };
//     }

//     return {
//       data: response.data,  // Lista paginada de usuarios
//       total: total  // Total devuelto desde los headers
//     };
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);
//     throw error;
//   }
// };


