"use client"

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserLocationAtom } from "../recoil/RecoilContext";

const Geolocation = () => {
  const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      // Geolocation API를 이용하여 사용자의 위치 정보를 가져오는 함수
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
              
            },
            (error) => {
              setError(error.message);
            }
          );
        } else {
          setError("현재 브라우저에서는 Geolocation을 지원하지 않습니다.");
        }
      };

  
      getLocation();
    }, []);

  return null; 
}

export default Geolocation;