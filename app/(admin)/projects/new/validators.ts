import * as Yup from "yup";

export const BasicDetailsValidator = Yup.object({
    name: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    overview: Yup.string().required("Overview is required"),
    features: Yup.string().required("Features is required"),
})

export const TimeLineValidator = Yup.object({
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required')
})

export const AdditionalInfoValidator = Yup.object({
    additionalInfo: Yup.string().optional()
})