import React, { useReducer } from 'react'
import { supertoggleContext } from './supertoggleContext'

const initialState = {
	position: 'open',
	bookingBreadCrumb: '',
}

const breadCrumbInitialState = {
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
		default:
			break
	}
}

const breadCrumbReducer = (state, action) => {
	switch (action.type) {
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
	const [stateBread, dispatchBread] = useReducer(
		breadCrumbReducer,
		breadCrumbInitialState
	)

	const bookingBreadCrumb = (id) => {
		dispatchBread({
			type: 'getBookingBreadCrumb',
			payload: { id },
		})
	}

	const roomBreadCrumb = (id) => {
		dispatchBread({
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
					stateBread,
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
