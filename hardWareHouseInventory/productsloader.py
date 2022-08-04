import json
import requests

with open("data/products.json", encoding="utf-8") as f:
    products = json.loads(f.read())

for product in products:
    r = requests.post("http://127.0.0.1:5000/product/new", json=product)
    print(
        f"Created product {product['product_name']} with ID {r.text}"
    )
