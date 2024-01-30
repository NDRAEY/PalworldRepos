# GitHub Searching API implementation by NDRAEY (c) 2024

import requests
import json
from enum import Enum


class QueryType(Enum):
    ALL = 0
    NAME = 1


class QuerySort(Enum):
    NONE = 0
    STARS = 1


class Query:
    def __init__(self, results: dict):
        self.result = results

    def name_match_exact(self, name: str) -> list:
        if 'items' not in self.result:
            return []

        name = name.lower()

        no_spaces_name = name.replace(" ", "")
        lodashed_spaces_name = name.replace(" ", "_")
        dashed_spaces_name = name.replace(" ", "-")

        items = self.result['items']

        is_match = lambda i: i['name'].lower() == no_spaces_name \
                             or i['name'].lower() == lodashed_spaces_name \
                             or i['name'].lower() == dashed_spaces_name \
                             or i['name'].lower() == name

        return [i for i in items if is_match(i)]


class Search:
    def __init__(self, query: str, qtype: QueryType = QueryType.ALL, qsort: QuerySort = QuerySort.NONE):
        self.query = query.replace(" ", "+")

        if qtype == QueryType.NAME:
            self.qtype_str = "+in:name"
        else:
            self.qtype_str = ""

        if qsort == QuerySort.STARS:
            self.qsort_str = "&sort=stars"
        else:
            self.qsort_str = ""

    def start(self) -> Query:
        text_data = requests.get(
            f"https://api.github.com/search/repositories?q={self.query}{self.qtype_str}{self.qsort_str}"
        ).text

        return Query(json.loads(text_data))
