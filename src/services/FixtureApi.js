export default {
  getProducts: () => ({
    response: {
      data: require('../fixtures/products.json'),
      status: 200,
      statusText: 'OK',
      header: {},
      config: {}
    }
  }),
  get24Stats: () => ({
    response: {
      data: require('../fixtures/stats.json'),
      status: 200,
      statusText: 'OK',
      header: {},
      config: {}
    }
  })
}
