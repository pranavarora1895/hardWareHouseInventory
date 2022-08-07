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

[Insert your own video here, and remove the one below]

[![Embed your YouTube video](https://i.ytimg.com/vi/vyxdC1qK4NE/maxresdefault.jpg)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

## How it works

### How the data is stored:

- The backend is written in `Flask` and the frontend is written in `React`.

- From `redis_om` module, following were used to create the `Product` schema:
  - `JsonModel`
  - `Field`

- The product data is stored in various keys and various data types.
  - product_name: str
  - product_desc: str
  - price: PositiveInt
  - units: PositiveInt
  - lower_limit_stock: PositiveInt
  - timestamp: datetime

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

- Sample data stored:
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

[Make sure you test this with a fresh clone of your repo, these instructions will be used to judge your app.]

### Prerequisites

[Fill out with any prerequisites (e.g. Node, Docker, etc.). Specify minimum versions]

### Local installation

[Insert instructions for local installation]


