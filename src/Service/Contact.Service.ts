import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Contact } from "../Models/ContactDTO";

@Injectable({
    providedIn: 'root'
  })
  export class ContactService {
    private apiBaseUrl = 'https://localhost:7194'; // Thay bằng URL API của bạn
    private contactsUrl = `${this.apiBaseUrl}/api/Contact`;
  
    constructor(private http: HttpClient) {}
  
    getContacts(): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.contactsUrl).pipe(
        tap(contacts => console.log('Fetched contacts:', contacts)),
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
    }
  
    getContact(id: number): Observable<Contact> {
      const url = `${this.contactsUrl}/${id}`;
      return this.http.get<Contact>(url).pipe(
        tap(contact => console.log('Fetched contact:', contact)),
        catchError(this.handleError<Contact>('getContact'))
      );
    }
  
    createContact(contact: Contact): Observable<Contact> {
      return this.http.post<Contact>(this.contactsUrl, contact).pipe(
        tap(newContact => console.log('Created contact:', newContact)),
        catchError(this.handleError<Contact>('createContact'))
      );
    }
  
    updateContact(id: number, contact: Contact): Observable<void> {
      const url = `${this.contactsUrl}/${id}`;
      return this.http.put<void>(url, contact).pipe(
        tap(() => console.log(`Updated contact ID=${id}`)),
        catchError(this.handleError<void>('updateContact'))
      );
    }
  
    deleteContact(id: number): Observable<void> {
      const url = `${this.contactsUrl}/${id}`;
      return this.http.delete<void>(url).pipe(
        tap(() => console.log(`Deleted contact ID=${id}`)),
        catchError(this.handleError<void>('deleteContact'))
      );
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
  }