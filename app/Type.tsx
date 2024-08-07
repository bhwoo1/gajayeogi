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