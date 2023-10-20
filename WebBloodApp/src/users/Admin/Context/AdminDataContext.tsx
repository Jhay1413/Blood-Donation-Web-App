import { createContext, useEffect, useState } from "react"
import { AccountArray, PatientInfoArray, PatientRequestInfo, physicianInfoArray } from "../../../components/Interface/Interface"

type AdminDataContextType = {
    patientInfo : PatientInfoArray | null,
    allRequest : PatientRequestInfo | null,
    isLoading : boolean,
    handleSetIsLoading:()=>void
} | null

type AdminDataProps={
    children : React.ReactNode
}
const AdminDataContext = createContext<AdminDataContextType | null>(null);

export const AdminDataProvider = ({children}:AdminDataProps)=>{
    const [allRequest,setAllRequest] = useState<PatientRequestInfo | null>([]);
    const [patientInfo,setPatientInfo] = useState<PatientInfoArray | null>([]);
    const [physicianInfo,setPhysicianInfo] = useState<physicianInfoArray | null>([]);
    const [patientAccount,setPatientAccount] = useState<AccountArray | null>([]);
    const [physicianAccount,setPhysicianAccount] = useState<AccountArray | null>([]);

    const [isLoading,setIsLoading] = useState<boolean>(true)

    const handleSetIsLoading = () => setIsLoading(!isLoading);

    
}