import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product.model';

describe('ProductService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    productService = new ProductService(httpClientSpy);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should return expected products (HttpClient called once)', (done: DoneFn) => {
    const expectedProducts: Product[] =
    [
      { id: 1, title: 'A',description:'A', price:20.0, brand: "Apple",category:'Smart Phone' }, 
      { id: 2, title: 'A',description:'A', price:20.0, brand: "Apple", category:'Smart Phone' }, 
    ];
  
    httpClientSpy.get.and.returnValue(of(expectedProducts));
  
    productService.GetProductList().subscribe({
      next: products => {
        expect(products)
          .withContext('expected prodcuts')
          .toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});

