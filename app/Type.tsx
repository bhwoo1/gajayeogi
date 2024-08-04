export type Attraction = {
    attractionImages: File[],
    attractionName: string,
    attractionLocation: Location,
    attractionAddress: string,
    attractionCategory: string,
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
    postcategory: string
}