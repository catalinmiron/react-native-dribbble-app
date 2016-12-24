//@flow

const API_URL = "https://api.dribbble.com/v1/",
    ACCESS_TOKEN = "8d9bd601f9461955b330d88c44f2930257364de98cddc2064d93cdcb300cb91d";

function fetchData(URL) {
    return fetch(URL, {
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
    }).then((response) => response.json())
}

export function getShotsByType(type: string, pageNumber: ?number): ?Object {
    var URL = API_URL + "shots/?list=" + type;
    if (pageNumber) {
        URL += "&per_page=10&page=" + pageNumber;
    }

    return fetchData(URL);
}

export function getResources(url: ?string): ?Object {
    return fetchData(url);
}
