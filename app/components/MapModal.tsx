import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserLocationAtom, selectedAddressAtom, selectedLocationAtom } from '../recoil/RecoilContext';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const userLocation = useRecoilValue(UserLocationAtom);
  const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationAtom);
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    let map: any;
    let infoWindow: any;
  
    const loadNaverMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };
  
    const initializeMap = () => {
      if (mapElement.current && window.naver && window.naver.maps) {
        map = new window.naver.maps.Map(mapElement.current, {
          scaleControl: false,
          logoControl: true,
          mapDataControl: true,
          zoomControl: false,
          minZoom: 6,
          center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
          zoom: 18,
        });
  
        infoWindow = new window.naver.maps.InfoWindow({
          content: '',
          anchorSkew: true,
        });
  
        mapInstance.current = map;
  
        window.naver.maps.Event.addListener(map, 'click', (e: any) => {
          const lat = e.coord.lat();
          const lng = e.coord.lng();
  
          
  
          setSelectedLocation({
            latitude: lat,
            longitude: lng,
          });
  
          // 이전 마커가 있다면 제거
          if (markerInstance.current) {
            markerInstance.current.setMap(null);
          }
  
          // 클릭한 위치에 새로운 마커 추가
          markerInstance.current = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(lat, lng),
            map: map,
          });
        });
      }
    };
  
    if (isOpen && mapElement.current) {
      if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
        initializeMap();
      } else {
        loadNaverMapScript();
      }
    }
  }, [isOpen, naverMapApiKey, userLocation.latitude, userLocation.longitude]);

  // useEffect(() => {
  //   if (isOpen && mapElement.current) {
  //     const loadNaverMapScript = () => {
  //       const script = document.createElement('script');
  //       script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
  //       script.async = true;
  //       script.onload = initializeMap;
  //       document.head.appendChild(script);
  //     };

  //     const initializeMap = () => {
  //       if (mapElement.current && window.naver && window.naver.maps) {
  //         const map = new window.naver.maps.Map(mapElement.current, {
  //           scaleControl: false,
  //           logoControl: true,
  //           mapDataControl: true,
  //           zoomControl: false,
  //           minZoom: 6,
  //           center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
  //           zoom: 18,
  //         });


        

  //         mapInstance.current = map;

  //         window.naver.maps.Event.addListener(map, 'click', (e: any) => {
  //           const lat = e.coord.lat();
  //           const lng = e.coord.lng();
  //           setSelectedLocation({ 
  //             latitude: lat, 
  //             longitude: lng 
  //           });

  //           // Remove previous marker if exists
  //           if (markerInstance.current) {
  //             markerInstance.current.setMap(null);
  //           }

  //           // Add a new marker at the clicked position
  //           markerInstance.current = new window.naver.maps.Marker({
  //             position: new window.naver.maps.LatLng(lat, lng),
  //             map: map,
  //           });

  //         });
  //       }
  //     };

  //     if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
  //       initializeMap();
  //     } else {
  //       loadNaverMapScript();
  //     }
  //   }
  // }, [isOpen, naverMapApiKey, userLocation.latitude, userLocation.longitude]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedLocation && markerInstance.current) {
      onSelectLocation({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      //console.log(selectedAddress);
      onClose();
    } else {
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


