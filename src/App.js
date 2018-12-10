import React from 'react'
import { createSelector } from 'reselect'
import api from './services/api'
import Selector from './components/Selector'

/* View - view handling */
const AppView = ({
  loading,
  error,
  bases,
  quotes,
  base,
  quote,
  onSelect,
  onRequestStats
}) => {
  if (loading) return <p>Loading...</p>

  if (error) return <p>'Error!'</p>

  return (
    <div>
      <Selector
        name={'base'}
        dataKey={'base_currency'}
        onSelect={onSelect}
        options={bases}/>
      <Selector
        name={'quote'}
        dataKey={'quote_currency'}
        onSelect={onSelect}
        options={quotes}/>
      <button
        type="button"
        disabled={!base || !quote}
        onClick={() => onRequestStats(base, quote)}>
        Show Stats
        </button>
    </div>
  )
}

/* Presenter - data and state management */
const withDataFetching = Component => class App extends React.Component {
  constructor() {
    super()

    this.state = {
      domain: {
        onRequestStats: this.getStats.bind(this),
        onSelect: this.onSelect.bind(this)
      },
      ui: {
        loading: false,
        error: null,
        bases: [],
        quotes: [],
        base: null,
        quote: null
      },
      data: {
        products: [],
        stats: []
      }
    }
  }

  componentDidMount() {
    this.getProducts()
  }

  /* State Selector */
  selectProducts = payload => payload.products

  selectStats = state => state.data.stats

  selectBases = state => state.ui.bases

  selectQuotes = state => state.ui.quotes

  selectBaseFromProducts = createSelector(
    this.selectProducts,
    products => [...new Set(products.map(p => p.base_currency))]
  )

  selectQuotesByBase = base => createSelector(
    this.selectProducts,
    products => products
      .filter(p => p.base_currency === base)
      .map(p => p.quote_currency)
  )

  /* State Handlers */
  onLoading = (callback, ...params) => this.setState({
    ui: {
      ...this.state.ui,
      loading: true
    }
  }, () => callback(...params))

  onProductsSuccess = (products = []) => {
    this.setState({
      ui: {
        ...this.state.ui,
        loading: false,
        error: null,
        bases: this.selectBaseFromProducts({ products }),
        base: products[0].base_currency
      },
      data: {
        ...this.state.data,
        products
      }
    }, () => this.setDefaultQuote(this.state.ui.bases[0]))
  }

  onError = error => this.setState({
    ui: {
      ...this.state.ui,
      error,
      loading: false
    }
  })

  onStatsSuccess = stats => this.setState({
    stats,
    ui: {
      ...this.state.ui,
      loading: false
    }
  })

  setDefaultQuote = (base) => {
    const quotes = this.selectQuotesByBase(base)(this.state.data)

    this.setState({
      ui: {
        ...this.state.ui,
        quotes,
        quote: quotes[0]
      }
    })
  }

  onSelect = ({ target }) => {
    const { name, value } = target
    this.setState({
      ui: {
        ...this.state.ui,
        [name]: value
      }
    }, () => {
      if (name === 'base') {
        this.setDefaultQuote(value)
      }
    })
  }

  /* Actions */
  getProducts = () => this.onLoading(api.getProducts, this.onProductsSuccess, this.onError)

  getStats = (base, quote) => {
    const params = `${base}-${quote}`

    this.onLoading(api.getStats, params, this.onStatsSuccess, this.onError)
  }

  render() {
    return <Component { ...this.state.ui } { ...this.state.domain } />
  }
}

export default withDataFetching(AppView)
