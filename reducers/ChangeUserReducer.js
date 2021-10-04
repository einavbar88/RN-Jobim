const ChangeUserReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_FIRST_NAME':
            return { ...state, firstName: action.firstName }
        case 'CHANGE_LAST_NAME':
            return { ...state, lastName: action.lastName }
        case 'CHANGE_CITY':
            return { ...state, city: action.city }
        case 'CHANGE_YEAR':
            return { ...state, birthYear: action.birthYear }
        case 'CHANGE_EMAIL':
            return { ...state, email: action.email }
        case 'RESET':
            return {}
        default:
            return state
    }
}

export default ChangeUserReducer