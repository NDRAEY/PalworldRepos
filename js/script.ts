type Repo = {
    name: string,
    full_name: string,
    html_url: string,
    stargazers_count: number,
    forks: number,
    description: string
}

type PalRepos = {
    name: string,
    image: string,
    repos: Repo[]
}

let is_github_pages = window.location.href.includes("github.io");
let data_addr = "/data.json";

if(is_github_pages) {
    data_addr = "/PalworldRepos" + data_addr;
}

async function fetch_pals_json(): Promise<any> {
    let resp = await fetch(data_addr);

    if(resp.ok) {
        return await resp.json();
    } else {
        return {};
    }
}

function render_info(root_element: HTMLElement, value: Array<PalRepos>) {
    let arrayx3: Array<Array<PalRepos>> = [];

    let temparray: Array<PalRepos> = [];

    value.forEach(el => {
        if(temparray.length == 2) {
            arrayx3.push(temparray)
            temparray = [];
        }

        temparray.push(el)
    })

    arrayx3.push(temparray);

    arrayx3.forEach(group => {
        let sgrp = document.createElement("div");

        sgrp.classList.add("table-row")
        
        group.forEach(element => {
            let card = document.createElement("div");

            card.classList.add("table-card")

            if(element.repos.length == 0) {
                card.classList.add("no-info")
            }

            let card_header = document.createElement("div");

            card_header.classList.add("table-card-header")

            // Card image
            let card_image = new Image();
            
            let image_path = "img/pals/" + element.image.split("/")[element.image.split("/").length - 1];

            if(is_github_pages) {
                image_path = "/PalworldRepos/" + image_path
            }

            card_image.src = image_path
            card_header.appendChild(card_image)


            let card_info = document.createElement("div")

            card_info.classList.add("info")

            // Card name
            let card_name = document.createElement("span")
            card_name.textContent = element.name
            card_info.appendChild(card_name)

            
            if(element.repos.length != 0) {
                // Card URL
                let card_url = document.createElement("a")
                
                card_url.textContent = element.repos[0].full_name
                card_url.href = element.repos[0].html_url
                
                card_info.appendChild(card_url)

                // Card stars and forks
                let card_metrics = document.createElement("span")

                card_metrics.classList.add("metrics")
                
                // card_metrics.textContent = "Stars: " + element.repos[0].stargazers_count + "; Forks: " + element.repos[0].forks
                let metrics_stars = document.createElement("span")
                let metrics_forks = document.createElement("span")

                metrics_stars.classList.add("separate")

                let star_image = new Image();
                star_image.src = "img/star.png";
                star_image.width = star_image.height = 16;
                
                let branch_image = new Image();
                branch_image.src = "img/branch.png";
                branch_image.width = branch_image.height = 16;

                metrics_stars.textContent = element.repos[0].stargazers_count.toString()
                metrics_forks.textContent = element.repos[0].forks.toString()

                card_metrics.appendChild(star_image)
                card_metrics.appendChild(metrics_stars)
                card_metrics.appendChild(branch_image)
                card_metrics.appendChild(metrics_forks)

                card_info.appendChild(card_metrics)
            }
            
            card_header.appendChild(card_info)

            card.appendChild(card_header)

            if(element.repos.length != 0 && element.repos[0].description) {
                let card_body = document.createElement("div")

                card_body.classList.add("table-card-body")

                card_body.innerText = element.repos[0].description

                card.appendChild(card_body)
            }

            sgrp.appendChild(card);
        });

        root_element.appendChild(sgrp)
    });
}