import { Component } from '@angular/core';
import { LoginService } from '../../Service/Login.Service';
import { Router, RouterLink } from '@angular/router';
import { CommentService } from '../../Service/Comment.Service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../Models/CommentDTO';

@Component({
  selector: 'app-admin-comment',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './admin-comment.component.html',
  styleUrl: './admin-comment.component.css'
})
export class AdminCommentComponent {
  // Nhận productId từ component cha
  comments: Comment[] = [];
  newComment: Comment = {
    Id: 0,
    ProductId: 0,
    Vote: 0,
    Description: '',
    CreatedAt: null,
    CustomerId: null,
    IsShow: true,
    ProductName: '',
    CustomerName: ''
  };
  showAddForm: boolean = false; // Hiển thị form mặc định để kiểm tra
  isEditing: boolean = false;
  isMenu = true;
  openMenu(){
    this.isMenu = true;
  }
  closeMenu(){
    this.isMenu = false;
  }
  constructor(private commentService: CommentService, private login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getComments().subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
        console.log(comments);
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      }
    });
  }
  setVote(star: number): void {
    this.newComment.Vote = star; // Cập nhật số sao khi người dùng nhấp
  }
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
      this.isEditing = false;
    } 
    else if(!this.isEditing){
      this.resetForm();
    }
  }
  closeAddForm(): void {
    this.resetForm()
    this.isEditing = false;
    this.showAddForm = false;
  }
  addComment(): void {
    this.commentService.createComment(this.newComment).subscribe({
      next: (comment: Comment) => {
        this.comments.push(comment);
        this.loadComments();
        this.closeAddForm();
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      }
    });
  }

  editComment(comment: Comment): void {
    this.isEditing = true;
    this.showAddForm = true;
    this.newComment = { ...comment };
  }

  updateComment(): void {
    if (!this.newComment.Id) {
      console.error('No comment ID provided for update');
      return;
    }

    this.commentService.updateComment(this.newComment.Id, this.newComment).subscribe({
      next: () => {
        this.comments = this.comments.map(c =>
          c.Id === this.newComment.Id ? { ...this.newComment } : c
        );
        this.loadComments();
        this.closeAddForm();
      },
      error: (error) => {
        console.error('Error updating comment:', error);
      }
    });
  }

  deleteComment(id: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter(c => c.Id !== id);
          if (this.isEditing && this.newComment.Id === id) {
            this.resetForm();
          }
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
        }
      });
    }
  }
  
  resetForm(): void {
    this.newComment = {
      Id: 0,
      ProductId: 0,
      Vote: 0,
      Description: '',
      CreatedAt: null,
      CustomerId: null,
      IsShow: true,
      ProductName: '',
      CustomerName: ''
    };
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
