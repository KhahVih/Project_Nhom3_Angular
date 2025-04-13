import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


export interface Province {
    code: number;
    name: string;
}
  
export interface District {
    code: number;
    name: string;
}
  
export interface Ward {
    code: number;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
    private api = 'https://provinces.open-api.vn/api';

  constructor(private http: HttpClient) {}

  getProvinces(): Observable<any> {
    return this.http.get(`${this.api}/p`);
  }

  getDistricts(provinceCode: number): Observable<any> {
    return this.http.get(`${this.api}/p/${provinceCode}?depth=2`);
  }

  getWards(districtCode: number): Observable<any> {
    return this.http.get(`${this.api}/d/${districtCode}?depth=2`);
  }
}