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
            context.commit(types.admin.groups.getall, res.data);
            resolve(res.data)
          }) 
          .catch(err => {
            context.commit(types.SET_ERROR, err);
            reject(err)
          })
      : new ApiClient(resource, {apiVersion}).get()
          .then(res => {
            context.commit(types.admin.groups.getone, res.data);
            resolve(res.data)
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
  ///////////////////////  without Api /////////////////////////
  editID: async (context, id) => {
    context.commit(types.admin.groups.editID, id);
  },
};

export default actions;