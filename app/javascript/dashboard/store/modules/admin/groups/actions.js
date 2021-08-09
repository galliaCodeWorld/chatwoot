import types from '../../../mutation-types'
import ApiClient from '../../../../api/ApiClient.js'

const apiVersion = 'v3'
const resource = 'admin/groups'

const actions = {
  ////////////////// with Api  ///////////////////////////
  get: (context, id) => {
    return new Promise((resolve, reject) => {
      id 
      ? new ApiClient(resource, {apiVersion}).show(id)
          .then(res => {
            if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
            res.data.data ? resolve(JSON.parse(res.data.data)) : resolve()
          }) 
          .catch(err => {
            context.commit(types.SET_ERROR, err);
            reject(err)
          })
      : new ApiClient(resource, {apiVersion}).get()
          .then(res => {
            if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
            else if (res.data.data) context.commit(types.admin.groups.get, JSON.parse(res.data.data));
            resolve()
          })
          .catch(err => {
            context.commit(types.SET_ERROR, err);
            reject(err)
          })
    })
  },
  update: (context, {id, formData}) => {
    return new Promise((resolve, reject) => {
      id
      ? new ApiClient(resource, {apiVersion}).update(id, formData)
          .then(res => {
            if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
            resolve()
          })
          .catch(err => {
            context.commit(types.SET_ERROR, err);
            reject(err)
          })
      : new ApiClient(resource, {apiVersion}).create(formData)
        .then(res => {
          if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
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
          if (res.data.msg) context.commit(types.SET_ERROR, res.data.msg)
          resolve()
        })
        .catch(err => {
          context.commit(types.SET_ERROR, err);
          reject(err)
        })
      : resolve()
    })
  },
  ///////////////////////  without Api /////////////////////////
  editID: async (context, id) => {
    context.commit(types.admin.groups.editID, id);
  },
};

export default actions;