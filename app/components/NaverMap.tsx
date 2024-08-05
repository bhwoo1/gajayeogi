"use client"

import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserLocationAtom } from '../recoil/RecoilContext';
import axios from 'axios';
import { TourAttraction } from '../Type';
import Link from 'next/link';
import AttractionList from './AttractionList';


const NaverMap = () => {
    const userLocation = useRecoilValue(UserLocationAtom);
    const mapElement = useRef<HTMLDivElement>(null);
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const [tourAPIAttraction, setTourAPIAttraction] = useState<TourAttraction[]>([]);

    useEffect(() => {

        axios.get("http://localhost:8080/api/tour/info", {
            params: {
                postxpoint: userLocation.longitude,
                postypoint: userLocation.latitude
            },
            withCredentials: true
        })
        .then((res) => {
            // console.log(res.data.response.body.items.item);
            setTourAPIAttraction(res.data.response.body.items.item);
            
        })
        .catch((err) => {
            console.log(err);
        });
    }, [userLocation]);

    useEffect(() => {
        console.log("투어API : ");
        console.log(tourAPIAttraction)
    
        const loadNaverMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
            script.async = true;
            script.onload = () => {
                initializeMap();
            };
            document.head.appendChild(script);
        };

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

                // // userLocation에 마커 생성
                // const marker = new window.naver.maps.Marker({
                //     position: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
                //     map: map
                // });


                tourAPIAttraction.forEach(attraction => {
                    new window.naver.maps.Marker({
                        position: new window.naver.maps.LatLng(Number(attraction.mapy), Number(attraction.mapx)),
                        map: map
                    });
                });
            }
        };

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
    }, [tourAPIAttraction]);


    
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


            tourAPIAttraction.forEach(attraction => {
                new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(Number(attraction.mapy), Number(attraction.mapx)),
                    map: map
                });
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

    return (
        <div className='flex flex-col w-full'>
            <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
            <AttractionList attractionArray={tourAPIAttraction} />
        </div>
    );
};

export default NaverMap;