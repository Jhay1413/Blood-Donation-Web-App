import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllPatientInfo } from "../../../api/AdminAPI/AdminPatientService"
import { getAllPatientRequest } from "../../../api/AdminAPI/AdminRequestService"
import { getAllPhysician } from "../../../api/AdminAPI/AdminPhysicianRequest"
import { getAllCenterInfo } from "../../../api/AdminAPI/AdminHealthCenterServices"

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

    if ((healthCenterData.isLoading ||patientData.isLoading || requestData.isLoading || physicianData.isLoading) || (healthCenterData.isError || patientData.isError || requestData.isError || physicianData.error)) {
        return null; // Render nothing while loading or on error
      }
    return <>{children}</>
}
export default AdminDataProvider