"use client"

import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { UserLocationAtom } from '../recoil/RecoilContext';

const NaverMap = () => {
    const userLocation = useRecoilValue(UserLocationAtom);
    const mapElement = useRef<HTMLDivElement>(null);
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    useEffect(() => {
        const loadNaverMapScript = () => {
            const script = document.createElement('script');
             script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapApiKey}`;
            // script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=li8s3sk6dv`;
            script.async = true;
            script.onload = () => {
                initializeMap();
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (mapElement.current && window.naver && window.naver.maps) {
                const map = new window.naver.maps.Map(mapElement.current, {
                    scaleControl: true,
                    logoControl: true,
                    mapDataControl: true,
                    zoomControl: false,
                    minZoom: 6,
                    center: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
                    zoom: 18,
                });

                // const point = new window.naver.maps.Point(userLocation.longitude, userLocation.latitude);
                // const marker = new window.naver.maps.Marker({
                //     position: new window.naver.maps.LatLng(userLocation.latitude, userLocation.longitude),
                //     map: map,
                //     icon: {
                //         content: '<div style="width: 10px; height: 10px; background-color: blue; border-radius: 50%;"></div>',
                //         anchor: new window.naver.maps.Point(5, 5), // 점의 중심을 가운데로 설정
                //     },
                // });
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
    }, []);


    
    const initializeMapWithLocation = (latitude: number, longitude: number) => {
        if (mapElement.current && window.naver && window.naver.maps) {
            const map = new window.naver.maps.Map(mapElement.current, {
                scaleControl: true,
                logoControl: true,
                mapDataControl: true,
                zoomControl: false,
                minZoom: 6,
                center: new window.naver.maps.LatLng(latitude, longitude),
                zoom: 18,
            });

            // // Add point for user's current location
            // const point = new window.naver.maps.Point(longitude, latitude);
            // const marker = new window.naver.maps.Marker({
            //     position: new window.naver.maps.LatLng(latitude, longitude),
            //     map: map,
            //     icon: {
            //         content: '<div style="width: 10px; height: 10px; background-color: blue; border-radius: 50%; "></div>',
            //         anchor: new window.naver.maps.Point(5, 5), // 점의 중심을 가운데로 설정합니다.
            //     },
            // });
        }
    };

    return (
        <div ref={mapElement} style={{ width: '100%', height: '400px' }} />
    );
};

export default NaverMap;