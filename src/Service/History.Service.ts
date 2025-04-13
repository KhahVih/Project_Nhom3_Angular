import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { History } from "../Models/HistoryDTO";

@Injectable({
    providedIn: 'root'
  })
  export class HistoryService {
    private apiUrl = 'https://localhost:7194/api/History'; // Thay bằng URL API của bạn
  
    constructor(private http: HttpClient) { }
  
    addHistory(history: History): Observable<any> {
      return this.http.post<any>(this.apiUrl, history);
    }
    
    getHistory(): Observable<any>{
        return this.http.get<any>(this.apiUrl);
    }
  }