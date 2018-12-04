// eslint-disable-next-line no-use-before-define
export { get, nextPageToken };
// eslint-disable-next-line import/no-mutable-exports
let nextPageToken = '';


function get(search, pageToken, uploadLi, uploadVideos) {
  function handleResponse(response) {
    return response.json()
      .then((json) => {
        if (response.ok) {
          return json;
        }
        return Promise.reject(response);
      });
  }
  fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken}&part=snippet&type=video&q=${search}&maxResults=15&order=viewCount&publishedAfter=2016-01-01T00:00:00Z&key=AIzaSyCplUJLnt2z0GSuveXnfVcktxVpNlSAnzo`)
    .then(handleResponse)
    .then((data) => {
      // eslint-disable-next-line prefer-destructuring
      nextPageToken = data.nextPageToken;
      console.log(nextPageToken);
      const id1 = data.items[0].id.videoId;
      const id2 = data.items[1].id.videoId;
      const id3 = data.items[2].id.videoId;
      const id4 = data.items[3].id.videoId;
      const id5 = data.items[4].id.videoId;
      const id6 = data.items[5].id.videoId;
      const id7 = data.items[6].id.videoId;
      const id8 = data.items[7].id.videoId;
      const id9 = data.items[8].id.videoId;
      const id10 = data.items[9].id.videoId;
      const id11 = data.items[10].id.videoId;
      const id12 = data.items[11].id.videoId;
      const id13 = data.items[12].id.videoId;
      const id14 = data.items[13].id.videoId;
      const id15 = data.items[14].id.videoId;
      return fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&id=${`${id1},${id2},${id3},${id4},${id5},${id6},${id7},${id8},${id9},${id10},${id11},${id12},${id13},${id14},${id15}`}&part=snippet,statistics`);
    })
    .then(handleResponse)
    .then((data) => {
      console.log(data.items);
      return data;
    })
    .then((data) => {
      data.items.forEach((e, i) => uploadLi(e, i, uploadVideos));
    })
    .catch((error) => {
      console.log('error', error);
    });
}
