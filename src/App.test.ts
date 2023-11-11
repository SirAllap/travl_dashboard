// import { render, screen, cleanup } from '@testing-library/react'
// // Importing the jest testing library
// import '@testing-library/jest-dom'
// import userEvent from '@testing-library/user-event'
// import { Status } from './pages/Rooms'
// import { IconStyle } from './components/Header'

// afterEach(() => {
// 	cleanup()
// })

// test('Should render', () => {
// 	render(
// 		<IconStyle
// 			onClick={() => {}}
// 			data-testid='headerToggleIcon'
// 			menu='menu'
// 		/>
// 	)
// 	expect(screen.getByTestId('headerToggleIcon')).toBeInTheDocument()
// })

// test('Should call the onClick when button is clicked', () => {
// 	const mockOnClickFunction = jest.fn()
// 	render(
// 		<IconStyle
// 			onClick={mockOnClickFunction}
// 			data-testid='headerToggleIcon'
// 			menu='menu'
// 		/>
// 	)
// 	userEvent.click(screen.getByTestId('headerToggleIcon'))
// 	expect(mockOnClickFunction).toBeCalled()
// })

// test("Should return this #5AD07A color when passing 'Available' as a prop", () => {
// 	render(<Status data-testid='roomStatus' status={'Available'} />)
// 	expect(screen.getByTestId('roomStatus')).toHaveStyle(
// 		'background-color: #532B8D99'
// 	)
// })

// test("Should return this #E23428 color when passing 'Booked' as a prop", () => {
// 	render(<Status data-testid='roomStatus' status={'Booked'} />)
// 	expect(screen.getByTestId('roomStatus')).toHaveStyle(
// 		'background-color: #F4506E'
// 	)
// })
