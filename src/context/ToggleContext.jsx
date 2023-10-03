import React, { useReducer } from 'react'
import { supertoggleContext } from './supertoggleContext'

const initialState = {
	position: 'open',
}

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

const ToggleContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

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
