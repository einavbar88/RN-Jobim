import { parseJob } from "../auxFunc"

export const filtersInitialState = {
    jobsTypes: [],
    locationArea: {
        latitude: '',
        longitude: ''
    }
}

const FiltersReducer = (state, action) => {

    const returnArrayCopy = (arr) => {
        const jobTypes = arr.length > 0 ? [...arr] : []
        return jobTypes
    }

    const current = { jobsTypes: returnArrayCopy(state.jobsTypes), locationArea: { ...state.locationArea } }

    switch (action.type) {
        case 'JOB_TYPE':
            const job = parseJob(action.jobType)
            const jobsTypes = returnArrayCopy(current.jobsTypes)
            if (current.jobsTypes.includes(job))
                return { ...current, jobsTypes: jobsTypes.filter(j => j !== job) }
            jobsTypes.push(job)
            return { ...current, jobsTypes }
        case 'LOCATION':
            return { ...current, locationArea: action.locationArea }
        case 'RESET':
            return filtersInitialState
        default:
            return current
    }
}

export default FiltersReducer