# WithSecureCodeTest
Its a sample Product Listing application using Angular. Backend API is provided as public API https://dummyjson.com/products

# Features
  1. Listing all products in tabular format.
  2. Adding new Product, Edit product and delete products.
  3. Sorting all columns value with accending and decending order for each columns in Table.
  4. Pagination with 5, 10, 15 items in one page.
  5. Search all products with text in descriptions.
  6. Show error message if no product found.
  7. Show success message for every actions except search as search will provide listing if successfull.

# Setup
Proxy setup of public API(https://dummyjson.com/products") in proxy.config.json

"/products/*": {
        "target": "https://dummyjson.com",
        "secure": true,
        "changeOrigin": true,
        "logLevel": "debug"
    }

# Angular run commands
  1. $ npm install
  2. $ ng serve
  3. Open this link : http://localhost:4200/product-list

# Angular Test commands
  1. $ npm install
  2. $ ng test
  3. Open this link http://localhost:9876/


