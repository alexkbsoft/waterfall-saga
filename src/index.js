/* eslint-disable no-unused-vars */

import React from 'react'

import createProvider from './components/provider'
import connect from './helpers/connect'

export default function createStore(config, saga) {
    const Provider = createProvider(config.initialState, saga)

    return { Provider, connect }
}
