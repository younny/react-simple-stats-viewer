# react-simple-stats-viewer [![Build Status](https://travis-ci.org/younny/react-simple-stats-viewer.svg?branch=master)](https://travis-ci.org/younny/react-simple-stats-viewer)

This project is simply for viewing digital assets trading data provided by [Coinbase API](https://docs.pro.coinbase.com/#get-products). It  has simple selectors component to filter products by base/quote currencies and get 24 stats data for selected base/quote pair.

* Key Features
    - Uses [Coinbase API](https://docs.pro.coinbase.com/#get-products)
    - Show availble base/quote currencies among products list from coinbase API.
    - Show 24 stats of selected base-quote pair.
    
 -------------------------------------------------------------------------------   

 Install
 
    npm install // or yarn install
 
 Run
    
    npm start // or yarn start


 Test
 
    npm run test:unit // or yarn run test:unit



------------------------------------------------------------------------------- 

## Todo
 
 - Setup tests for reselect
 - Setup Flow type checker
 - More features? module separation (e.g redux/saga)
 - Improve table layout
