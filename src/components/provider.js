/* eslint-disable no-undef */

import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import createSagaMiddleware from 'redux-saga';

import CurrentContext from '../store/current-context'
import Store from '../store/store'

export default (initialState, rootSaga) => {
    class EnhancedProvider extends Component {
        constructor() {
            super()

            const sagaMiddleware = createSagaMiddleware()


            this.state = initialState
            this.store = new Store(this, initialState, sagaMiddleware)

            CurrentContext.context = createContext()
            sagaMiddleware.run(rootSaga)
        }

        render() {
            const { Provider } = CurrentContext.context
            const { emit, subscribe } = this.store.emitter
            const { sendAction } = this.store

            return (
                <Provider value={ { ...this.state, emit, subscribe, sendAction } }>
                    {this.props.children}
                </Provider>
            )
        }
    }

    EnhancedProvider.propTypes = {
        initialState: PropTypes.object,
        middlewares: PropTypes.arrayOf(PropTypes.object),
        children: PropTypes.node
    }

    return EnhancedProvider;
}
