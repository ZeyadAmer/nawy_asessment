import axios from 'axios';

const API_URL = 'http://localhost:8080';  // Replace with your backend URL

export const apartmentService = {

    getAllApartments: async (page: number) => {
        try {
          const response = await axios.get(`${API_URL}/apartments?page=${page}`);
          return response;
        } catch (error) {
          throw error;
        }
      },
    getAllUsers: async () => {
        try {
          const response = await axios.get(`${API_URL}/apartments/users`);
          return response;
        } catch (error) {
          throw error;
        }
      },


  getApartmentById: async (apartmentId: number) => {
    try {
      const response = await axios.get(`${API_URL}/apartments/${apartmentId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getApartmentByName: async (apartmentId: string) => {
    try {
      const response = await axios.get(`${API_URL}/apartments/by-name/${apartmentId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createApartment: async (apartmentData: any) => {
    try {
      const response = await axios.post(`${API_URL}/apartments`, apartmentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateApartment: async (apartmentId: number, apartmentData: any) => {
    try {
      const response = await axios.put(`${API_URL}/apartments/${apartmentId}`, apartmentData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteApartment: async (apartmentId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/apartments/${apartmentId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
