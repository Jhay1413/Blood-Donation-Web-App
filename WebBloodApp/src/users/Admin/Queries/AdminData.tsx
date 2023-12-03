import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllPatientInfo } from "../../../api/AdminAPI/AdminPatientService"
import { getAllPatientRequest } from "../../../api/AdminAPI/AdminRequestService"
import { getAllPhysician, getAllPhysicianAccount } from "../../../api/AdminAPI/AdminPhysicianRequest"
import { getAllCenterAccount, getAllCenterInfo, getAllDonorInfo } from "../../../api/AdminAPI/AdminHealthCenterServices"
import { getAllAccountInfo } from "../../../api/AdminAPI/Accounts"

type Props ={
    children : React.ReactNode
}
const AdminDataProvider = ({children}:Props) =>{

const queryClient = useQueryClient();

    const patientData = useQuery({
        queryKey:['patientInfo'],
        queryFn:getAllPatientInfo
    })
    const requestData = useQuery({
        queryKey:['allRequest'],
        queryFn:getAllPatientRequest
    })
    const physicianData = useQuery({
        queryKey:['physicianInfo'],
        queryFn:getAllPhysician
    })
    const healthCenterData = useQuery({
        queryKey:['healthCenterInfo'],
        queryFn:getAllCenterInfo
    })
    const healthCenterAccount = useQuery({
        queryKey:['healthCenterAccount'],
        queryFn:getAllCenterAccount
    })
    const DonorInfo = useQuery({
        queryKey:['donorInfo'],
        queryFn:getAllDonorInfo
    })
    const physicianAccounts = useQuery({
        queryKey:['physicianAccounts'],
        queryFn:getAllPhysicianAccount
    })
   
    const dataSources = [
        healthCenterAccount,
        healthCenterData,
        patientData,
        requestData,
        physicianData,
        DonorInfo,
        physicianAccounts,
   
       
      ];
      
      const isLoading = dataSources.some((source) => source.isLoading);
      const isError = dataSources.some((source) => source.isError);
      
      if (isLoading || isError) {
        return null
      }  
    return <>{children}</>
}
export default AdminDataProvider