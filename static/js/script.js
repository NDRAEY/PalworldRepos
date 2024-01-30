var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var is_github_pages = window.location.href.includes("github.io");
var data_addr = "/data.json";
if (is_github_pages) {
    data_addr = "/PalworldRepos/" + data_addr;
}
function fetch_pals_json() {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(data_addr)];
                case 1:
                    resp = _a.sent();
                    if (!resp.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, resp.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/, {}];
            }
        });
    });
}
function render_info(root_element, value) {
    var arrayx3 = [];
    var temparray = [];
    value.forEach(function (el) {
        if (temparray.length == 2) {
            arrayx3.push(temparray);
            temparray = [];
        }
        temparray.push(el);
    });
    arrayx3.push(temparray);
    arrayx3.forEach(function (group) {
        var sgrp = document.createElement("div");
        sgrp.classList.add("table-row");
        group.forEach(function (element) {
            var card = document.createElement("div");
            card.classList.add("table-card");
            if (element.repos.length == 0) {
                card.classList.add("no-info");
            }
            var card_header = document.createElement("div");
            card_header.classList.add("table-card-header");
            // Card image
            var card_image = new Image();
            var image_path = "img/pals/" + element.image.split("/")[element.image.split("/").length - 1];
            if (is_github_pages) {
                image_path = "/PalworldRepos/" + image_path;
            }
            card_image.src = image_path;
            card_header.appendChild(card_image);
            var card_info = document.createElement("div");
            card_info.classList.add("info");
            // Card name
            var card_name = document.createElement("span");
            card_name.textContent = element.name;
            card_info.appendChild(card_name);
            if (element.repos.length != 0) {
                // Card URL
                var card_url = document.createElement("a");
                card_url.textContent = element.repos[0].full_name;
                card_url.href = element.repos[0].html_url;
                card_info.appendChild(card_url);
                // Card stars and forks
                var card_metrics = document.createElement("span");
                card_metrics.classList.add("metrics");
                // card_metrics.textContent = "Stars: " + element.repos[0].stargazers_count + "; Forks: " + element.repos[0].forks
                var metrics_stars = document.createElement("span");
                var metrics_forks = document.createElement("span");
                metrics_stars.classList.add("separate");
                var star_image = new Image();
                star_image.src = "img/star.png";
                star_image.width = star_image.height = 16;
                var branch_image = new Image();
                branch_image.src = "img/branch.png";
                branch_image.width = branch_image.height = 16;
                metrics_stars.textContent = element.repos[0].stargazers_count.toString();
                metrics_forks.textContent = element.repos[0].forks.toString();
                card_metrics.appendChild(star_image);
                card_metrics.appendChild(metrics_stars);
                card_metrics.appendChild(branch_image);
                card_metrics.appendChild(metrics_forks);
                card_info.appendChild(card_metrics);
            }
            card_header.appendChild(card_info);
            card.appendChild(card_header);
            if (element.repos.length != 0 && element.repos[0].description) {
                var card_body = document.createElement("div");
                card_body.classList.add("table-card-body");
                card_body.innerText = element.repos[0].description;
                card.appendChild(card_body);
            }
            sgrp.appendChild(card);
        });
        root_element.appendChild(sgrp);
    });
}
