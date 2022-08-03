from redis_om import EmbeddedJsonModel, Field, JsonModel
from pydantic import PositiveInt
from typing import Optional, List

# Added Product Schema


class Product(JsonModel):

    product_name: str = Field(index=True)
    product_desc: str = Field(index=True, full_text_search=True)
    price: PositiveInt = Field(index=True)
    units: PositiveInt = Field(index=True)
    lower_limit_stock: PositiveInt = Field(index=True)
