# Pal Searcher by NDRAEY (c) 2024

# WARNING: PAL DATA ARE EXTRACTED FROM `https://genshinlab.com/palworld-pals/`

import bs4
import requests
from dataclasses import dataclass


@dataclass
class Pal:
    name: str
    image: str


class PalListParser:
    BASE = "https://genshinlab.com/palworld-pals/"

    def __init__(self):
        ...

    def get_raw_data(self) -> bs4.Tag:
        text_data = requests.get(self.BASE, headers={
            'User-Agent': 'Mozilla/5.0'
        }).text

        soup = bs4.BeautifulSoup(text_data, features='lxml')

        return soup.select(".elementor-posts-container")[0]

    def get_pals(self):
        data = self.get_raw_data()

        pals_elements = data.find_all("article", class_="elementor-post")

        pals = []

        for i in pals_elements:
            name = i.find("h3", class_="elementor-post__title").a.text.strip()
            # image_url = i.find("img", class_="attachment-full")['data-src']
            image_url = i.find("img", class_="attachment-full")['src']

            pals.append(Pal(name, image_url))

        return pals


if __name__ == "__main__":
    from pprint import pprint

    pals = PalListParser()

    pprint(pals.get_pals())
