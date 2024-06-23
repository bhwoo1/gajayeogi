export type Attraction = {
    attractionimages: File[],
    attractionname: string,
    attractionlocation: Location,
    attractionaddress: string,
    attractioncategory: string,
    attractionexplain: string
}

export type Location = {
    latitude: number,
    longitude: number
}