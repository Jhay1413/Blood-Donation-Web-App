
import * as Yup from 'yup';


  export const validationSchemaForPhysician = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    sex: Yup.string(),
    age: Yup.number().positive('Age must be positive').integer('Age must be an integer'),
    contactNumber: Yup.string(),
    assignedAt: Yup.string(),
   
  });

