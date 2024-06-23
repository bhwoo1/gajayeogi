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


// import React, { useEffect, useRef } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { UserLocationAtom, selectedAddressAtom, selectedLocationAtom } from '../recoil/RecoilContext';

// interface MapModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelectLocation: (location: { lat: number; lng: number }) => void;
// }

// const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelectLocation }) => {
//   const mapElement = useRef<HTMLDivElement>(null);
//   const mapInstance = useRef<any>(null);
//   const markerInstance = useRef<any>(null);
//   const userLocation = useRecoilValue(UserLocationAtom);
//   const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationAtom);
//   const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
//   const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

//   useEffect(() => {
//     let map: any;
//     let infoWindow: any;

//     const loadNaverMapScript = () => {
//       const script = document.createElement('script');
//       script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
//       script.async = true;
//       script.onload = initializeMap;
//       document.head.appendChild(script);
//     };

//     const initializeMap = () => {
//       if (mapElement.current && window.naver && window.naver.maps) {
//         map = new window.naver.maps.Map(mapElement.current, {
//           scaleControl: false,
//           logoControl: true,
//           mapDataControl: true,
//           zoomControl: false,
//           minZoom: 6,
//           center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
//           zoom: 18,
//         });

//         infoWindow = new window.naver.maps.InfoWindow({
//           content: '',
//           anchorSkew: true,
//         });

//         mapInstance.current = map;

//         window.naver.maps.Event.addListener(map, 'click', (e: any) => {
//           const lat = e.coord.lat();
//           const lng = e.coord.lng();

//           searchCoordinateToAddress(new window.naver.maps.LatLng(lat, lng));

//           setSelectedLocation({
//             latitude: lat,
//             longitude: lng,
//           });

//           if (markerInstance.current) {
//             markerInstance.current.setMap(null);
//           }

//           markerInstance.current = new window.naver.maps.Marker({
//             position: new window.naver.maps.LatLng(lat, lng),
//             map: map,
//           });
//         });
//       }
//     };

//     if (isOpen && mapElement.current) {
//       if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
//         initializeMap();
//       } else {
//         loadNaverMapScript();
//       }
//     }
//   }, [isOpen]);

//   const searchCoordinateToAddress = (latlng: any) => {
//     if (!window.naver || !window.naver.maps) {
//       return alert('Naver 지도 API가 로드되지 않았습니다.');
//     }

//     const infoWindow = new window.naver.maps.InfoWindow({
//       content: '',
//       anchorSkew: true,
//     });

//     window.naver.maps.Service.reverseGeocode({
//       coords: latlng,
//       orders: [
//         window.naver.maps.Service.OrderType.ADDR,
//         window.naver.maps.Service.OrderType.ROAD_ADDR,
//       ].join(','),
//     }, (status, response) => {
//       if (status === window.naver.maps.Service.Status.ERROR) {
//         return alert('주소 변환 중 오류가 발생했습니다.');
//       }

//       const items = response.v2.results;
//       let htmlAddresses = [];

//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
//         const address = makeAddress(item) || '';
//         const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

//         htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
//       }

//       infoWindow.setContent([
//         '<div style="padding:10px;min-width:200px;line-height:150%;">',
//         '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
//         htmlAddresses.join('<br />'),
//         '</div>'
//       ].join('\n'));

//       infoWindow.open(mapInstance.current, latlng);
//     });
//   };

//   const handleConfirm = () => {
//     if (selectedLocation && markerInstance.current) {
//       onSelectLocation({
//         lat: selectedLocation.latitude,
//         lng: selectedLocation.longitude,
//       });
//       onClose();
//     } else {
//       alert("위치를 선택해주세요.");
//     }
//   };

//   const makeAddress = (item: any) => {
//     if (!item) {
//       return '';
//     }

//     const name = item.name;
//     const region = item.region;
//     const land = item.land;
//     const isRoadAddress = name === 'roadaddr';

//     let sido = '';
//     let sigugun = '';
//     let dongmyun = '';
//     let ri = '';
//     let rest = '';

//     if (hasArea(region.area1)) {
//       sido = region.area1.name;
//     }

//     if (hasArea(region.area2)) {
//       sigugun = region.area2.name;
//     }

//     if (hasArea(region.area3)) {
//       dongmyun = region.area3.name;
//     }

//     if (hasArea(region.area4)) {
//       ri = region.area4.name;
//     }

//     if (land) {
//       if (hasData(land.number1)) {
//         if (hasData(land.type) && land.type === '2') {
//           rest += '산';
//         }

//         rest += land.number1;

//         if (hasData(land.number2)) {
//           rest += ('-' + land.number2);
//         }
//       }

//       if (isRoadAddress === true) {
//         if (checkLastString(dongmyun, '면')) {
//           ri = land.name;
//         } else {
//           dongmyun = land.name;
//           ri = '';
//         }

//         if (hasAddition(land.addition0)) {
//           rest += ' ' + land.addition0.value;
//         }
//       }
//     }

//     return [sido, sigugun, dongmyun, ri, rest].join(' ');
//   };

//   const hasArea = (area: any) => !!area && !!area.name && area.name !== '';
//   const hasData = (data: any) => !!data && data !== '';
//   const checkLastString = (word: string, lastString: string) => new RegExp(lastString + '$').test(word);
//   const hasAddition = (addition: any) => !!addition && !!addition.value;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-4 rounded shadow-lg w-3/4 h-3/4 relative">
//         <button onClick={onClose} className="absolute top-2 right-2">x</button>
//         <div ref={mapElement} style={{ width: '100%', height: '90%' }} className='mt-2'/>
//         <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white w-full font-bold py-2 px-4 mt-2 rounded">위치 선택</button>
//       </div>
//     </div>
//   );
// };

// export default MapModal;