export type Attraction = {
    attractionImages: File[],
    attractionName: string,
    attractionLocation: Location,
    attractionAddress: string,
    attractionExplain: string
}

export type Location = {
    latitude: number,
    longitude: number
}

export type RecieveAttraction = {
    postlocation: string,
    postcontent: string,
    postid: string,
    postimgurl: string[],
    postoldimg: string,
    posttitle: string,
    postuser: string,
    postusername: string,
    postxpoint: string,
    postypoint: string,
    suggest: string,
}

export type TourAttraction = {
    addr1: string,
    addr2: string,
    areacode: string,
    booktour: string,
    cat1: string,
    cat2: string,
    cat3: string,
    contentid: string,
    contenttypeid: string,
    cpyrhtDivCd: string,
    createdtime: string,
    dist: string,
    firstimage: string,
    firstimage2: string,
    mapx: string,
    mapy: string,
    mlevel: string,
    modifiedtime: string,
    sigungucode: string,
    tel: string,
    title: string
}

export type AreaJsonType = {
    [key: string]: {
        name: string;
        sigungucode: {
            [key: string]: string;
        };
    };
};

export type UserData = {
    userid: number,
    username: string,
    introduction: string,
    postwriteids: string[],
    reviewwriteids: string[],
    scrapids: string[],
    visitids: string[],
}

export const areas: { [key: string]: string[] } = {
    "서울특별시": [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구",
        "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구",
        "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
    ],
    "인천광역시": [
        "강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "웅진군", "중구"
    ],
    "대전광역시": [
        "대덕구", "동구", "서구", "유성구", "중구"
    ],
    "대구광역시": [
        "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"
    ],
    "광주광역시": [
        "광산구", "남구", "동구", "북구", "서구"
    ],
    "부산광역시": [
        "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구",
        "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
    ],
    "울산광역시": [
        "중구", "남구", "동구", "북구", "울주군"
    ],
    "세종특별자치시": [
        "세종특별자치시"
    ],
    "경기도": [
        "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시",
        "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시",
        "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시",
        "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"
    ],
    "강원특별자치도": [
        "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군",
        "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군",
        "화천군", "횡성군"
    ],
    "충청북도": [
        "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군",
        "청주시", "충주시", "증평군"
    ],
    "충청남도": [
        "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군",
        "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군", "계룡시"
    ],
    "경상북도": [
        "경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시",
        "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군",
        "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"
    ],
    "경상남도": [
        "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군",
        "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군",
        "함양군", "합천군"
    ],
    "전북특별자치도": [
        "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군",
        "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"
    ],
    "전라남도": [
        "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시",
        "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군",
        "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
    ],
    "제주특별자치도": [
        "서귀포시", "제주시"
    ]
};