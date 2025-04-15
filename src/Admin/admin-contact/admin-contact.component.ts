import { Component } from "@angular/core";
import { Contact } from "../../Models/ContactDTO";
import { ContactService } from "../../Service/Contact.Service";
import { LoginService } from "../../Service/Login.Service";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";



@Component({
  selector: 'app-admin-contact',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.css'
})
export class AdminContactComponent {
  isModalOpen = false;
  contacts: Contact[] = [];
  newContact: Contact = {
    Id: 0,
    Fullname: '',
    Email: '',
    Phonenumber: '',
    Title: '',
    Description: '',
    CreatedAt: new Date()
  };
  isEditing: boolean = false;
  showAddForm: boolean = false;
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  constructor(private contactService: ContactService, private login: LoginService, private router: Router) {}

  //mở modal them nhan su 
  openModal(): void {
    this.isModalOpen = true;
  }
  // Đóng modal
  closeModal(): void {
    this.isModalOpen = false;
  }
  // Xác nhận và lưu dữ liệu từ modal
  confirmModal(): void {
    this.closeModal(); // Đóng modal sau khi xác nhận
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  addContact(): void {
    this.contactService.createContact(this.newContact).subscribe({
      next: (contact: Contact) => {
        this.contacts.push(contact);
        this.resetForm();
        this.showAddForm = false;
        this.loadContacts();
      },
      error: (error) => {
        console.error('Error adding contact:', error);
      }
    });
  }

  // editContact(contact: ContactDTO): void {
  //   this.isEditing = true;
  //   this.newContact = { ...contact };
  //   this.showAddForm = true;
  // }

  // updateContact(): void {
  //   if (!this.newContact.Id) {
  //     console.error('No contact ID provided for update');
  //     return;
  //   }

  //   this.contactService.updateContact(this.newContact.Id, this.newContact).subscribe({
  //     next: () => {
  //       this.contacts = this.contacts.map(c =>
  //         c.Id === this.newContact.Id ? { ...this.newContact } : c
  //       );
  //       this.resetForm();
  //       this.showAddForm = false;
  //     },
  //     error: (error) => {
  //       console.error('Error updating contact:', error);
  //     }
  //   });
  // }

  // deleteContact(id: number): void {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     this.contactService.deleteContact(id).subscribe({
  //       next: () => {
  //         this.contacts = this.contacts.filter(c => c.Id !== id);
  //         if (this.isEditing && this.newContact.Id === id) {
  //           this.resetForm();
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error deleting contact:', error);
  //       }
  //     });
  //   }
  // }

  resetForm(): void {
    this.newContact = {
      Id: 0,
    Fullname: '',
    Email: '',
    Phonenumber: '',
    Title: '',
    Description: '',
    CreatedAt: new Date()
    };
    this.isEditing = false;
    this.showAddForm = false;
  }

  //
  logout(){
    this.login.logout();
    this.router.navigate(['admin/login']);
  }
  get isAdmin(): boolean{
    return this.login.isAdmin();
  }

}

