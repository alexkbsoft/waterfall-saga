/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EnhancedProvider extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const { Provider } = this.props.provider
        return <Provider />
    }
}

EnhancedProvider.propTypes = {
    provider: PropTypes.node.isRequired,
}
