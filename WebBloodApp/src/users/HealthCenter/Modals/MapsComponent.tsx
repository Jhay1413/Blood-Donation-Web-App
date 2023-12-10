import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Modal } from "antd";
import { useState } from "react";

const google_key = import.meta.env.VITE_MAP_KEY
interface MarkerPosition {
    lat:number;
    lng:number;
  }
  interface ActivityModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
   
} 
const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: 11.247638,
    lng: 124.989734
  };
  
const MapComponent = ({ isModalOpen, cancelModal, setFieldValue }: ActivityModalProps & { setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void }) =>{
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: google_key
    })
    const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    if(!isLoaded){
        return null;
    }
    
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        // Set the marker position
        if(event.latLng){
            const lat = event.latLng.lat();
           
            const lng = event.latLng.lng();
           
            setMarkerPosition({ lat, lng });
        }
       

        // Show the info window for the marker
        setShowInfoWindow(true);
    };
    const onLocationConfirm = (lat:number,lng:number) =>{
        setFieldValue('location.latitude', `${lat}`);
        setFieldValue('location.longitude', `${lng}`);
            
            cancelModal();
    }
    const handleConfirmLocation = () => {
        // Pass the confirmed location back to the parent component
        if (markerPosition) {
            onLocationConfirm(markerPosition.lat, markerPosition.lng);
            setMarkerPosition(null); // Remove the marker after confirmation
            setShowInfoWindow(false); // Hide the InfoWindow
            cancelModal(); // Close the map modal
        }
    }; 

    return (
        <>
        <div className="w-11/12">
            <Modal open={isModalOpen} onCancel={cancelModal} width='50%' footer={null}>
                <div className="w-full h-96">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        {markerPosition ? (
                            <Marker position={markerPosition} onClick={() => setShowInfoWindow(true)}>
                                {showInfoWindow ? (
                                    <InfoWindow position={markerPosition} onCloseClick={() => setShowInfoWindow(false)}>
                                        <div>
                                            <p>Is this the correct location?</p>
                                            <button className="bg-blue-500 text-white p-2 text-xs" onClick={handleConfirmLocation}>Confirm Location</button>
                                        </div>
                                    </InfoWindow>
                                ):""}
                            </Marker>
                        ): ""}
                    </GoogleMap>
                </div>
            </Modal>
        </div>
    </>
    )
}

export default MapComponent;