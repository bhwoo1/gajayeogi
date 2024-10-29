"use client"

import { signIn, useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Attraction } from "../Type";
import MapModal from "../components/Map/MapModal";
import Geolocation from "../components/Map/Geolocation";
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
    attractionExplain: ""
}

const Registration: React.FC = () => {
    const [attraction, setAttraction] = useState<Attraction>(initialAttractionState);
    const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
    const { data: session, status: sessionStatus } = useSession();
    const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressAtom);
    const [charCount, setCharCount] = useState<number>(attraction.attractionExplain.length);
    const maxLength = 200;
    const router = useRouter();
    
    

    useEffect(() => {
        if (sessionStatus === "loading") return; // 세션 로딩 중일 때는 아무것도 하지 않음
        if (!session) {
          // signIn("naver", { redirect: true });
            router.push("/login");
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

        // 설명이 없을 때 경고 메시지 표시
        if (attraction.attractionExplain === "") {
            alert('설명을 등록해주세요.');
            return; // 설명이 없으면 함수 종료
        };

        if(attraction.attractionExplain.length > 200) {
            alert("200자 이하로 입력해주세요!");
            return;
        }

        // 설명에 공백 문자를 특수문자로 변환
        const modifiedContent = attraction.attractionExplain.replace(/\n/g, "§");
        const formData = new FormData();
        for (const image of attraction.attractionImages) {
            formData.append('postimg', image);
        };
        formData.append('posttitle', attraction.attractionName);
        formData.append('postlocation', attraction.attractionAddress);
        formData.append('postxpoint', String(attraction.attractionLocation.latitude));
        formData.append('postypoint', String(attraction.attractionLocation.longitude));
        formData.append('postcontent', modifiedContent);
        formData.append('postuser', String(session?.user?.email));
        formData.append('postusername', String(session?.user?.name));

        axios.post("https://gajayeogi.shop/postwrite", formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
            }
        })
        .then((res) => {
            alert('등록이 완료되었습니다.');
            router.push("/wherewego");
        })
        .catch((err) => {
            console.log(err);
            alert('등록에 실패하였습니다.');
        });
    }    

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImages = Array.from(e.target.files).slice(0, 5); // 최대 5개의 이미지 선택
            if (attraction.attractionImages.length + selectedImages.length <= 5) {
                setAttraction(prevAttraction => ({
                    ...prevAttraction,
                    attractionImages: [...prevAttraction.attractionImages, ...selectedImages]
                }));
            } else {
                alert("최대 5개까지의 이미지만 업로드할 수 있습니다.");
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setAttraction(prevAttraction => ({
            ...prevAttraction,
            attractionImages: prevAttraction.attractionImages.filter((_, i) => i !== index)
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
    };

    const handleSelectAddress = (address: string) => {
        setAttraction(prevAttraction => ({
            ...prevAttraction,
            attractionAddress: address
        }));
    };

    const handleIntroductionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setAttraction({ ...attraction, attractionExplain: e.target.value });
        setCharCount(value.length);
    }
    

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
                            <label htmlFor="attractionaddress" className="mb-2 font-medium text-gray-700">위치:</label>
                            <input type="text" id="attractionAddress" name="attractionAddress" 
                                value={attraction.attractionAddress} 
                                onChange={(e) => setAttraction({ ...attraction, attractionAddress: e.target.value })} 
                                className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                readOnly
                            />
                            <button onClick={handleMapButtonClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded" ><p>지도에서 선택</p></button>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="attractionExplain" className="mb-2 font-medium text-gray-700">설명:</label>
                            <textarea id="attractionExplain" name="attractionExplain" value={attraction.attractionExplain} onChange={(e) => handleIntroductionChange(e)} className={`border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                charCount > maxLength ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                            }`} />
                            <div className="flex justify-between items-center mt-1">
                                <span
                                className={`text-sm ${charCount > maxLength ? 'text-red-500' : 'text-gray-500'}`}
                                >
                                {charCount}/{maxLength}
                                </span>
                                {charCount > maxLength && (
                                <span className="text-sm text-red-500">200자를 초과할 수 없습니다.</span>
                                )}
                            </div>
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
                onSelectAddress={handleSelectAddress}
            />
        </main>
    );
}

export default Registration;