import types from '../../../mutation-types'
import ApiClient from '../../../../api/ApiClient.js'

const apiVersion = 'v4'
const resource = 'admin/tags'

const actions = {
  /////////////////////////////// with Api
  get: (context) => {
    return new Promise((resolve, reject) => {
      new ApiClient(resource, {apiVersion}).get()
        .then(res => {
          if (res.msg) context.commit(types.SET_ERROR, res.msg)
          else if (res.data) context.commit(types.admin.tags.get, JSON.parse(res.data));
          // if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
          // else if (res.data.data) context.commit(types.admin.tags.get, JSON.parse(res.data.data));
          resolve()
        })
        .catch(err => {
          context.commit(types.SET_ERROR, err);
          reject(err)
        })
    })
  },
  /////////////////// none change state && only API //////////////////
  update: (context, {id, formData}) => {
    return new Promise((resolve, reject) => {
      id 
      ? new ApiClient(resource, {apiVersion}).update(id, formData)
          .then(res => {
            if (res.msg) context.commit(types.SET_ERROR, res.msg)
            resolve()
          })
          .catch(err => {
            context.commit(types.SET_ERROR, err);
            reject(err)
          })
      : new ApiClient(resource, {apiVersion}).create(formData)
        .then(res => {
          if (res.msg) context.commit(types.SET_ERROR, res.msg)
          resolve()
        })
        .catch(err => {
          context.commit(types.SET_ERROR, err);
          reject(err)
        })
    })
  },
  delete: (context, id=null) => {
    return new Promise((resolve, reject) => {
      id 
      ? new ApiClient(resource, {apiVersion}).delete(id)
        .then(res => {
          if (res.msg) context.commit(types.SET_ERROR, res.msg)
          resolve()
        })
        .catch(err => {
          context.commit(types.SET_ERROR, err);
          reject(err)
        })
      : resolve()
    })
  },
  /////////////// without Api ////////////////////////////
  editID: async (context, editID) => {
    context.commit(types.admin.tags.editID, editID);
  },
  ////////////////////////////////////////////////
};

export default actions;