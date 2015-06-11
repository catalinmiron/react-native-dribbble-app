var API_URL = 'https://api.dribbble.com/shots/';

module.exports = {
 getShotsByType: function(query: string, pageNumber: ?number): string {
    return (
      API_URL + query + '/' + '?per_page=20&page=' + pageNumber
    );
  }
};
