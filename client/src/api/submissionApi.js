import axios from './axios';

export const getSubmissionsByProject = async (projectId) => {
  const response = await axios.get(`/submissions/project/${projectId}`);
  return response.data.data;
};

export const createSubmission = async (formData) => {
  const response = await axios.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const getAllSubmissions = async () => {
  const response = await axios.get('/submissions');
  return response.data.data;
};
