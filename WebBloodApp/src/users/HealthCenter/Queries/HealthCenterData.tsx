import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllPatientInfo } from "../../../api/AdminAPI/AdminPatientService"
import { getAllPatientRequest } from "../../../api/AdminAPI/AdminRequestService"
import { getAllPhysician } from "../../../api/AdminAPI/AdminPhysicianRequest"
import { getAllActivities, getAllCenterAccount, getAllCenterInfo, getAllDonorInfo } from "../../../api/AdminAPI/AdminHealthCenterServices"

type Props ={
    children : React.ReactNode
}
const CenterDataProvider = ({children}:Props) =>{

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
    const ActivityInfo = useQuery({
        queryKey:['activityInfo'],
        queryFn:getAllActivities
    })
    const dataSources = [
        healthCenterAccount,
        healthCenterData,
        patientData,
        requestData,
        physicianData,
        DonorInfo,
        ActivityInfo
      ];
      
      const isLoading = dataSources.some((source) => source.isLoading);
      const isError = dataSources.some((source) => source.isError);
      
      if (isLoading || isError) {
        return null
      }  
    return <>{children}</>
}
export default CenterDataProvider