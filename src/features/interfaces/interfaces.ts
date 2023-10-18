export interface BookingInter {
	id: string
	guest: string
	phone_number: string
	order_date: string
	check_in: string
	check_out: string
	special_request: string
	room_type: string
	room_number: string
	status: string
	photos: string[]
}

export interface RoomInter {
	room_number: string
	id: string
	room_photo: string[]
	room_type: string
	description: string
	amenities_type: string
	amenities: object[]
	price: number
	offer_price: boolean
	discount: number
	status: string
}

export interface ContactInter {
	id: string
	full_name: string
	email: string
	phone_number: string
	subject_of_review: string
	review_body: string
	date: string
	dateTime: string
	isArchived: string
}

export interface UserInter {
	employee_id: string
	full_name: string
	email: string
	photo: string
	start_date: string
	description: string
	phone_number: string
	status: string
}
