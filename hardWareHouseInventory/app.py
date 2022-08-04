import json
from xml.dom import NotFoundErr
from flask import Flask, request
from pydantic import ValidationError
from product import Product
from redis_om import Migrator
from redis_om.model import NotFoundError
from datetime import datetime

app = Flask(__name__)

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
def create_person():
    try:
        print(request.json)
        new_product = Product(**request.json)
        new_product.save()
        return new_product.pk

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
                <h1>hardWareHouse Inventory REST API</h1>
                <h2>API Usage</h2>
                <h3>1. Create a Product</h3>
                <code>POST - http://127.0.0.1:5000/product/new</code><br>
                <code>header - Content-type - application/json</code><br>
                <code>body - {
                    "product_name": "{name-of-product}",
                    "product_desc": "{product-description}",
                    "price": {price-per-piece},
                    "units": {no-of-units-available},
                    "lower_limit_stock": {lower-stock-limit}
                                    }
                </code>
            </body>
        </html>
    """


# Create a RediSearch index for instances of the Person model.
Migrator().run()
