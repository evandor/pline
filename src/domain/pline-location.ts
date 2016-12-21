export class PlineLocation {
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    icon: string;

    constructor (latitude?: number, longitude?: number, address?: string) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
    }
}