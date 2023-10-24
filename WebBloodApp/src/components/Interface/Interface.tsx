
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
     firstName: string;
    lastName: string;
    sex: string;
    age: number | '';
    contactNumber: number | '';
    address: string;
    email: string | "";
    password: string | "";
    confirmPassword: string | "";
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
    sex:string;
    assignedAt:string;
    _id: string;
}
export type addingPhysicianInfo = {
    contactNumber: string;
    firstName: string;
    lastName: string;
    sex:string;
    assignedAt:string;
}
export type physicianInfoArray = PhysicianInfo[] | null

export type PatientRequestValues = {
    _id:string
    bloodQuantity : string  ,
    bloodType : string ,
    bucket: string ,
    fileKey: string,
    patient : PatientInfo,
    physician:PhysicianInfo,
    Date :string | "",
    status : string | ""
} 
export type PatientRequestInfo = PatientRequestValues[] | null

export type AccountInfo = {
    _id:string,
    email:string,
    password:string,
    userRoles:string,
    userId:string
}
export type AccountArray = AccountInfo[] | null

export type PreHealthCenterInfo = {
   
    name : string,
    address:string,
    contact:string,
    bloodTypeInventory: {
        A_positive:number | null | undefined
        A_negative:number | null | undefined
        B_positive:number | null | undefined
        B_negative:number | null | undefined
        AB_positive:number | null | undefined
        AB_negative:number | null | undefined
        O_positive:number | null | undefined
        O_negative:number | null | undefined
    },
}
export type HealthCenterInfo = {
    _id:string
    name : string,
    address:string,
    contact:string,
    bloodTypeInventory: {
        A_positive:number | null | undefined
        A_negative:number | null | undefined
        B_positive:number | null | undefined
        B_negative:number | null | undefined
        AB_positive:number | null | undefined
        AB_negative:number | null | undefined
        O_positive:number | null | undefined
        O_negative:number | null | undefined
    },
}
export type healthCenterInfoArray = HealthCenterInfo[]| null

