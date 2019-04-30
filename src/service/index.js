import axios from 'axios';

// user
export const login = (data) => axios.post('/api/user/login', { data });

export const register = (data) => axios.post('/api/user/register', { data });

export const logout = () => axios.get('/api/user/logout');

export const getUserInfo = () => axios.get('/api/user/info');

export const editInfo = (data) => axios.post('/api/user/edit', { data });

export const changePwd = (data) => axios.post('/api/user/changePwd', { data });



// pic
export const getPicList = (params) => axios.get('/api/pic/picList', { params });

export const deletePic = (params) => axios.get('/api/pic/deletePic', { params });

export const getPicTag = (params) => axios.get('/api/pic/tag', { params });

export const getAlbumList = (params) => axios.get('/api/pic/albumList', { params });

export const createAlbum = (data) => axios.post('/api/pic/create', { data });

export const upload = (data) => axios.post('/api/pic/upload', { data }, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});