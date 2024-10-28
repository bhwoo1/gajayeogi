import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedAttractionAtom, UserLocationAtom } from '../../recoil/RecoilContext';
import axios from 'axios';
import { TourAttraction } from '../../Type';
import AttractionList from '../Attraction/AttractionList';
import { FaSearch } from 'react-icons/fa';

const NaverMap = () => {
    const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom);
    const selectedAttraction = useRecoilValue(selectedAttractionAtom);
    const mapElement = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY;
    const [tourAPIAttraction, setTourAPIAttraction] = useState<TourAttraction[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    useEffect(() => {
        const fetchTourAttractions = async () => {
            try {
                const response = await axios.get("http://117.52.84.144:8080/api/tour/info", {
                    params: {
                        postxpoint: userLocation.longitude,
                        postypoint: userLocation.latitude
                    },
                    withCredentials: true
                });
                setTourAPIAttraction(response.data.response.body.items.item);
            } catch (error) {
                console.error("Error fetching tour attractions:", error);
            }
        };

        fetchTourAttractions();
    }, [userLocation]);

    useEffect(() => {
        const loadNaverMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}&submodules=geocoder`;
            script.async = true;
            script.onload = () => {
                console.log("Naver Map Script Loaded");
                initializeMap();
            };
            script.onerror = () => {
                console.error("Failed to load Naver Map Script");
            };
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
                    zoom: 15,
                });
    
                console.log("지도 초기화 완료");
    
                if (tourAPIAttraction) {
                    tourAPIAttraction.forEach(attraction => {
                        new window.naver.maps.Marker({
                            position: new window.naver.maps.LatLng(Number(attraction.mapy), Number(attraction.mapx)),
                            map: mapInstance.current
                        });
                    });
                } else {
                    alert('해당 지역에서 장소 검색에 실패하였습니다.');
                }
    
                // 커스텀 컨트롤
                const locationBtnHtml = `
                    <div class="relative">
                        <div id="connectionInfo" class="absolute flex items-center bg-black opacity-0 rounded-full px-3 py-1 mt-1 transition-opacity duration-300 ease-in-out left-0 transform -translate-x-full whitespace-nowrap pointer-events-none">
                            <span class="text-white text-sm font-bold">현재 위치에서 찾기</span>
                        </div>
                        <a href="#" class="inline-flex items-center bg-white hover:bg-gray-200 text-gray-800 font-bold py-1 px-2 ml-2 rounded-lg shadow-md">
                            <span class="text-2xl">👀</span>
                        </a>
                    </div>
                `;
    
                naver.maps.Event.once(mapInstance.current, 'init', function() {
                    var customControl = new window.naver.maps.CustomControl(locationBtnHtml, {
                        position: window.naver.maps.Position.RIGHT_CENTER,
                    });
                
                    customControl.setMap(mapInstance.current);
        
                    const buttonElement = customControl.getElement().querySelector('a');
                    if (buttonElement) {
                        naver.maps.Event.addDOMListener(buttonElement, 'mouseover', function() {
                            const connectionInfo = document.getElementById('connectionInfo');
                            if (connectionInfo) {
                                connectionInfo.style.opacity = '1';
                            }
                        });
        
                        naver.maps.Event.addDOMListener(buttonElement, 'mouseout', function() {
                            const connectionInfo = document.getElementById('connectionInfo');
                            if (connectionInfo) {
                                connectionInfo.style.opacity = '0';
                            }
                        });
        
                        naver.maps.Event.addDOMListener(buttonElement, 'click', () => {
                            const center = mapInstance.current.getCenter();
                            const lat = center.lat();
                            const lng = center.lng();

    
                            setUserLocation({
                                latitude: lat,
                                longitude: lng
                            });

                            
                        });
                    }
                });
                

            } else {
                console.error("지도 초기화 실패: 지도 요소 또는 네이버 맵 객체를 찾을 수 없습니다.");
            }
        };
    
        loadNaverMapScript();

    
    }, [tourAPIAttraction, userLocation]);

    useEffect(() => {
        if (selectedAttraction && mapInstance.current) {
            mapInstance.current.setCenter(new window.naver.maps.LatLng(Number(selectedAttraction.mapy), Number(selectedAttraction.mapx)));
            mapInstance.current.setZoom(18);
        }
    }, [selectedAttraction]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchKeyword);
    };

    const handleSearch = (keyword: string) => {
        if (window.naver && window.naver.maps && window.naver.maps.Service) {
            window.naver.maps.Service.geocode(
                { query: keyword },
                (status: any, res: any) => {
                    if (status === window.naver.maps.Service.Status.OK) {
                        if (res.v2.addresses.length > 0) {
                            const resAddress = res.v2.addresses[0];
                            const lng = parseFloat(resAddress.x);
                            const lat = parseFloat(resAddress.y);

                            mapInstance.current.setCenter(new window.naver.maps.LatLng(lat, lng));

                            setUserLocation({
                                latitude: lat,
                                longitude: lng
                            });
                        } else {
                            alert("검색 실패");
                        }
                    } else {
                        alert("검색 실패");
                    }
                }
            );
        } else {
            alert("Naver Maps Service is not available");
        }
    };

    return (
        <div className='flex flex-col w-full'>
            <div className="w-full mx-auto ">
                <form onSubmit={handleSubmit} className="w-full border p-2 rounded-lg bg-gray-100 flex flex-row">
                    <input
                        type="text"
                        className="w-full bg-gray-100 focus:outline-none"
                        placeholder="검색할 지역을 입력해주세요.(예 : 서울특별시 강남구, 충청남도 천안시 등)"
                        value={searchKeyword}
                        onChange={handleInputChange}
                    />
                    <button className="p-2"><FaSearch /></button> 
                </form>
            </div>
            <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
            <AttractionList attractionArray={tourAPIAttraction} />
        </div>
    );
};

export default NaverMap;

