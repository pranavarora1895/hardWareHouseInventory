import json
from xml.dom import NotFoundErr
from flask import Flask, request
from pydantic import ValidationError
from product import Product
from redis_om import Migrator
from flask_cors import CORS  # comment this on deployment
from redis_om.model import NotFoundError
from datetime import datetime

app = Flask(__name__)
CORS(app)  # comment this on deployment
# Utility function to format list of Product objects as
# a results dictionary, for easy conversion to JSON in
# API responses.


def build_results(products):
    response = []
    for product in products:
        response.append(product.dict())

    return {"results": response}


# Create a new Product


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

# Update a Product


@app.route("/product/update/<id>/", methods=["PUT"])
def update_product(id):
    try:
        product = Product.get(id)

    except NotFoundError:
        return "Bad request", 400

    new_product = request.json
    product.product_name = new_product.get("product_name")
    product.product_desc = new_product.get("product_desc")
    product.price = new_product.get("price")
    product.units = new_product.get("units")
    product.lower_limit_stock = new_product.get("lower_limit_stock")
    product.timestamp = datetime.now()

    product.save()

    print("updated product", new_product.get("product_name"))
    return new_product

# Delete a Product


@app.route("/product/delete/<id>/", methods=["DELETE"])
def delete_product(id):
    # Delete returns 1 if the product existed and was
    # deleted, or 0 if they didn't exist.  For our
    # purposes, both outcomes can be considered a success.
    Product.delete(id)
    return "Product Deleted"

# Fetch all products


@app.route("/product/fetchall/", methods=["GET"])
def fetch_all_products():
    products = Product.find().sort_by("-timestamp").all()

    return build_results(products)

# Product Search by name. not exact search


@app.route("/product/search/<product_name>", methods=["GET"])
def search_product(product_name):
    product = Product.find(Product.product_name %
                           product_name).sort_by("-timestamp").all()

    return build_results(product)


@app.route("/", methods=["GET"])
def home_page():
    return """
        <!DOCTYPE html>
        <html>
            <head>
                <title>hardWareHouse - Inventory</title>
            </head>
            <body>
                <h1><i>hardWareHouse Inventory REST API</i></h1>
                <h2>API Usage</h2>

                <h3>1. Create a Product</h3>
                <code>POST - http://127.0.0.1:5000/product/new/</code><br>
                <code>header - Content-type - application/json</code><br>
                <code>body - {
                    "product_name": "{name-of-product}",
                    "product_desc": "{product-description}",
                    "price": {price-per-piece},
                    "units": {no-of-units-available},
                    "lower_limit_stock": {lower-stock-limit}
                                    }
                </code>

                <h3>2. Update a Product</h3>
                <code>PUT - http://127.0.0.1:5000/product/update/{id}/</code><br>
                <code>header - Content-type - application/json</code><br>
                <code>body - {
                    "product_name": "{updated-name-of-product}",
                    "product_desc": "{updated-product-description}",
                    "price": {updated-price-per-piece},
                    "units": {updated-no-of-units-available},
                    "lower_limit_stock": {updated-lower-stock-limit}
                                    }
                </code>

                <h3>3. Fetch All Products</h3>
                <code>GET - http://127.0.0.1:5000/product/fetchall/</code><br>
                <code>header - Content-type - application/json</code><br>

                <h3>4. Search a Product</h3>
                <code>GET - http://127.0.0.1:5000/product/search/{product_name}/</code><br>
                <code>header - Content-type - application/json</code><br>
                
                <h3>5. Delete a Product</h3>
                <code>DELETE - http://127.0.0.1:5000/product/delete/{id}/</code><br>
                <code>header - Content-type - application/json</code><br>
            </body>
        </html>
    """


# Create a RediSearch index for instances of the Person model.
Migrator().run()
