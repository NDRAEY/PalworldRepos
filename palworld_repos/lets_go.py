import github_searcher
import pal_searcher
import json


if __name__ == "__main__":
    pals = pal_searcher.PalListParser().get_pals()

    data = []

    for n, i in enumerate(pals):
        print(f"{n} / {len(pals)} processed")

        repos = github_searcher.Search(i.name).start()

        matched_repos = repos.name_match_exact(i.name)

        data.append({
            'name': i.name,
            'image': i.image,
            'repos': matched_repos
        })

    with open("static/data.json", "w") as file:
        file.write(json.dumps(data))

    # TODO: Download images

    print("Complete!")
