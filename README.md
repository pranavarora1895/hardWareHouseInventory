# hardWareHouse Inventory Management Application

An inventory management application for a shop to keep the track of its products data. It uses Redis as its primary database, Flask as the backend that connects with Redis, and React as the frontend that renders the data on the browser.

| ![architecture](https://user-images.githubusercontent.com/48170643/183287691-e1d6f7c1-59b4-4dfc-a289-a8804d98410f.png) |
|:--:|

| ![appPage](https://user-images.githubusercontent.com/48170643/183287720-2631aeeb-e3f8-40a5-aeea-bb0b41feba84.JPG) |
|:--:|
| *hardWareHouse Inventory Dashboard* |

| ![newProduct](https://user-images.githubusercontent.com/48170643/183287718-b986896f-8bd0-4c2b-a24a-92250b6561b4.JPG) |
|:--:|
| *Way to Add a new Product* |

| ![editProduct](https://user-images.githubusercontent.com/48170643/183287721-af856e0a-9e44-4cbf-81ba-9448d1048621.JPG) |
|:--:|
| *Way to Update any Product* |

| ![searchProduct](https://user-images.githubusercontent.com/48170643/183287779-cf23fc53-c7ed-46d2-a47c-360715bddbdb.JPG) |
|:--:|
| *Search a Product and the table will render accordingly* |

# Overview video

Here's a short video that explains the project and how it uses Redis:

[![hardwarehouseYoutubeThumbnail](https://user-images.githubusercontent.com/48170643/183334490-ba865a00-b4b2-4d90-bf52-09560e929d73.png)](https://youtu.be/ahwKhVpx3OQ)

## Technical Stack

- Database: *Redis*
- Backend: *Flask*
- Frontend: *React*

## How it works

### How the data is stored:

- From `redis_om` module, following are used to create the `Product` schema:
  - `JsonModel`
  - `Field`

- The product data is stored in various keys and various data types.
  - product_name: str
  - product_desc: str
  - price: PositiveInt
  - units: PositiveInt
  - lower_limit_stock: PositiveInt
  - timestamp: datetime
  
```python
from redis_om import Field, JsonModel
from pydantic import PositiveInt
from datetime import datetime
# Added Product Schema


class Product(JsonModel):

    product_name: str = Field(index=True, full_text_search=True)
    product_desc: str = Field(index=True)
    price: PositiveInt = Field(index=True)
    units: PositiveInt = Field(index=True)
    lower_limit_stock: PositiveInt = Field(index=True)
    timestamp: datetime = Field(index=True, default=datetime.now())
```
| ![newProduct](https://user-images.githubusercontent.com/48170643/183287718-b986896f-8bd0-4c2b-a24a-92250b6561b4.JPG) |
|:--:|
| *Way to Add a new Product* |

- When user clicks on the `Add Product` button on the dashboard, the `addProduct` method triggers the following `POST` request from the frontend.
```js
  const addProduct = async (product_name, product_desc, price, units, lower_limit_stock) => {
    // POST API Call
    try {
      const url = `${host}/product/new`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          product_name,
          product_desc,
          price: parseInt(price),
          units: parseInt(units),
          lower_limit_stock: parseInt(lower_limit_stock),
        }),
      });
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  ```
- This invokes the `create_product()` method in the backend that handles the `POST` request. It performs the relevant validations and then saves the data in the database.
```python
@app.route("/product/new", methods=["POST"])
def create_product():
    try:
        print(request.json)
        new_product = Product(**request.json)
        new_product.save()
        return json.dumps(new_product.pk)

    except ValidationError as e:
        print(e)
        return "Bad request.", 400
```

- The product update also follows the similar pattern.

- Sample data stored: `Key Name: :product.Product:01G9W6KP7S4K3DS3BRD5AEREDX`
```js
{
pk: "01G9VZ5C9PPXF3WYYB7JYN8WAR",
product_name: "Mechanical Keyboard",
product_desc: "Built for extensive typing",
price: 8250,
units: 23,
lower_limit_stock: 5,
timestamp: "2022-08-07T16:25:04.834860",
}
```

### How the data is accessed:

- The `GET` request is initiated from the frontend.
```js
   const getAllProducts = async () => {
    try {
      const url = `${host}/product/fetchall/`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  ```
- This invokes the `fetch_all_products()` method in the backend that handles the `GET` request. It sorts the data by `timestamp` in descending order and returns an array of fetched products.
```python
@app.route("/product/fetchall/", methods=["GET"])
def fetch_all_products():
    products = Product.find().sort_by("-timestamp").all()
    return build_results(products)
```

## How to run it locally?

### Prerequisites

- Python - v3.8.5
- Docker - v20.10.17
- Nodejs - v8.11.0

### Local installation

1. Clone the repository from github
```shell

git clone https://github.com/pranavarora1895/hardWareHouseInventory.git
```
2. **Server Side:** Go to `hardWareHouseInventory\hardWareHouseInventory\` folder and then:
```shell
# Go to server side
cd .\hardWareHouseInventory\hardWareHouseInventory\

# Get redis image
docker compose up -d

# Create virtual env
python -m venv venv

# Activate env for powershell
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run server
flask run
```
3. To load some sample data, run `productsloader.py` script in the `hardWareHouseInventory\hardWareHouseInventory\` folder:
```shell
# Open a new PowerShell window
cd .\hardWareHouseInventory\hardWareHouseInventory\

.\venv\Scripts\Activate.ps1

python .\productsloader.py

# After loading the products, you can close that powershell window
```
4. **Client Side**: Go to `hardWareHouseInventory\hardwarehouse-dashboard\` folder and then:
```shell
# Open another powershell window
cd .\hardWareHouseInventory\hardwarehouse-dashboard\

# Install dependencies
npm install

# Start the client server
npm run start
```

---

## Thank You!!

### Let's get connected:

[![devto](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white)](https://dev.to/dashboard)
[![facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/cosmicpranav007/)
[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pranav-arora-354b71bb/)
[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/arorapranav187/)

#### :hourglass_flowing_sand: *Time taken to build this app:* [![wakatime](https://wakatime.com/badge/user/e72a1859-4793-4da2-b36b-49c7378256a0/project/e60d1b21-00c0-4f29-bfba-5f5175700f5a.svg)](https://wakatime.com/@pranavarora1895/projects/jzwipwmfui?start=2022-08-02)




