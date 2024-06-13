"use client"

import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const naverMapApiKey = process.env.NAVER_MAP_CLIENT_ID;

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
          center: new window.naver.maps.LatLng(37.5665, 126.9780), // 예: 서울시청 좌표
          zoom: 10,
        });
      }
    };

    if (typeof window !== 'undefined' && window.naver && window.naver.maps) {
      initializeMap();
    } else {
      loadNaverMapScript();
    }
  }, []);

  return <div ref={mapElement} style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;