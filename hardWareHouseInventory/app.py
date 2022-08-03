import json
from xml.dom import NotFoundErr
from flask import Flask, request
from pydantic import ValidationError
from product import Product
from redis_om import Migrator
from redis_om.model import NotFoundError

app = Flask(__name__)

# Utility function to format list of People objects as
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
                <p><a href="https://github.com/redis-developer/redis-om-python-flask-skeleton-app">Read the documentation on GitHub</a>.</p>
            </body>
        </html>
    """


# Create a RediSearch index for instances of the Person model.
Migrator().run()
