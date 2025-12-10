import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

export default function Map() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyC3LNNrqNP8l6RH6EmjuNSW2h1go_engHk",
    });

    const [userLocation, setUserLocation] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Obteniendo tu ubicación…");

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatusMessage("Geolocalización no soportada. Mostrando ubicación por defecto.");
            setUserLocation({ lat: 40.4168, lng: -3.7038 });
            return;
        }

        const geoTimeout = setTimeout(() => {
            setStatusMessage("No se pudo obtener la ubicación. Mostrando ubicación por defecto.");
            setUserLocation({ lat: 40.4168, lng: -3.7038 });
        }, 10000);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                clearTimeout(geoTimeout);
                setUserLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setStatusMessage("");
            },
            (err) => {
                clearTimeout(geoTimeout);
                console.error("Error:", err);
                setStatusMessage("Error al obtener ubicación. Mostrando ubicación por defecto.");
                setUserLocation({ lat: 40.4168, lng: -3.7038 });
            }
        );
    }, []);

    if (loadError) return <p>Error cargando Google Maps…</p>;
    if (!isLoaded) return <p>Cargando Google Maps…</p>;
    if (!userLocation) return <p>{statusMessage}</p>;

    return (
        <div className="container my-4">
            <div className="card shadow rounded mb-4">
                <div className="card-body">
                    <h5 className="card-title text-center mb-3">Ubicación</h5>

                    <div
                        className="rounded overflow-hidden"
                        style={{ width: "100%", height: "400px" }}
                    >
                        <GoogleMap
                            center={userLocation}
                            zoom={15}
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                            <Marker position={userLocation} title="Tu ubicación" />
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
}
