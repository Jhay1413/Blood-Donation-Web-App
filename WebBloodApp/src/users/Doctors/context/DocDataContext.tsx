import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../components/AuthContenxt/AuthContext";
import { AddingPatientInfo, PatientInfo, PatientRequestInfo} from "../Interface/Interface";
import { getAllPatientInfo } from "../../../api/patientApi";
import { getRequestByPhysicianId } from "../../../api/patientRequestApi";



type DocDataContextType = {
    patientInfo : PatientInfo
} | null

export const DocDataContext = createContext<DocDataContextType>(null)


type PatientRequestContextType  = {
   allRequest : PatientRequestInfo | null
} | null

const PatientRequestContext = createContext<PatientRequestContextType>(null)
type DocDataProps ={
    children : React.ReactNode
}
export const DocDataProvider = ({children}:DocDataProps) =>{
    const[patientInfo,setPatientInfo] = useState<PatientInfo>(null)
   
    const [allRequest,setAllRequest] = useState<PatientRequestInfo | null>([])
   

    const {authContext} = useAuth();
  
    
    const getRequest = async () =>{
        try {
            if(authContext){
                const response = await getRequestByPhysicianId(authContext?.userId)
                if(response){
                    setAllRequest(response.data)
                }
              
            }
           
        } catch (error) {
            console.log(error)
        }
        
    }
    const getPatient = async() =>{
        try {
            const response = await getAllPatientInfo();
            if(response){
                setPatientInfo(response.data)

            }
          
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            await getPatient()
            await getRequest()

        }
        fetchData();
      

    },[])
       
   

    return(
        <DocDataContext.Provider value={{patientInfo}}>
            <PatientRequestContext.Provider value={{allRequest}}>
                {children}
            </PatientRequestContext.Provider>
        </DocDataContext.Provider>
    )
}
export const getDocData = () =>{
    const DocPatientContext = useContext(DocDataContext);
    const DocRequestContext = useContext(PatientRequestContext)

    return {DocPatientContext,DocRequestContext}
}
