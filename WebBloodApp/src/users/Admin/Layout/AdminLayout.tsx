import { ReactNode,useRef, useState } from "react";

import AdminPageNavigation from "./AdminNavigation";
import AdminHeaderPage from "./AdminHeader";

type AdminLayoutProps = {
    children : ReactNode
}
const AdminPageLayout = ({children}:AdminLayoutProps) => {
    const [navBarState,setNavBarState] = useState<boolean>(true);
    const divRef = useRef<HTMLDivElement | null>(null);

    const changeNavbarState = () =>{
        setNavBarState(!navBarState)
    }
    return ( 
        <>
            <div className="flex min-h-screen bg-gray-100 relative">
                <div ref={divRef} className={`${navBarState ? 'absolute' : 'hidden'} w-64 lg:w-1/6 bg-white p-4 lg:flex lg:fixed h-full z-10`}>
                    <AdminPageNavigation onClick={changeNavbarState}/>
                </div>
                <div className={`${navBarState ? 'opacity-25 ' : 'opacity-100'} lg:opacity-100 flex flex-col w-full lg:w-10/12 lg:ml-1/6`}>
                    <div className="p-4 w-full items-center justify-center flex">
                        <div className="bg-white w-full p-4 rounded-md shadow-md">
                            <AdminHeaderPage onClick={changeNavbarState}/>
                        </div>
                    </div>
                    <div className="mt-3 p-4 w-full">
                       {children}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default AdminPageLayout;