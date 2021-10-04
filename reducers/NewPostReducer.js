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
    attachment: ''
}


export default (state = initialState, action) => {
    let current = { ...state, name: { ...state.name }, description: { ...state.description } }
    switch (action.type) {
        case "COMPANY_NAME":
            current.name.name = action.name
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
            if (action.locationValid)
                current.locationValid = action.locationValid
            else
                current.locationValid = false
            break
        case "ATTACHMENT":
            current.attachment = action.attachment
            break
        case "RESET":
            return initialState
        default:
            return state
    }

    return current

}
