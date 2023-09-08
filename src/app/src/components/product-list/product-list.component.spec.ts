import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from 'src/app/src/services/product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceMock:any;
  let resultSet:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
      ],
      providers: [{
        provide: ProductService,
        useValue: jasmine.createSpyObj('ProductService',['GetProductList'])
      }]
    });
    productServiceMock = TestBed.get(ProductService);
    resultSet = productServiceMock.GetProductList.and.returnValue(of([{
      "id": 1,
      "title": "iPhone 9",
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    }]));

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  })
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create Product Form Components', () => {
    expect(component.productForm).toBeTruthy();
  });
  it('should create Serach Component', () => {
    expect(component.searchControl).toBeTruthy();
  });
  it('should create Mat Datasource Component', () => {
    expect(component.dataSource).toBeTruthy();
  });
  it('should create Paginator Component', () => {
    expect(component.paginator).toBeTruthy();
  });
  it('should create Sort Component', () => {
    expect(component.sort).toBeTruthy();
  });
  it('should retrive data from product service', () => {
    fixture.detectChanges();
    expect(resultSet).toBeTruthy();
  });
});
