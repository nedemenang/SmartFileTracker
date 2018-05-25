import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import types from '../types/types';

export const registerUser = (user) => {
    return {
        type: types.REGISTER_USER,
        user
    };
};

export const recieveUserList = () => dispatch => {
    return (dispatch) => {
        axios.get(`/user`)
        .then((response) => {
            dispatch({
                type: types.RECEIVE_USER_LIST,
                payload: response.data.userList
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
};


export const updateUser = (user) => {
    return {
        type: types.UPDATE_USER,
        payload: user,
    };
};

export const loginUser = (user) => {
    return {
      type: types.LOGIN_USER,
      user
    };
  };

export const logOut = () => {
    return (dispatch) => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser(jwt.decode({})));
    };
  };

  export const setCurrentUser = (user) => {
    return {
      type: types.SET_CURRENT_USER,
      payload: user
    };
  };


export const loginAUser = (user) => {
    return (dispatch) => {
        return axios.post('/signin', user)
        .then(
            (response) => {
                localStorage.setItem('jwtToken', response.data.token);
                setAuthorizationToken(response.data.token);
                dispatch(loginUser(response.data.user));
                dispatch(recieveSuccess(response.data.message));
                dispatch(setCurrentUser(jwt.decode(response.data.token)));
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const addDepartment = (department) => {
    return (dispatch) => {
        return axios.post('/department', department)
        .then((response) => {
                dispatch(recieveSuccess(response.data.message));
                dispatch(recieveDepartments());
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const recieveDepartments = () => {
    return (dispatch) => {
        return axios.get('/departments')
        .then((response) => {
            dispatch({
                type: types.RECEIVE_DEPARTMENTS,
                payload: response.data.departments
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
};

export const updateDepartment = (department) => {
    return {
        type: types.UPDATE_DEPARTMENT,
        department,
    };
};

export const addFile = (file) => {
    let data = new FormData()
    data.append('uploadedFile', file.selectedFile);
    data.append('fileNo', file.fileNo);
    data.append('fileName', file.fileName);
    data.append('fileDescription', file.fileDescription);
    data.append('currentDepartment', file.currentDepartment);

    return (dispatch) => {
        return axios.post('/file', data)
        .then(
            (response) => {
                dispatch(recieveSuccess(response.data.message));
                return true;
        })
        .catch((error) => {
                console.log(error.response.data);
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const updateFile = (file) => {
    return {
        type: types.UPDATE_DEPARTMENT,
        file,
    };
};

export const recieveFiles = (files, dispatch) => {
    axios.get(`files`)
        .then((response) => 
            dispatch({
                type: types.RECIEVE_FILES,
                payload: response.data.fileList
            }))
        .catch((error) => 
            dispatch({
                type: types.RECEIVE_ERROR,
                payload: error.response.data.message
            }));
};

export const recieveFilesByDepartment = (department) => {
    return (dispatch) => {
        return axios.get(`/filesByDepartment/${department.departmentId}`)
        .then((response) => {
            dispatch({
                type: types.RECEIVE_FILES_BY_DEPARTMENT,
                payload: response.data.files
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
};

export const recieveFileById = (file) => {
    axios.get(`/file/${file.fileId}`)
        .then((response) => 
            dispatch({
                type: types.RECEIVE_FILE_BY_ID,
                payload: response.data.file
            }))
            .catch((error) => 
                dispatch({
                    type: types.RECEIVE_ERROR,
                    payload: error.response.data.message
                }));
};

export const recieveFileByNo = (file) => {
    axios.get(`/fileByNo/${file.fileNo}`)
        .then((response) => 
            dispatch({
                type: types.RECEIVE_FILE_BY_NO,
                payload: response.data.file
            }))
            .catch((error) => 
                dispatch({
                    type: types.RECEIVE_ERROR,
                    payload: error.response.data.message
                }));
};

export const receiveAuthenticatedUser = (user) => {
    dispatch({
        type: types.RECEIVE_AUTHENTICATED_USER,
        user,
    });
};

export const recieveSuccess = (message) => {
    return {
        type: types.RECEIVE_SUCCESS,
        payload: message
    };
};

export const recieveError = (error) => {
    return {
        type: types.RECEIVE_ERROR,
        payload: error
    };
};

export const addFileNote = (fileNote) => {
    return (dispatch) => {
        return axios.post('/fileNote', fileNote)
        .then(
            (response) => {
                dispatch(recieveSuccess(response.data.message));
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const addFileMovement = (fileMovement) => {
    return (dispatch) => {
        return axios.post('/fileMovement', fileMovement)
        .then(
            (response) => {
                dispatch(recieveSuccess(response.data.message));
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const recieveFileNoteForFile = (file) => {
    axios.get(`/fileMovements/${file.fileId}`)
        .then((response) => 
                dispatch({
                    type: types.RECEIVE_FILE_MOVEMENT_FOR_FILE,
                    payload: response.data.userList
                }))
            .catch((error) => 
                dispatch({
                type: types.RECEIVE_ERROR,
                payload: error.response.data.message 
            }));
};

export const recieveFileMovementForFile = (fileMovement) => {
    axios.get(`/fileNotes/${file.fileId}`)
        .then((response) => 
                dispatch({
                    type: types.RECEIVE_FILE_MOVEMENT_FOR_FILE,
                    payload: response.data.userList
                }))
            .catch((error) => 
                dispatch({
                type: types.RECEIVE_ERROR,
                payload: error.response.data.message 
            }));
};

export const searchFile = (fileSearch) => {
    return {
        type: types.SEARCH_FILE,
        fileSearch,
    };
};

export const selectFile = (selectedFile) => {
    return {
        type: types.SELECT_FILE,
        payload: selectedFile,
    };
};

export const selectUser = (selectedUser) => {
    return {
        type: types.SELECT_USER,
        selectedUser,
    };
};

export const selectDepartment = (selectedDepartment) => {
    return {
        type: types.SELECT_USER,
        selectedDepartment,
    };
};