"use client"

import { signIn, useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Attraction } from "../Type";
import MapModal from "../components/MapModal";
import Geolocation from "../components/Geolocation";
import { useRecoilState } from "recoil";
import { selectedAddressAtom } from "../recoil/RecoilContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const initialAttractionState: Attraction = {
    attractionImages: [],
    attractionName: "",
    attractionLocation: {
        latitude: 0.0,
        longitude: 0.0
    },
    attractionAddress: "",
    attractionCategory: "",
    attractionExplain: ""
}

const Registration: React.FC = () => {
    const [attraction, setAttraction] = useState<Attraction>(initialAttractionState);
    const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
    const { data: session, status: sessionStatus } = useSession();
    const naverMapApiKey = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const naverMapApiSecret = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_SECRET;
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    const router = useRouter();
    
    

    useEffect(() => {
        if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
        if (!session) {
          signIn("naver", { redirect: true });
        }
    }, [session, sessionStatus]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 이미지가 없을 때 경고 메시지 표시
        if (attraction.attractionImages.length === 0) {
            alert('이미지를 등록해주세요.');
            return; // 이미지가 없으면 함수 종료
        };

        // 이름이 없을 때 경고 메시지 표시
        if (attraction.attractionName === "") {
            alert('이름을 등록해주세요.');
            return; // 이름이 없으면 함수 종료
        };

        // 주소가 없을 때 경고 메시지 표시
        if (attraction.attractionCategory === "") {
            alert('카테고리를 선택해주세요.');
            return; // 카테고리가 없으면 함수 종료
        };

        // 설명이 없을 때 경고 메시지 표시
        if (attraction.attractionExplain === "") {
            alert('설명을 등록해주세요.');
            return; // 설명이 없으면 함수 종료
        };

        // 설명에 공백 문자를 특수문자로 변환
        const modifiedContent = attraction.attractionExplain.replace(/\n/g, "§");

        const formData = new FormData();
        for (const image of attraction.attractionImages) {
            formData.append('postimg', image);
        };
        formData.append('posttitle', attraction.attractionName);
        formData.append('location', attraction.attractionAddress);
        formData.append('xpoint', String(attraction.attractionLocation.latitude));
        formData.append('ypoint', String(attraction.attractionLocation.longitude));
        formData.append('postcontent', attraction.attractionExplain);
        formData.append('postuser', String(session?.user?.email));
        formData.append('postusername', String(session?.user?.name));

        axios.post("http://localhost:8080/postwrite", formData,{
            headers: {
                'Content-Type' : 'multipart/form-data',
            }
        })
        .then((res) => {
            console.log(res);
            alert('등록이 완료되었습니다.');
            router.push("/B");
        })
        .catch((err) => {
            console.log(err);
            alert('등록에 실패하였습니다.');
        })
    }    

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImages = Array.from(e.target.files).slice(0, 5); // 최대 5개의 이미지 선택
            if (attraction.attractionImages.length + selectedImages.length <= 5) {
                setAttraction(prevAttraction => ({
                    ...prevAttraction,
                    attractionimages: [...prevAttraction.attractionImages, ...selectedImages]
                }));
            } else {
                alert("최대 5개까지의 이미지만 업로드할 수 있습니다.");
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setAttraction(prevAttraction => ({
            ...prevAttraction,
            attractionimages: prevAttraction.attractionImages.filter((_, i) => i !== index)
        }));
    };

    const handleMapButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsMapModalOpen(true);
    };

    const handleSelectLocation = (location: { lat: number, lng: number }) => {
        setAttraction(prevAttraction => ({
          ...prevAttraction,
          attractionLocation: {
            latitude: location.lat,
            longitude: location.lng
          }
        }));

        //reverseGeocode();
    };

    // const reverseGeocode = async () => {
    //     const lng = attraction.attractionLocation.longitude;
    //     const lat = attraction.attractionLocation.latitude;
        
    //     try {
    //         //const response = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=126.9780,37.5665&orders=roadaddr&output=json`, {
    //         const response = await axios.get(`/v2/gc?coords=${lng},${lat}&orders=roadaddr&output=json`, {    
    //             headers: {
    //                     'X-NCP-APIGW-API-KEY-ID': naverMapApiKey,
    //                     'X-NCP-APIGW-API-KEY': naverMapApiSecret,
    //                 }
    //         });

    //         const address = response.data.results[0].region.area1.name + ' ' +
    //                         response.data.results[0].region.area2.name + ' ' +
    //                         response.data.results[0].region.area3.name + ' ' +
    //                         response.data.results[0].land.name;

    //         setSelectedAddress(address); // 선택된 주소를 Recoil 상태에 저장
    //         setAttraction(prevAttraction => ({
    //             ...prevAttraction,
    //             attractionAddress: address // attraction 객체에 주소 추가
    //         }));
    //     } catch (error) {
    //         console.error('Reverse geocoding error:', error);
    //         alert('주소 변환에 실패했습니다.');
    //     }

    //     // const coords = new Map();

    //     // coords.set('latitude',  attraction.attractionLocation.latitude);
    //     // coords.set('longitude', attraction.attractionLocation.longitude);


    //     // console.log(coords);
        

    //     // try {
    //     //     const response = await axios.post('/', coords, {
    //     //         withCredentials: true,
    //     //     });
    
    //     //     const data = response.data;
    //     //     const address = data.address;
    //     //     console.log(String(address));
    //     //     setSelectedAddress(address);
    //     //     setAttraction(prevAttraction => ({
    //     //         ...prevAttraction,
    //     //         attractionaddress: address
    //     //     }));
    //     // } catch (error) {
    //     //     console.error('리버스 지오코딩 에러:', error);
    //     //     alert('주소 변환에 실패했습니다.');
    //     // }
    // };

    

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-20">
            <Geolocation />
            {session ? 
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">관광지 등록</h2>
                    <p className="text-green-500 font-bold text-center text-sm">* 모든 항목은 필수입니다.</p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <div className="flex flex-wrap gap-4 mb-4">
                                {attraction.attractionImages.map((image, index) => (
                                    <div key={index} className="relative w-32 h-32">
                                        <img src={URL.createObjectURL(image)} alt={`상품 이미지 ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                        <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-sm p-1">
                                            <p className="font-bold">X</p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="image" className="mb-2 font-medium text-gray-700">사진 (최대 5개):</label>
                            <input type="file" name="auctionImages" id="image" multiple onChange={handleImageChange} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionName" className="mb-2 font-medium text-gray-700">이름:</label>
                            <input type="text" id="attractionName" name="attractionName" value={attraction.attractionName} 
                                onChange={(e) => setAttraction({ ...attraction, attractionName: e.target.value })} 
                                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionCategory" className="mb-2 font-medium text-gray-700">카테고리:</label>
                            <select className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="attractionCategory" name="attractionCategory" 
                                value={attraction.attractionCategory} 
                                onChange={(e) => setAttraction({ ...attraction, attractionCategory: e.target.value })}
                            >
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
                            <input type="text" id="attractionAddress" name="attractionAddress" 
                                value={attraction.attractionAddress} 
                                onChange={(e) => setAttraction({ ...attraction, attractionAddress: e.target.value })} 
                                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <button onClick={handleMapButtonClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded" ><p>지도에서 선택</p></button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionExplain" className="mb-2 font-medium text-gray-700">설명:</label>
                            <textarea id="attractionExplain" name="attractionExplain" value={attraction.attractionExplain} onChange={(e) => setAttraction({ ...attraction, attractionExplain: e.target.value })} className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        >
                                등록
                        </button>
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