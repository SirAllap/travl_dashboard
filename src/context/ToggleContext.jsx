import React, { useReducer } from 'react'
import { supertoggleContext } from './supertoggleContext'

const ToggleContext = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'open': {
				return {
					position: (state.position = 'open'),
				}
			}
			case 'close': {
				return {
					position: (state.position = 'close'),
				}
			}
			default:
				break
		}
	}

	const [state, dispatch] = useReducer(reducer, { position: 'open' })

	return (
		<>
			<supertoggleContext.Provider
				value={{
					reducer,
					dispatch,
					state,
				}}
			>
				{children}
			</supertoggleContext.Provider>
		</>
	)
}

export default ToggleContext
