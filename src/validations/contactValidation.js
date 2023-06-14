import * as Yup from 'yup'

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("fullname is required!!"),
    photo: Yup.string().url("address is not valid").required("photo is required!!"),
    mobile: Yup.number().required("phone number is required!!"),
    email:Yup.string().email("Email is not valid").required("Email is required!!"),
    job: Yup.string().nullable(),
    group: Yup.string().required("group is required!!")
})