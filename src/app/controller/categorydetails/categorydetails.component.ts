import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit {

  onSubmit() {
throw new Error('Method not implemented.');
}

  categories: Category[] = [];
category: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  deleteCategory(id?: number): void {
    if (!id) return;
    this.categoryService.delete(id).subscribe(() => {
      this.loadCategories();
    });
  }

}
