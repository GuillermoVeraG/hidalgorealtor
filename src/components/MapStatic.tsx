import { MapContainer, TileLayer, Marker } from "react-leaflet";

export interface MapStaticProps {
  position: [number, number];
  height: number;
}

const MapStatic = ({ position, height }: MapStaticProps) => {
  return (
    <MapContainer
      center={position}
      zoom={18}
      scrollWheelZoom={false}
      style={{ height: `${height}px`, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  );
};

export default MapStatic;
