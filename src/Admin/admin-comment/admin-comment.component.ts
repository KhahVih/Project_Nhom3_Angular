import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginService } from '../../Service/Login.Service';
import { CommentService } from '../../Service/Comment.Service';
import { Comment } from '../../Models/CommentDTO';

@Component({
  selector: 'app-admin-comment',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './admin-comment.component.html',
  styleUrl: './admin-comment.component.css'
})
export class AdminCommentComponent {
  comments: Comment[] = [];
  page: number = 1;
  totalPages: number = 1;

  newComment: Comment = {
    Id: 0,
    ProductId: 0,
    Vote: 0,
    Description: '',
    CreatedAt: null,
    CustomerId: null,
    IsShow: false,
    ProductName: '',
    CustomerName: ''
  };

  showAddForm: boolean = false;
  isEditing: boolean = false;
  isMenu: boolean = true;

  constructor(
    private commentService: CommentService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  openMenu(): void {
    this.isMenu = true;
  }

  closeMenu(): void {
    this.isMenu = false;
  }

  loadComments(): void {
    this.commentService.getComments(this.page).subscribe(data => {
      this.comments = data.Comments;
      this.totalPages = data.TotalPages;
      this.updateVisiblePages();
      console.log('Response: ', data);
    });
  }

  visiblePages: number[] = [];
  updateVisiblePages(): void {
    const maxVisible = 5; // Số trang hiển thị tối đa
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }
  // Phân trang
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.loadComments();
      this.updateVisiblePages()
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadComments();
      this.updateVisiblePages()
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadComments();
      this.updateVisiblePages()
    }
  }

  setVote(star: number): void {
    this.newComment.Vote = star;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;

    if (!this.showAddForm) {
      this.resetForm();
      this.isEditing = false;
    } else if (!this.isEditing) {
      this.resetForm();
    }
  }

  closeAddForm(): void {
    this.resetForm();
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
      IsShow: false,
      ProductName: '',
      CustomerName: ''
    };
  }

  logout(): void {
    this.login.logout();
    this.router.navigate(['admin/login']);
  }

  get isAdmin(): boolean {
    return this.login.isAdmin();
  }
}
