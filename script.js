const videos2 = [{ name: "SysEpidemy", url: "ypaH3usIJp8" }];

const labels = {
    name: "Nome Equipe",
    rank: "#Rank",
    url: "URL",
    likeCount: "Total de Likes",
    dislikeCount: "Total de Deslikes",
    viewCount: "Total de View",
    commentCount: "Total de comentários",
};
const videos = [
    { rank: "", name: "SysEpidemy", url: "ypaH3usIJp8" },
    { rank: "", name: "Time33", url: "9udCPLBgaHM" },
    { rank: "", name: "Track&Map", url: "o2wpdfkWZw4" },
    { rank: "", name: "Time18", url: "qEVl3HqsUyI" },
    { rank: "", name: "SocialMaker", url: "l7cUGf4s_PY" },
    {
        rank: "",
        name: "DPC Doação de Plasma Convalescente",
        url: "aQ3-hv5FAdY",
    },
    { rank: "", name: "Psi Para Todos", url: "pU6RN1p16Ak" },
    { rank: "", name: "MindShare", url: "ayfixUggmpw" },
    { rank: "", name: "Plataforma Saúde 092", url: "H8EySNVDiu4" },
    { rank: "", name: "Jiquitaia Solidária", url: "bk0vHSKnBFY" },
    { rank: "", name: "B2B Material", url: "XYbYWkmB6JU" },
    { rank: "", name: "Alerta COVID19", url: "UJuNg1laujY" },
    { rank: "", name: "AglomeraNão", url: "pvecw-WqgDM" },
    { rank: "", name: "Agend.Me", url: "qpDs37Fbpyc" },
];

function httpGetAsync(url, callback) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200)
            callback(xmlHttpRequest.responseText);
    };
    xmlHttpRequest.open("GET", url, true);
    xmlHttpRequest.send(null);
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(labels[key]);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    var tableRef = table.getElementsByTagName("tbody")[0];
    for (let element of data) {
        let row = tableRef.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = "";
            if (key === "url") {
                text = document.createTextNode(
                    `https://www.youtube.com/watch?v=${element[key]}`
                );
            } else {
                text = document.createTextNode(element[key]);
            }
            cell.appendChild(text);
        }
    }
}

function generateHtmlTable() {
    let table = document.querySelector("table");
    let data = Object.keys(videos[0]);
    generateTableHead(table, data);
    videos.sort((v1, v2) => {
        return v2.likeCount - v1.likeCount;
    });
    videos.forEach((v, i) => {
        v.rank = i + 1;
    });
    generateTable(table, videos);
}
var totalRequests = 0;

(function () {
    let idList = "";
    videos.forEach((video) => {
        idList += video.url + ",";
    });
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${idList}&key=AIzaSyAIvQh8VfN1PM8Nm-oaf67JSLhKVUJLj5Y`;
    httpGetAsync(url, (response) => {
        totalRequests++;
        const responseParse = JSON.parse(response);

        responseParse["items"].forEach((item) => {
            const video = videos.find((v) => v.url === item.id);
            video["likeCount"] = item["statistics"]["likeCount"];
            video["dislikeCount"] = item["statistics"]["dislikeCount"];
            video["viewCount"] = item["statistics"]["viewCount"];
            video["commentCount"] = item["statistics"]["commentCount"];
        });

        generateHtmlTable();
    });
})();
