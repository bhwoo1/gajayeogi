import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserLocationAtom, selectedLocationAtom } from '../recoil/RecoilContext';
import Geolocation from './Geolocation';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (Location: { lat: number; lng: number }) => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const userLocation = useRecoilValue(UserLocationAtom);
  const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationAtom);
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    if (isOpen && mapElement.current) {
      const loadNaverMapScript = () => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      };

      const initializeMap = () => {
        if (mapElement.current && window.naver && window.naver.maps) {
          mapInstance.current = new window.naver.maps.Map(mapElement.current, {
            scaleControl: false,
            logoControl: true,
            mapDataControl: true,
            zoomControl: false,
            minZoom: 6,
            center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
            zoom: 18,
          });

          window.naver.maps.Event.addListener(mapInstance.current, 'click', (e: any) => {
            const lat = e.coord.lat();
            const lng = e.coord.lng();
            setSelectedLocation({ 
              latitude: lat, 
              longitude: lng 
            });
            if (markerInstance.current) {
              markerInstance.current.setMap(null);
            }
            markerInstance.current = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(lat, lng),
              map: mapInstance.current,
            });
          });
        }
      };

      if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
        initializeMap();
      } else {
        loadNaverMapScript();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedLocation && markerInstance.current) {
      onSelectLocation({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      onClose();
    }
    else {
      alert("위치를 선택해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
            <button onClick={onClose} className="absolute top-2 right-2">x</button>
            <div ref={mapElement} style={{ width: '100%', height: '90%' }} className='mt-2'/>
            <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white w-full font-bold py-2 px-4 mt-2 rounded">위치 선택</button>
        </div>
    </div>
  );
};

export default MapModal;