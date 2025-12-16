import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";

export default function Map({ onPick }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAJ36Mp6CXQ0u5bZpQuByVe1t5xZMam_bs", // ← your key  
  });

  const [userLocation, setUserLocation] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation({ lat: 40.4168, lng: -3.7038 });
      return;
    }
    const t = setTimeout(() => setUserLocation({ lat: 40.4168, lng: -3.7038 }), 10000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(t);
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setMarker(loc);
      },
      () => {
        clearTimeout(t);
        setUserLocation({ lat: 40.4168, lng: -3.7038 });
      }
    );
  }, []);

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const pos = { lat, lng };
    setMarker(pos);
    onPick?.(lat, lng);
  }, [onPick]);

  if (loadError) return <p>Error cargando Google Maps…</p>;
  if (!isLoaded || !userLocation) return <p>Cargando mapa…</p>;

  /* ---- single return ---- */
  return (
    <GoogleMap
      center={userLocation}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "400px" }}
      onClick={handleMapClick}          // ← click listener
    >
      {marker && <Marker position={marker} title="Ubicación seleccionada" />}
    </GoogleMap>
  );
}