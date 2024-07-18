import React, { useEffect, useRef } from 'react';
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
  onSelectAddress: (address: string) => void;
}

const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  onSelectAddress
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const userLocation = useRecoilValue(UserLocationAtom);
  const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationAtom);
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
  const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY;

  useEffect(() => {
    const initializeMap = () => {
      if (mapElement.current && window.naver && window.naver.maps) {
        const map = new window.naver.maps.Map(mapElement.current, {
          scaleControl: false,
          logoControl: true,
          mapDataControl: true,
          zoomControl: false,
          minZoom: 6,
          center: new window.naver.maps.LatLng(
            userLocation.latitude,
            userLocation.longitude
          ),
          zoom: 18
        });

        mapInstance.current = map;

        window.naver.maps.Event.addListener(map, 'click', (e: any) => {
          const lat = e.coord.lat();
          const lng = e.coord.lng();

          setSelectedLocation({
            latitude: lat,
            longitude: lng
          });

          window.naver.maps.Service.reverseGeocode(
            {
              coords: new window.naver.maps.LatLng(lat, lng),
              orders: 'roadaddr,addr'
            },
            (status: any, response: any) => {
              if (status !== window.naver.maps.Service.Status.OK) {
                console.error('Reverse geocoding failed:', status);
                return;
              }

              const result = response.v2;
              const address = result.address.roadAddress || result.address.jibunAddress;

              setSelectedAddress(address);

              const infoWindow = new window.naver.maps.InfoWindow({ content: '', borderWidth: 0 });
              infoWindow.setContent(
                ['<div style="padding:10px;min-width:200px;line-height:150%;">', address, '</div>'].join('')
              );
              infoWindow.open(map, new window.naver.maps.LatLng(lat, lng));
            }
          );
        });
      } else {
        console.error('Naver Maps API is not loaded');
      }
    };

    if (isOpen) {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`;
        script.async = true;
        script.onload = initializeMap;
        script.onerror = () => alert('Naver Maps API 로드 실패');
        document.head.appendChild(script);
      }
    }
  }, [isOpen, userLocation.latitude, userLocation.longitude]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedLocation && selectedAddress) {
      onSelectLocation({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude
      });
      onSelectAddress(selectedAddress);
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