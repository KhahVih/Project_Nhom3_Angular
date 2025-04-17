import { Injectable } from "@angular/core";
import { HistoryService } from "./History.Service";
import { CustomerService } from "./Customer.Service";
import { History } from "../Models/HistoryDTO";

@Injectable({
    providedIn: 'root'
  })
  export class ActivityTrackerService{
    constructor(private history: HistoryService, private customer: CustomerService){}
    // ghi lại hoạt động của người dùng 
    trackActivity(Action: string, Description: string): void{
        const CustomerId = this.customer.getCustomerId();
        if(CustomerId){
            const history: History = {
                CustomerId: CustomerId,
                Action: Action,
                Description: Description,
                CreatedAt: new Date()
            };

            this.history.addHistory(history).subscribe({
                next: (reponse) => console.log('Hoạt động đã được ghi lại: ', reponse),
                error: (err) => console.error('Lỗi khi ghi hoạt động: ', err)
            })

        }
        else{
            console.warn('Không tìm thấy Id của người dùng trong localStorage');
        }
    }
  }