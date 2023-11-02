import { Route, Routes } from "react-router-dom";
import CenterPageLayout from "../../users/HealthCenter/Layout/CenterLayout";
import AdminDataProvider from "../../users/Admin/Queries/AdminData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CenterDashboardPage from "../../users/HealthCenter/Pages/Dashboard";
import CenterDataProvider from "../../users/HealthCenter/Queries/HealthCenterData";
import CenterRequestPage from "../../users/HealthCenter/Pages/ReqTable";
import CenterPatientPage from "../../users/HealthCenter/Pages/patientPage";
import CenterPendingRequestPage from "../../users/HealthCenter/Pages/centerPendingRequest";
import DonorPage from "../../users/HealthCenter/Pages/DonorPage";
import ActivityPage from "../../users/HealthCenter/Pages/ActivityPage";


const queryClient = new QueryClient()

const InsideCenterRoutes = () => {
    return ( 
        <QueryClientProvider client={queryClient}>
            <CenterPageLayout>
        
                <CenterDataProvider>
                    <Routes>
                        <Route path="/" element={<CenterDashboardPage/>}/>
                        <Route path="/patientsPage" element={<CenterPatientPage/>}/>
                        <Route path="/requestsPage" element={<CenterRequestPage/>}/>
                        <Route path="/pendingRequestsPage" element={<CenterPendingRequestPage/>}/>
                        <Route path="/donorPage" element={<DonorPage/>}/>
                        <Route path="/Activities" element={<ActivityPage/>}/>
                    </Routes>
                </CenterDataProvider>
            </CenterPageLayout>
        </QueryClientProvider>
       
     );
}
 
export default InsideCenterRoutes;