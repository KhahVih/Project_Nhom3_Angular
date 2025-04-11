import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sale } from "../Models/SaleDTO";

@Injectable({
    providedIn: 'root'
})

export class SaleService{
    private url = 'https://localhost:7194/api/Sale';
    constructor(private http: HttpClient){}

    // Get sale
    GetSale(): Observable<Sale[]>{
        return this.http.get<Sale[]>(`${this.url}/GetSale`);
    }
    
}