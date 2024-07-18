import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  UserLocationAtom,
  selectedAddressAtom,
  selectedLocationAtom
} from '../recoil/RecoilContext';
import { FaSearch } from 'react-icons/fa';

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
  const [searchAddress, setSearchAddress] = useState<string>("");
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

        // 클릭 이벤트 추가
        window.naver.maps.Event.addListener(map, 'click', (e: any) => {
          const lat = e.coord.lat();
          const lng = e.coord.lng();

          setSelectedLocation({
            latitude: lat,
            longitude: lng
          });

          // 사용자가 선택한 좌표를 주소로 변환
          handleReverseGeoCode(lat, lng, map);

          
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchAddress);
  };

  // 사용자가 선택한 좌표를 주소로 변환(역지오코딩)
  const handleReverseGeoCode = (lat: number, lng: number, map: any) => {
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
          `
          <div style="padding: 10px; min-width: 200px; line-height: 150%; background-color: white; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
            <p style="margin: 0;">${address}</p>
          </div>
          `
        );
        infoWindow.open(map, new window.naver.maps.LatLng(lat, lng));
      }
    );
  }

  // 사용자가 검색한 주소를 좌표로 변환(지오코딩)
  const handleSearch = (address: string) => {
    console.log(address);
    naver.maps.Service.geocode(
      { query: address },
      function (status, res) {
        if (res.v2.addresses.length === 0) {
          // 요청실패 (searchKeyword에 대한 응답이 없을 경우) 에러 핸들링
          alert("검색 실패");
        } else {
          // 요청 성공에 대한 핸들링
          // 검색된 주소에 해당하는 위도, 경도를 숫자로 변환후 상태 저장
          const resAddress = res.v2.addresses[0];
          const lng = parseFloat(resAddress.x);
          const lat = parseFloat(resAddress.y);
          console.log(resAddress.roadAddress);
          console.log("lat= " + lat + ", lng= " + lng);


          setSelectedLocation({ latitude: lat, longitude: lng });
          setSelectedAddress(resAddress.roadAddress);

          // 해당 좌표로 맵 이동
          mapInstance.current.setCenter(new window.naver.maps.LatLng(lat, lng));

          const infoWindow = new window.naver.maps.InfoWindow({
            content: `
                 <div style="padding: 10px; min-width: 200px; line-height: 150%; background-color: white; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
                   <p style="margin: 0;">${resAddress.roadAddress}</p>
                 </div>
               `,
               borderWidth: 0
          });
          infoWindow.open(mapInstance.current, new window.naver.maps.LatLng(lat, lng));
         
        }

        
      }
    );
  };

  


  const handleConfirm = () => {
    if (selectedLocation && selectedAddress) {
      onSelectLocation({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude
      });
      onSelectAddress(selectedAddress);
      setSearchAddress("");
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
        <div className="w-full mx-auto ">
            <form onSubmit={handleSubmit}className="w-full border p-2 rounded-lg  bg-gray-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-gray-100 focus:outline-none"
                    placeholder="주소를 입력하시거나 지도를 클릭하세요."
                    value={searchAddress}
                    onChange={handleInputChange}
                />
                <button className="p-2"><FaSearch /></button> 
            </form>
          </div>
        <div
          ref={mapElement}
          style={{ width: '100%', height: '80%' }}
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