import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Product, ProductElements } from 'src/app/models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {

  productList:ProductElements[] = [];
  productSearchtList:ProductElements[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'brand', 'category','actions'];
  dataSource = new MatTableDataSource<ProductElements>();
  //brandList = ['Apple','samsung','Nokia','Others']
  //categoryList = ['Smart Phones','TV','Tablet','Others']

  isUpdate:boolean = false;
  submitted:boolean = false;
  errorMsg:any = null;
  successMsg:any = null;
  errorSearch:any = null;

  searchControl = new FormControl('');

  productForm: FormGroup = new FormGroup({
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
    const unique = [...new Set(this.productList.map(item => item.brand))]; 
    return unique;
  }

  get categoryList() {
    const unique = [...new Set(this.productList.map(item => item.category))]; 
    return unique;
  }


  ngOnInit(){
    this.GetProductList();
    this.errorMsg = null;
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<ProductElements>(this.productList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.disableClear = true;
  }


  GetSearchedProduct(){
    let value:any
    value = this.searchControl.value;
    this.productService.GetSearchProduct(value)
    .subscribe({
      next: (data) => 
      {
        console.log(data);
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
      error: (error) => 
      {
        console.log(error);
        this.errorMsg = "Something went wrong"
        throw error;
        //this.error = error;
      },
      complete: () => console.info('complete') 
    });
  }

  GetProductList(){
    this.productService.GetProductList()
    .subscribe({
      next: (data) => 
      {
        console.log(data);
        this.productList = data.products;
        this.dataSource.data = this.productList;
      },
      error: (error) => 
      {
        console.log(error);
        throw error;
        //this.error = error;
      },
      complete: () => console.info('complete') 
    });
  }

  //Actions
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

  Add(){
    console.log("Add clicked");
  }
  Edit(id:number){
    console.log("Edit clicked" + JSON.stringify(id));
  }
  Delete(id:number){
    console.log("Edit clicked" + id);
  }
  onCancel(){
  }

  onSubmit(){
    this.resetvalues();
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    //Server side validation and call Add Todo
    if(this.isUpdate){
      console.log("Update : " + this.isUpdate);
      this.onSave();
    }
    else{
      let product = {
          title: this.productForm.value.title,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          brand: this.productForm.value.brand,
          category: this.productForm.value.category,
      }
      this.productService.AddProduct(product)
    .subscribe({
      next: (res) => 
      {
        console.log(res);
        this.successMsg = `Product ${product.title} has been added successfully`;
        this.GetProductList();
      },
      error: (err) => 
      {
        console.log("Submit : " + JSON.stringify(err));
        this.errorMsg = err.error;
      },
      complete: () => {console.info('complete')}
    });
  }
  }
  resetvalues(){
    this.errorMsg = null;
  }

  onSave(){

  }
  

}

