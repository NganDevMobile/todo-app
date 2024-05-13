import { API_METHODS } from 'models';
import { isNetworkConnected } from 'utils/helper';
import { API } from './apiHandler';

export default async function serviceAdapter<T, reqParams>(
  method: API_METHODS,
  url: string,
  requestParam?: reqParams,
): Promise<T> {
  const status = await isNetworkConnected();
  if (status) {
    if (method.toString() === API_METHODS.GET) {
      return API.getAPIService(url);
    } else if (method.toString() === API_METHODS.DELETE) {
      return API.deleteAPIService(url, requestParam);
    } else if (method.toString() === API_METHODS.PUT) {
      return API.putAPIService(url, requestParam);
    } else if (method.toString() === API_METHODS.POST) {
      return API.postAPIService(url, requestParam);
    } else {
      return Promise.reject('REST METHOD NOT EXITSt');
    }
  } else {
    return Promise.reject(Error('Please check you internet connectivity.'));
  }
}
