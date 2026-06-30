import axios from './axios';

export const getProjects = async () => {
  const response = await axios.get('/projects');
  return response.data.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(`/projects/${id}`);
  return response.data.data;
};

export const createProject = async (projectData) => {
  const response = await axios.post('/projects', projectData);
  return response.data.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`/projects/${id}`, projectData);
  return response.data.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`/projects/${id}`);
  return response.data; // Delete response might not have a data field, just a message
};

export const uploadProjectPdf = async (id, formData) => {
  const response = await axios.post(`/projects/${id}/upload-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const deleteProjectPdf = async (id) => {
  const response = await axios.delete(`/projects/${id}/documentation`);
  return response.data.data;
};
