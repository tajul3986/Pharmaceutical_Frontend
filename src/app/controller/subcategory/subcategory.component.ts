import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { Subcategory } from 'src/app/model/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
subcategories: Subcategory[] = [];
  categories: Category[] = [];
  
  newSubcategory: Subcategory = { name: '', categoryId: 0 };
  isEditing = false;
  editId: number | null = null;

  constructor(
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadSubcategories();   
  }

  loadSubcategories() {
    this.subcategoryService.getSubcategories().subscribe((data) => {
      this.subcategories = data.map((sub) => {
        const category = this.categories.find((c) => c.id === sub.categoryId);
        return { ...sub,
          categoryName: category ? category.name : 'Unknown'
         };
      });
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit(form: any) {
    const selectedCategory = this.categories.find(
      (c) => c.id === this.newSubcategory.categoryId
    );
    if (selectedCategory) {
      this.newSubcategory.categoryName = selectedCategory.name;
    }

    if (this.isEditing && this.editId !== null) {
      this.subcategoryService
        .updateSubcategory(this.editId, this.newSubcategory)
        .subscribe(() => {
          this.resetForm(form);
          this.loadSubcategories();
        }); 
        
        
    } 
       
    else {
      this.subcategoryService
        .addSubcategory(this.newSubcategory)
        .subscribe(() => {
          this.resetForm(form);
          this.loadSubcategories();
        });
    }
  }

  editSubcategory(sub: Subcategory) {
    this.newSubcategory = { ...sub };
    this.isEditing = true;
    this.editId = sub.id ?? null;
  }

  deleteSubcategory(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subcategoryService.deleteSubcategory(id).subscribe(() => {
          this.loadSubcategories();
          Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        });
      }
    });
  }

  resetForm(form: any) {
    form.resetForm();
    this.newSubcategory = { name: '', categoryId: 0 };
    this.isEditing = false;
    this.editId = null;
  }
}
