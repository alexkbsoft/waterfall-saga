/* eslint-disable no-undef */

import React from 'react'
import Pure from '../components/pure'

import CurrentContext from '../store/current-context'

const connect = mapStateToProps => WrappedComponent => {
    const renderComponent = props => <WrappedComponent {...props} />

    class ConnectedComponent extends React.Component {
        selectConsumer = () => {
            if (this.Consumer) {
                return this.Consumer
            }
            const { Consumer } = CurrentContext.context
            this.Consumer = Consumer
            return this.Consumer
        }

        render() {
            const Consumer = this.selectConsumer()
            return (
                <Consumer>
                    {state => {
                        const filteredState = mapStateToProps(state || {})
                        return (
                            <Pure
                                renderComponent={renderComponent}
                                {...this.props}
                                {...filteredState}
                            />
                        )
                    }}
                </Consumer>
            )
        }
    }

    ConnectedComponent.displayName = `Connect(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Unknown'})`

    return ConnectedComponent
}

export default connect
