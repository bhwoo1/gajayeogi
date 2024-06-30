"use client"

import { signIn, useSession } from "next-auth/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Attraction } from "../Type";
import MapModal from "../components/MapModal";
import Geolocation from "../components/Geolocation";
import { useRecoilState } from "recoil";
import { selectedAddressAtom } from "../recoil/RecoilContext";
import axios from "axios";

const initialAttractionState: Attraction = {
    attractionimages: [],
    attractionname: "",
    attractionlocation: {
        latitude: 0.0,
        longitude: 0.0
    },
    attractionaddress: "",
    attractioncategory: "",
    attractionexplain: ""
}

const Registration: React.FC = () => {
    const [attraction, setAttraction] = useState<Attraction>(initialAttractionState);
    const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
    const { data: session, status: sessionStatus } = useSession();
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const naverMapApiSecret = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET;
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    
    

    useEffect(() => {
        if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
        if (!session) {
          signIn("naver", { redirect: true });
        }
      }, [session, sessionStatus]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImages = Array.from(e.target.files).slice(0, 5); // 최대 5개의 이미지 선택
            if (attraction.attractionimages.length + selectedImages.length <= 5) {
                setAttraction(prevAttraction => ({
                    ...prevAttraction,
                    attractionimages: [...prevAttraction.attractionimages, ...selectedImages]
                }));
            } else {
                alert("최대 5개까지의 이미지만 업로드할 수 있습니다.");
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setAttraction(prevAttraction => ({
            ...prevAttraction,
            attractionimages: prevAttraction.attractionimages.filter((_, i) => i !== index)
        }));
    };

    const handleMapButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsMapModalOpen(true);
    };

    const handleSelectLocation = (location: { lat: number, lng: number }) => {
        setAttraction(prevAttraction => ({
          ...prevAttraction,
          attractionlocation: {
            latitude: location.lat,
            longitude: location.lng
          }
        }));

        reverseGeocode();
    };

    const reverseGeocode = async () => {
        // try {
        //     // const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${attraction.attractionlocation.longitude},${attraction.attractionlocation.latitude}&output=json`, {
        //     const response = await fetch(`https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${attraction.attractionlocation.longitude},${attraction.attractionlocation.latitude}&sourcecrs=epsg:4326&orders=roadaddr&output=json`, {
        //         headers: {
        //             'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID as string,
        //             'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET as string,
        //         },
        //         mode: 'no-cors'
        //     });
            
        //     // if (!response.ok) {
        //     //     throw new Error('리버스 지오코딩 요청 실패');
        //     // }
            
        //     const data = await response.json();
        //     const address = data.results[0].region.area1.name + ' ' + data.results[0].region.area2.name + ' ' + data.results[0].land.address;
        //     console.log(address);
        //     setSelectedAddress(address);
        //     setAttraction(prevAttraction => ({
        //         ...prevAttraction,
        //         attractionaddress: address
        //     }));
        // } catch (error) {
        //     console.error('리버스 지오코딩 에러:', error);
        //     alert('주소 변환에 실패했습니다.');
        // }

        try {
            const response = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc`, {
                params: {
                    coords: `${attraction.attractionlocation.longitude},${attraction.attractionlocation.latitude}`,
                    sourcecrs: 'epsg:4326',
                    orders: 'roadaddr',
                    output: 'json'
                },
                headers: {
                    'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID,
                    'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET,
                },
                // By default, axios performs a CORS check and sets mode: 'cors', 
                // so we do not need to specify 'mode: no-cors' like in fetch
            });
        
            const data = response.data;
            const address = data.results[0].region.area1.name + ' ' + data.results[0].region.area2.name + ' ' + data.results[0].land.address;
            console.log(address);
            setSelectedAddress(address);
            setAttraction(prevAttraction => ({
                ...prevAttraction,
                attractionaddress: address
            }));
        } catch (error) {
            console.error('리버스 지오코딩 에러:', error);
            alert('주소 변환에 실패했습니다.');
        }
    };

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-20">
            <Geolocation />
            {session ? 
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">관광지 등록</h2>
                    <p className="text-green-500 font-bold text-center text-sm">* 모든 항목은 필수입니다.</p>
                    <form className="space-y-6">
                        <div className="flex flex-col">
                            <div className="flex flex-wrap gap-4 mb-4">
                                {attraction.attractionimages.map((image, index) => (
                                    <div key={index} className="relative w-32 h-32">
                                        <img src={URL.createObjectURL(image)} alt={`상품 이미지 ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-sm p-1">
                                            <p className="font-bold">X</p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="image" className="mb-2 font-medium text-gray-700">사진 (최대 5개):</label>
                            <input type="file" name="auctionimages" id="image" multiple onChange={handleImageChange} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionname" className="mb-2 font-medium text-gray-700">이름:</label>
                            <input type="text" id="attractionname" name="attractionname" value={attraction.attractionname} onChange={(e) => setAttraction({ ...attraction, attractionname: e.target.value })} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractioncategory" className="mb-2 font-medium text-gray-700">카테고리:</label>
                            <select className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="attractioncategory" name="attractioncategory" value={attraction.attractioncategory} onChange={(e) => setAttraction({ ...attraction, attractioncategory: e.target.value })}>
                                <option value="">관광지</option>
                                <option>문화시설</option>
                                <option>축제공연행사</option>
                                <option>여행코스</option>
                                <option>레포츠</option>
                                <option>숙박</option>
                                <option>쇼핑</option>
                                <option>음식점</option>
                                <option>교통</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionaddress" className="mb-2 font-medium text-gray-700">위치:</label>
                            <input type="text" id="attractionaddress" name="attractionaddress" value={`${attraction.attractionlocation.latitude}, ${attraction.attractionlocation.longitude}`} onChange={(e) => setAttraction({ ...attraction, attractionaddress: e.target.value })} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button onClick={handleMapButtonClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded" ><p>지도에서 선택</p></button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-2 font-medium text-gray-700">설명:</label>
                            <textarea id="description" name="description" value={attraction.attractionexplain} onChange={(e) => setAttraction({ ...attraction, attractionexplain: e.target.value })} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">등록</button>
                    </form>
                </div>
            :
                <div className='flex justify-center items-center'>
                    <p className='font-semibold text-gray-700'>로그인이 필요합니다.</p>
                </div>
            }
            <MapModal 
                isOpen={isMapModalOpen} 
                onClose={() => setIsMapModalOpen(false)} 
                onSelectLocation={handleSelectLocation} 
            />
        </main>
    );
}

export default Registration;