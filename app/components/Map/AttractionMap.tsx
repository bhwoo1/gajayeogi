"use client";

import { useEffect, useRef } from 'react';

interface Props {
    attractionLat: number;
    attractionLng: number;
}

const AttractionMap = ({ attractionLat, attractionLng }: Props) => {
    const mapElement = useRef<HTMLDivElement>(null);
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    useEffect(() => {
        console.log(attractionLat + ", " + attractionLng);

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
                    logoControl: false, // 로고 컨트롤 숨김
                    mapDataControl: false, // 맵 데이터 컨트롤 숨김
                    zoomControl: false, // 줌 컨트롤 숨김
                    center: new window.naver.maps.LatLng(attractionLat, attractionLng),
                    zoom: 17,
                    disableDoubleClickZoom: true, // 더블 클릭으로 줌 비활성화
                    draggable: false, // 드래그 비활성화
                    scrollWheel: false, // 스크롤로 줌 비활성화
                });

                new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(attractionLat, attractionLng),
                    map: map,
                });

                window.naver.maps.Event.addListener(map, 'click', () => {
                    const url = `https://map.naver.com/v5/search/${attractionLat},${attractionLng}`;
                    window.open(url, '_blank');
                });
            }
        };

        loadNaverMapScript();
    }, [attractionLat, attractionLng, naverMapApiKey]);

    return (
        <div ref={mapElement} style={{ width: '250px', height: '250px', margin: '0 auto' }} />
    );
};

export default AttractionMap;