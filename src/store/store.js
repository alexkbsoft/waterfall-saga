import Emitter from '../helpers/emitter'

export default class Store {
    state = {}
    constructor(providerComponent, initialState, middlewareConstructor) {
        this.state = { ...initialState, ...this.state }
        this.component = providerComponent
        this.emitter = new Emitter()

        const middlewareAPI = {
            getState: this.getState,
            dispatch: (...args) => this.dispatch(...args),
        }

        this.sagaMiddleware = middlewareConstructor(middlewareAPI)(() => {})
    }

    dispatch = param => {
        const { component } = this

        if (param.type === 'SET_STATE') {
            let { state } = this
            state = { ...state, ...param.payload }
            this.state = state

            component.setState(state)
            return
        }

        this.sagaMiddleware(param)
    }

    getState = () => this.state

    sendAction = action => {
        if (!action.type || !action.payload) {
            throw new Error('Неверный формат экшона для waterfall-saga')
        }

        this.sagaMiddleware(action)
    }
}
