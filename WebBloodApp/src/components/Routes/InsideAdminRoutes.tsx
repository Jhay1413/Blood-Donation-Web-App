import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../users/Admin/AdminDashboard";

const InsideAdminRoutes = () => {
    return ( 
        <Routes>
            <Route path="/" element={<AdminDashboard/>}/>
        </Routes>
     );
}
 
export default InsideAdminRoutes;