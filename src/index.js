// @flow
/* eslint-disable no-undef */

import React, { createContext } from 'react'

import Provider from './components/provider'

const context = createContext()

export default () => <Provider provider={context.Provider} />
