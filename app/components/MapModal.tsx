import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { UserLocationAtom } from '../recoil/RecoilContext';
import Geolocation from './Geolocation';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const userLocation = useRecoilValue(UserLocationAtom);
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
            // onSelectLocation({ lat, lng });
            onClose(); // 위치 선택 후 모달 닫기
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
            <button onClick={onClose} className="absolute top-2 right-2">x</button>
            <div ref={mapElement} style={{ width: '100%', height: '100%' }} className='mt-2'/>
        </div>
    </div>
  );
};

export default MapModal;