import { Route, Routes } from "react-router-dom";
import CenterPageLayout from "../../users/HealthCenter/Layout/CenterLayout";
import AdminDataProvider from "../../users/Admin/Queries/AdminData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CenterDashboardPage from "../../users/HealthCenter/Pages/Dashboard";


const queryClient = new QueryClient()

const InsideAdminRoutes = () => {
    return ( 
        <QueryClientProvider client={queryClient}>
            <CenterPageLayout>
        
                <AdminDataProvider>
                    <Routes>
                        <Route path="/" element={<CenterDashboardPage/>}/>
                       
                    </Routes>
                </AdminDataProvider>
            </CenterPageLayout>
        </QueryClientProvider>
       
     );
}
 
export default InsideAdminRoutes;