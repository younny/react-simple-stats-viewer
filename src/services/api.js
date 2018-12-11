/* eslint-env browser */
/* eslint no-alert: 0 */

import axios from 'axios'

const BASE_URL = ' https://api.pro.coinbase.com'

/* Show error alert */
const showAlert = ({ data, status }) => {
  window.alert(
    `status: ${status}\n${JSON.stringify(data)}`
  )
}

/*
 Coinbase API services
*/

const getProducts = (onSuccess, onError) => axios.get(`${BASE_URL}/products`)
  .then(({ data }) => onSuccess(data))
  .catch(({ response }) => onError(response))

const getStats = (query, onSuccess, onError) => axios.get(`${BASE_URL}/products/${query.product_id}/stats`)
  .then(({ data }) => onSuccess(data))
  .catch(({ response }) => {
    showAlert(response)
    onError(response)
  })

export default {
  getProducts,
  getStats
}
