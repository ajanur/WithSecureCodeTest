# WithSecureCodeTest
Its a sample Product Listing application using Angular. Backend API is provided as public API https://dummyjson.com/products

# Features
  1. Listing all products in tabular format.
  2. Adding new Product, Edit product and delete products.
  3. Sorting all columns value with accending and decending order for each columns in Table by clicking column's header.
  4. Pagination with 5, 10, 15 items in one page.
  5. Search all products with text in descriptions.
  6. Show error message if no product found.
  7. Show success message for every actions except search as search will provide listing if successfull.

# Prerequisites
1. Angular 16 installation with latest npm
2. Public API(https://dummyjson.com/products) should be available in your machine.
3. IDE like Visual Studio Code
4. Postman for API testing(optional)

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

# Notes
The public API (https://dummyjson.com/products) is not capable to provide production like features and performance.
There are few drawbacks faces in public API
  1. API is little slow in nature
  2. Create, Update and Delete operations is giving fake results not exact results so you might not find the value you entered.However operations are ready to plug with real API.
  3. Listing and Searching is taking time
  4. There would not be business related server side validation.
