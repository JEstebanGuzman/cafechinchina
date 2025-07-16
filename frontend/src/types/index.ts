
export interface Product {
  Id: number;
  Nombre: string;
  Precio: number;
  ImagenURL: string;
}

export interface User {
    Id: number;
    Nombre: string;
    Correo: string;
}

export interface DecodedUser {
    id: number;
    nombre: string;
    iat: number;
    exp: number;
}

export interface CartItem extends Product {
    quantity: number;
}
