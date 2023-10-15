
export interface AddingPatientInfo {
    firstName: string;
    lastName: string;
    sex: string;
    age: number | '';
    contactNumber: number | '';
    address: string;
    email: string | "";
    password: string | "";
    confirmPassword: string | "";
}
export interface AddingPatientInfoWithUserRoles {
    patientInfo:AddingPatientInfo
    userRoles: string
}
export interface AddingPatientRequestInfo{
    _id:string,
    firstName:string,
    lastName:string,
    sex:string,
    age:number | '',
    contactNumber:number | '',
    address:string,
    bloodType:string,
    quantity:string
    physician: string
}
export type PatientInfo = {
    _id:string,
    firstName : string,
    lastName : string,
    sex: string,
    age: number |'',
    contactNumber: number | '',
    address: string,
}
export type PatientInfoArray = PatientInfo[] | null

export type PhysicianInfo = {
    contactNumber: string;
    firstName: string;
    lastName: string;
    _id: string;
}

export type PatientRequestValues = {
    _id:string
    bloodQuantity : string  ,
    bloodType : string ,
    bucket: string ,
    fileKey: string,
    patient : PatientInfo,
    physician:PhysicianInfo
} 
export type PatientRequestInfo = PatientRequestValues[] | null