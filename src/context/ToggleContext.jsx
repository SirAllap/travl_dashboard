import React, { Children, useState } from 'react'
import { supertoggleContext } from './supertoggleContext'

const ToggleContext = ({ children }) => {
	const [toggle, setToggle] = useState('open')

	const handleOpen = () => {
		setToggle('open')
	}
	const handleClose = () => {
		setToggle('close')
	}

	return (
		<>
			<supertoggleContext.Provider
				value={{
					toggle,
					handleClose,
					handleOpen,
				}}
			>
				{children}
			</supertoggleContext.Provider>
		</>
	)
}

export default ToggleContext
