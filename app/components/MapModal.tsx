import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UserLocationAtom,
  selectedAddressAtom,
  selectedLocationAtom
} from '../recoil/RecoilContext';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: { lat: number; lng: number }) => void;
}

const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);
  const userLocation = useRecoilValue(UserLocationAtom);
  const [selectedLocation, setSelectedLocation] = useRecoilState(
    selectedLocationAtom
  );
  const [selectedAddress, setSelectedAddress] = useRecoilState(
    selectedAddressAtom
  );
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  useEffect(() => {
    const loadNaverMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
      script.async = true;
      script.onload = initializeMap; // 스크립트 로드 후 초기화 함수 호출
      script.onerror = () => alert('Naver Maps API 로드 실패');
      document.head.appendChild(script);
    };


    if (isOpen && mapElement.current) {
      if (naver && naver.maps) {
        initializeMap();
      } else {
        loadNaverMapScript();
      }
    }
    
  }, [isOpen, naverMapApiKey, userLocation.latitude, userLocation.longitude]);

  const initializeMap = () => {
    if (mapElement.current && naver && naver.maps) {
      const map = new naver.maps.Map(mapElement.current, {
        scaleControl: false,
        logoControl: true,
        mapDataControl: true,
        zoomControl: false,
        minZoom: 6,
        center: new naver.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
        zoom: 18
      });


      mapInstance.current = map;

      naver.maps.Event.addListener(map, 'click', (e: any) => {
        const lat = e.coord.lat();
        const lng = e.coord.lng();

        setSelectedLocation({
          latitude: lat,
          longitude: lng
        });

        if (markerInstance.current) {
          markerInstance.current.setMap(null);
        }

        markerInstance.current = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: map
        });

        // // 역 지오코딩 함수 호출
        // searchCoordinateToAddress(new naver.maps.LatLng(lat, lng));
        
      });
    }
  };

  // const searchCoordinateToAddress = (latlng: any) => {
    
  //   if (naver.maps.Service) {
  //     console.log('Reverse geocoding...');
  //     naver.maps.Service.reverseGeocode(
  //       {
  //         coords: latlng
  //       },
  //       function (status: any, response: any) {
  //         if (status !== naver.maps.Service.Status.OK) {
  //           console.error('Reverse geocoding failed:', status);
  //           return;
  //         }

  //         var result = response.v2; // Naver Maps API 문서에 따라 'v2'로 가정
  //         var items = result.results;
  //         var address = result.address;

  //         setSelectedAddress(address); // 선택된 주소 업데이트
  //         console.log('Reverse geocoding result:', address);
  //       }
  //     );
  //   } else {
  //     console.error('Naver Maps API Service not available');
  //   }
  // };


  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedLocation && markerInstance.current) {
      onSelectLocation({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude
      });
      onClose();
    } else {
      alert('Please select a location.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          x
        </button>
        <div
          ref={mapElement}
          style={{ width: '100%', height: '90%' }}
          className="mt-2"
        />
        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white w-full font-bold py-2 px-4 mt-2 rounded"
        >
          위치 선택
        </button>
      </div>
    </div>
  );
};

export default MapModal;