export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        city: string,
        zipcode: string
    },
    phone: string,
    website: string,
    company: {
        name: string,
        bs: string
    }
}