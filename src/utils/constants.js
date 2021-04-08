export const ApiEndpoints = {
    // dogs
    DOGS_BASE:'/dogs',
    DOGS_BY_USER:'/dogs/',
    ADD_DOG:'/dogs/addDog',
    UPDATE_DOG:'/dogs/updateDog',
    UPDATECHANGE_DOG_STATUS:'/dogs/changeDogStatus',
    DOGS_BY_USER:'/dogs/',
    // users
    LOGIN_API:'/users/login',
    REGISTER_API:'/users/addUser',
    RESET_PASSWORD_API:'/users/resetPassword',
    UPDATE_USER_API:'/users/updateUser',
    // bookings
    GET_OWNER_BOOKINGS_API:'/bookings/getOwnerBookings/',
    GET_OWNER_BOOKING_REQUESTS_API:'/bookings/getOwnerBookingRequests/',
    GET_CUSTOMER_BOOKINGS_API:'/bookings/getCustomerBookings/',
    CREATE_BOOKING_API:'/bookings/createBooking',
    CHANGE_BOOKING_STATUS_API:'/bookings/changeBookingStatus'
}

export const Variables = {
    taxAmount : "0.0",
    taxAmountInPercent: "12%"
}
