"use strict";

var API_URL = "https://api.dribbble.com/v1/",
    ACCESS_TOKEN = "7a22f910dcdff63bd3ebbe48d022f05e8268c67249709b5489d923f97bcf96ec";

function fetchData(URL) {
  return fetch(URL, {
    headers: {
      "Authorization": "Bearer " + ACCESS_TOKEN
    }
  }).then((response) => response.json())
}

module.exports = {
  getShotsByType: function(type: string, pageNumber: ?number): ?Object {
    var URL = API_URL + "shots/?list=" + type;
    if (pageNumber) {
      URL += "&per_page=10&page=" + pageNumber;
    }

    return fetchData(URL);
  },
  getResources: function(url: ?string): ?Object {
    return fetchData(url);
  }
};
