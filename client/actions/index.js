import axios from 'axios';
import jwt from 'jsonwebtoken';
import {persistor} from '../store/store.js'; 
import setAuthorizationToken from '../utils/setAuthorizationToken';
import types from '../types/types';

export const registerUser = (user) => {
    return (dispatch) => {
        return axios.post('/signup', user)
        .then((response) => {
                dispatch(recieveSuccess(response.data.message));
                dispatch(recieveUserList());
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const recieveUserList = (offset=0) => {
    
    return (dispatch) => {
        return axios.get(`/users?offset=${offset}`)
        .then((response) => {
            dispatch({
                type: types.RECEIVE_USER_LIST,
                payload: response.data
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
};


export const deactivateUser = (userItem) => {
    return (dispatch) => {
        return axios.put('/user', userItem)
        .then((response) => {
            dispatch({
                type: types.DEACTIVATE_USER,
                payload: response.data.user
            });
            dispatch(recieveSuccess(response.data.message));
            dispatch(recieveUserList());
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
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
      persistor.purge()
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

export const passwordReset = (user) => {
    return (dispatch) => {
        return axios.put('/passwordreset', user)
        .then((response) => {
                dispatch(recieveSuccess(response.data.message));
                dispatch(logOut())
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

export const updateDepartment = (departmentItem) => {
    return (dispatch) => {
        return axios.put('/department', departmentItem)
        .then((response) => {
            dispatch({
                type: types.UPDATE_DEPARTMENT,
                payload: response.data.department
            });
            console.log(response.data.message);
            dispatch(recieveSuccess(response.data.message));
            dispatch(recieveDepartments());
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
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
    axios.get(`/files`)
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
                dispatch(recieveFileNoteForFile(fileNote.folderId))
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
                dispatch(recieveFileMovementForFile(fileMovement.folderId))
                return true;
        })
        .catch((error) => {
                dispatch(recieveError(error.response.data.message));
        })
    };
};

export const recieveFileNoteForFile = (selectedFileId) => {
    return (dispatch) => {
        return axios.get(`/fileNotes/${selectedFileId}`)
        .then((response) => {
            dispatch({
                type: types.RECIEVE_FILE_NOTE_FOR_FILE,
                payload: response.data.fileNotes
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
};

export const recieveFileMovementForFile = (selectedFileId) => {
    return (dispatch) => {
        return axios.get(`/fileMovements/${selectedFileId}`)
        .then((response) => {
            dispatch({
                type: types.RECEIVE_FILE_MOVEMENT_FOR_FILE,
                payload: response.data.fileMovements
            });
            return true;
          })
          .catch((error) => dispatch({
                    type: types.RECEIVE_ERROR,
                     payload: error
                }));
      };
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