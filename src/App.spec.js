/* eslint-env mocha */
import React from 'react'
import axios from 'axios'

import Table from './components/Table'
import api from './services/api'
import App from './App'
import mockProducts from './fixtures/products.json'
import mockStats from './fixtures/stats.json'

describe('Fetch products @ AppView Component', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('calls componentDidMount only once', () => {
    sinon.spy(App.prototype, 'componentDidMount')

    mount(<App/>)

    expect(App.prototype.componentDidMount.calledOnce).to.equal(true)
  })

  it('should update products data after fetching successfully', (done) => {
    const promise = Promise.resolve({ data: mockProducts })
    sandbox.stub(axios, 'get').returns(promise)

    const wrapper = shallow(<App />)

    expect(wrapper.state().data.products).to.have.lengthOf(0)

    expect(wrapper.state().ui.loading).to.equal(true)

    api.getProducts(() => {})
      .then(() => {
        expect(wrapper.state().ui.loading).to.equal(false)

        expect(wrapper.state().data.products).to.equal(mockProducts)

        expect(wrapper.state().ui.base).to.not.equal(null)

        expect(wrapper.state().ui.quote).to.not.equal(null)
      })
      .then(done, done)
  })

  it('should update stats data after fetching successfully', (done) => {
    const promise = Promise.resolve({ data: mockStats })
    sandbox.stub(axios, 'get').returns(promise)

    const query = { product_id: 'BCH-USD' }
    const wrapper = mount(<App />)

    wrapper.find('button').props().onClick()

    expect(wrapper.state().ui.loading).to.equal(true)

    api.getStats(query, () => {})
      .then(() => {
        expect(wrapper.state().ui.loading).to.equal(false)

        const newStats = wrapper.state().data.stats
        expect(newStats).to.equal(mockStats)

        const tableWrappepr = mount(<Table data={newStats} />)
        expect(tableWrappepr.props().data).to.equal(mockStats)
      }).then(done, done)
  })
})
