import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllPatientInfo } from "../../../api/AdminAPI/AdminPatientService"
import { getAllPatientRequest } from "../../../api/AdminAPI/AdminRequestService"
import { getAllPhysician } from "../../../api/AdminAPI/AdminPhysicianRequest"

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

    if ((patientData.isLoading || requestData.isLoading || physicianData.isLoading) || (patientData.isError || requestData.isError)) {
        return null; // Render nothing while loading or on error
      }
    return <>{children}</>
}
export default AdminDataProvider