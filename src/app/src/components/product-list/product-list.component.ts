import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/src/services/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Product } from 'src/app/src/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit  {

  //subscription list
  productListsub:any;
  productSearchSub:any;
  productAddSub:any;
  productUpdateSub:any;
  productDeleteSub:any;


  productList:Product[] = [];
  productSearchtList:Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'brand', 'category','actions'];
  dataSource = new MatTableDataSource<Product>();

  isUpdate:boolean = false;
  submitted:boolean = false;
  errorMsg:any = null;
  successMsg:any = null;
  errorSearch:any = null;

  searchControl = new FormControl('');

  productForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required,Validators.minLength(4)]),
    description: new FormControl(''),
    price: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    brand: new FormControl('',[Validators.required]),
    category: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService:ProductService,private _liveAnnouncer: LiveAnnouncer){}

  //Propeties
  get productFormControl() {
    return this.productForm.controls;
  }

  get brandList() {
    const unique = this.productList!=null?[...new Set(this.productList.map(item => item.brand))]:[]; 
    return unique;
  }

  get categoryList() {
    const unique = this.productList!=null?[...new Set(this.productList.map(item => item.category))]:[]; 
    return unique;
  }

  // Lifecycle hooks
  ngOnInit(){
    this.GetProductList();
    this.errorMsg = null;
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Product>(this.productList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.disableClear = true;
  }
  ngOnDestroy(){
    //unsubscribe all subsciptions
    if(this.productListsub) this.productListsub.unsubscribe();
    if(this.productAddSub) this.productAddSub.unsubscribe();
    if(this.productUpdateSub) this.productUpdateSub.unsubscribe();
    if(this.productSearchSub) this.productSearchSub.unsubscribe();
    if(this.productDeleteSub) this.productDeleteSub.unsubscribe();
  }

  //public functions

  GetProductList(){
    this.productListsub = this.productService.GetProductList()
    .subscribe({
      next: (data) => 
      {
        this.productList = data.products;
        this.dataSource.data = this.productList;
      },
      error: (error) => 
      {
        throw error;
      },
      complete: () => console.info('complete') 
    });
  }
  /** Announce the change in sort state for assistive technology. */ 
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  //Actions

  onSearch(){
    this.resetvalues();
    let value:any
    value = this.searchControl.value;
    this.productSearchSub = this.productService.GetSearchProduct(value)
    .subscribe({
      next: (data) => 
      {
        if(data.products.length == 0){
          this.errorSearch = "No data found";
        }
        else{
          this.productSearchtList = data.products;
          console.log(this.productSearchtList);
          this.dataSource.data = this.productSearchtList;
          this.errorSearch = null;
        }
      },
      error: (err) => 
      {
        this.errorMsg = err.error?err.error.message:err;
      },
      complete: () => console.info('complete') 
    });
  }

  onEdit(id:number){
    this.resetvalues();
    this.isUpdate = true;
    let product = this.productList.filter(x=>x.id === id)[0];
    console.log(product);

    this.productUpdateSub = this.productForm.patchValue({
      id: product.id,
      title : product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category
    });

  }

  onSubmit(){
    this.resetvalues();
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }   
    //Server side validation and call Add Todo
    if(this.isUpdate){
      this.onSave(this.productForm.value.id);
    }
    else{
      let product = {
          title: this.productForm.value.title,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          brand: this.productForm.value.brand,
          category: this.productForm.value.category,
      }
    this.productAddSub = this.productService.AddProduct(product)
    .subscribe({
      next: (res) => 
      {
        console.log(res);
        this.successMsg = `Product ${product.title} has been added successfully`;
        this.GetProductList();
      },
      error: (err) => 
      {
        this.errorMsg = err.error?err.error.message:err;
      },
      complete: () => {console.info('complete')}
    });
  }
  }
  
  resetvalues(){
    this.errorMsg = null;
    this.errorSearch = null;
    this.successMsg = null;
    this.submitted = false;
  }

  onSave(id:number){
    this.resetvalues();
    console.log("Saving new values");
    let value = this.productForm.value;
    console.log("Id:" + id)

    let product = {
      title :value.title,
      description :  value.description,
      price : value.price,
      brand :  value.brand,
      category : value.category
    }

    this.productUpdateSub = this.productService.UpdateProduct(id,product)
    .subscribe({
      next: (res) => 
      {
        console.log(res);
        this.GetProductList();
        this.successMsg = `Product  ${product.title} has been updated successfully`;
        this.isUpdate = false;
      },
      error: (err) => 
      {
        this.errorMsg = err.error?err.error.message:err;
      },
      complete: () => console.info('complete') 
    });
  }

  onCancel(){
    this.resetvalues();
    this.isUpdate = false;
    this.productForm.markAsUntouched();
    this.productForm.reset();
  }

  onDelete(id: number){
    this.resetvalues();
    let product = this.productList.filter(x=>x.id === id)[0];
    if(product != null || product!=undefined){
      this.productDeleteSub = this.productService.DeleteProduct(id)
      .subscribe({
        next: (res) => 
        {
          this.successMsg = `Product  ${product.title} has been deleted successfully`;
          this.GetProductList();
        },
        error: (err) => 
        {
          this.errorMsg = err.error?err.error.message:err;
        },
        complete: () => console.info('delete complete') 
      });
    }
    this.isUpdate = false;
  }
}

