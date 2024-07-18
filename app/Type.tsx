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