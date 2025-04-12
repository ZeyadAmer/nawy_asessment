import axios from 'axios';

const API_URL = 'http://localhost:8080';  // Replace with your backend URL

export const projectService = {
  getProjectById: async (projectId: number) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getAllProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getApartmentsByProjectId: async (projectId:number,page: number) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}/apartments?page=${page}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  createProject: async (projectData: any) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (projectId: number, projectData: any) => {
    try {
      const response = await axios.put(`${API_URL}/projects/${projectId}`, projectData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (projectId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/projects/${projectId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
