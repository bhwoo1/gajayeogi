import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedAddressAtom, selectedLocationAtom, UserLocationAtom } from "../recoil/RecoilContext";

interface MapFunctions {
    getMap: () => void;
    getMapModal: (isOpen: boolean) => void;
    loadNaverMapScript: () => void;
    initializeMap: () => void;
    initializeMapWithLocation: (latitude: number, longitude: number) => void;
    initializeMapModal: () => void;
    handleReverseGeoCode: (lat: number, lng: number, map: any) => void;
    handleSearch: (address: string) => void;
}

export const useMap = (): MapFunctions => {
    const mapElement = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const userLocation = useRecoilValue(UserLocationAtom);
    const [selectedLocation, setSelectedLocation] = useRecoilState(selectedLocationAtom);
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    const [searchAddress, setSearchAddress] = useState<string>("");
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    const getMap = () => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.geolocation && window.naver && window.naver.maps) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    initializeMapWithLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    initializeMap();
                }
            );
        } else {
            loadNaverMapScript();
        }
    };

    const getMapModal = (isOpen: boolean) => {
        if (isOpen) {
            if (window.naver && window.naver.maps && window.naver.maps.Service) {
                initializeMapModal();
            } else {
                loadNaverMapModalScript();
            }
        }
    };


    const loadNaverMapScript = () => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
        script.async = true;
        script.onload = () => {
            initializeMap();
        };
        document.head.appendChild(script);
    };

    const loadNaverMapModalScript = () => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`;
        script.async = true;
        script.onload = initializeMapModal;
        script.onerror = () => alert('Naver Maps API 로드 실패');
        document.head.appendChild(script);
    }

    const initializeMap = () => {
        if (mapElement.current && window.naver && window.naver.maps) {
            const map = new window.naver.maps.Map(mapElement.current, {
                scaleControl: false,
                logoControl: true,
                mapDataControl: true,
                zoomControl: false,
                minZoom: 6,
                center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
                zoom: 18,
            });
        }
    };

    const initializeMapModal = () => {
        if (mapElement.current && window.naver && window.naver.maps) {
            const map = new window.naver.maps.Map(mapElement.current, {
                scaleControl: false,
                logoControl: true,
                mapDataControl: true,
                zoomControl: false,
                minZoom: 6,
                center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
                zoom: 18
            });

            mapInstance.current = map;

            window.naver.maps.Event.addListener(map, 'click', (e: any) => {
                const lat = e.coord.lat();
                const lng = e.coord.lng();

                setSelectedLocation({ latitude: lat, longitude: lng });

                handleReverseGeoCode(lat, lng, map);
            });
        } else {
            console.error('Naver Maps API is not loaded');
        }
    };

    const initializeMapWithLocation = (latitude: number, longitude: number) => {
        const locationBtnHtml = `
            <div class="relative">
                <div id="connectionInfo" class="absolute flex items-center bg-black opacity-0 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ease-in-out left-0 transform -translate-x-full whitespace-nowrap pointer-events-none">
                    <span class="text-white text-sm font-bold">접속 위치</span>
                </div>
                <a href="#" class="inline-flex items-center bg-white hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 ml-2 rounded-lg shadow-md">
                    <span class="text-2xl">𖣨</span>
                </a>
            </div>
        `;
        
        if (mapElement.current && window.naver && window.naver.maps) {
            const map = new window.naver.maps.Map(mapElement.current, {
                scaleControl: false,
                logoControl: true,
                mapDataControl: true,
                zoomControl: false,
                minZoom: 6,
                center: new window.naver.maps.LatLng(latitude, longitude),
                zoom: 18,
            });

            naver.maps.Event.once(map, 'init', function() {
                // CustomControl 객체 이용하기
                var customControl = new window.naver.maps.CustomControl(locationBtnHtml, {
                    position: window.naver.maps.Position.RIGHT_CENTER,
                });
            
                customControl.setMap(map);

                // 버튼에 마우스 오버 이벤트 리스너 추가
                const buttonElement = customControl.getElement().querySelector('a');
                if (buttonElement) {
                    naver.maps.Event.addDOMListener(buttonElement, 'mouseover', function() {
                        const connectionInfo = document.getElementById('connectionInfo');
                        if (connectionInfo) {
                            connectionInfo.style.opacity = '1';
                        }
                    });

                    // 버튼에 마우스 아웃 이벤트 리스너 추가
                    naver.maps.Event.addDOMListener(buttonElement, 'mouseout', function() {
                        const connectionInfo = document.getElementById('connectionInfo');
                        if (connectionInfo) {
                            connectionInfo.style.opacity = '0';
                        }
                    });

                    // 버튼 클릭 이벤트 리스너 등록
                    naver.maps.Event.addDOMListener(buttonElement, 'click', () => {
                        map.setCenter(new window.naver.maps.LatLng(latitude, longitude));
                        map.setZoom(18);
                    });
                }
            });
        }
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

    return {
        getMap,
        getMapModal,
        loadNaverMapScript,
        initializeMap,
        initializeMapWithLocation,
        initializeMapModal,
        handleReverseGeoCode,
        handleSearch
    };
};