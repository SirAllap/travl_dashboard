import React, { useReducer } from 'react'
import { supertoggleContext } from './supertoggleContext'

const initialState = {
	position: 'open',
	bookingBreadCrumb: '',
	rooomBreadCrumb: '',
	headerTitle: '',
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
				headerTitle: `Booking Details`,
			}
		}
		case 'getRoomBreadCrumb': {
			return {
				roomBreadCrumb: `Rooms/${action.payload.id}`,
				headerTitle: `Rooms Details`,
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
		dispatch({
			type: 'getRoomBreadCrumb',
			payload: { id },
		})
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
