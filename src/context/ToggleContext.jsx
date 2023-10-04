import React, { useReducer } from 'react'
import { supertoggleContext } from './supertoggleContext'

const initialState = {
	position: 'open',
	bookingBreadCrumb: '',
	rooomBreadCrumb: '',
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
		case 'getBookingBreadCrumb': {
			return {
				bookingBreadCrumb: `Bookings/${action.payload.id}`,
			}
		}
		case 'getRoomBreadCrumb': {
			return {
				rooomBreadCrumb: action.payload,
			}
		}
		default:
			break
	}
}

const ToggleContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const bookingBreadCrumb = (id) => {
		dispatch({
			type: 'getBookingBreadCrumb',
			payload: { id },
		})
	}

	const roomBreadCrumb = (id) => {
		console.log('dispatch this one!')
	}

	return (
		<>
			<supertoggleContext.Provider
				value={{
					reducer,
					dispatch,
					state,
					bookingBreadCrumb,
					roomBreadCrumb,
				}}
			>
				{children}
			</supertoggleContext.Provider>
		</>
	)
}

export default ToggleContext
