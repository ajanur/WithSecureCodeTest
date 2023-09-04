# WithSecureCodeTest

# Features
  1. Listing all products in tabular format
  2. Sorting all columns value with accending and decending order for each columns in Table
  3. Pagination with 5, 10, 15 items in one page
  4. Search all products with text in descriptions
  5. Show error message if no product found

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


