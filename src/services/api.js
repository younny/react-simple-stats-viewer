import axios from 'axios'

const BASE_URL = ' https://api.pro.coinbase.com'

/*
 Coinbase API services
*/

const getProducts = (onSuccess, onError) => axios.get(`${BASE_URL}/products`)
  .then(response => onSuccess(response.data))
  .catch((error) => {
    console.log(error)
    onError(error)
  })

const getStats = (query, onSuccess, onError) => axios.get(`${BASE_URL}/${query.product_id}/stats`)
  .then(response => onSuccess(response.data))
  .catch(onError)

export default {
  getProducts,
  getStats
}
