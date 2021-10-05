export const initialState = {
    name: {
        name: '',
        branch: ''
    },
    job: '',
    description: {
        title: '',
        description: ''
    },
    location: '',
    locationValid: false,
    locationArr: [],
    addressText: { city: '', street: '', number: '' },
    attachment: '',
    ownerId: ''
}


export default (state = initialState, action) => {
    let current = { ...state, name: { ...state.name }, description: { ...state.description }, locationArr: { ...state.locationArr }, addressText: { ...state.addressText } }
    switch (action.type) {
        case "COMPANY_NAME":
            current.name.name = action.name
            current.ownerId = action.ownerId
            break
        case "BRANCH":
            current.name.branch = action.branch
            break
        case "JOB_NAME":
            current.job = action.job
            break
        case "DESCRIPTION_TITLE":
            current.description.title = action.title
            break
        case "DESCRIPTION_DESCRIPTION":
            current.description.description = action.description
            break
        case "JOB_LOCATION":
            if (action.location)
                current.location = action.location
            if (action.locationValid) {
                current.locationValid = action.locationValid
                current.addressText = action.addressText
                current.locationArr = action.locationArr

            }
            else
                current.locationValid = false
            break
        case "ATTACHMENT":
            current.attachment = current.attachment
            break
        case "RESET":
            return initialState
        default:
            return state
    }

    return current

}
