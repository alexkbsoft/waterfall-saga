/* eslint-disable no-undef */

import { PureComponent } from 'react'

type Props = {
  renderComponent: ({}) => React$Node,
}

export default class Pure extends PureComponent<Props> {
    render() {
        const { renderComponent, ...rest } = this.props
        return renderComponent(rest)
    }
}
