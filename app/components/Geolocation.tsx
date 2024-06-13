"use client"

import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { UserLocationAtom } from "../recoil/RecoilContext";

const Geolocation = () => {
  const [userLocation, setUserLocation] = useRecoilState(UserLocationAtom);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
      // Geolocation API를 이용하여 사용자의 위치 정보를 가져오는 함수
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Update userLocation atom with new latitude and longitude
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
          setError("Geolocation is not supported by this browser.");
        }
      };
  
      getLocation();
    }, []);


  return(
    <>
      <p>위도 : {userLocation.latitude}</p>
      <p>경도 : {userLocation.longitude}</p>
    </>
  );
}

export default Geolocation;