async function searchTorrents() {
    const website = document.getElementById('website').value;
    const search = document.getElementById('search').value;
    const results = document.getElementById('results');

    let apiUrl = `https://itorrentsearch.vercel.app/api/${website}/${search}`;

    const divResults = document.getElementById('results')
    const divLoading = document.getElementById('loading_div')

    divLoading.style.visibility = 'visible';
    divResults.style.visibility = 'hidden';

    try {
        var response = await fetch(apiUrl);

        if (!response.ok) {
            console.log(`Status: ${response.status} ${response.statusText}`);
            throw new Error('Network response was not ok.');
        }

        var data = await response.json();

        if (!data || data.length === 0) {
            divLoading.style.visibility = 'hidden';
            divResults.style.visibility = 'visible';
            results.innerHTML = '<div class="text-center col-12">No results found. =(</div>';
            return;
        }

        show(data);

    } catch (error) {
        console.log('There was a problem with the fetch operation: ' + error.message);
    }

    /** function to show the data in cards */

    function show(data) {
        let result = '';
        const limit = document.querySelector('#limit_input input').value || 20;
        const limitedData = data.slice(0, limit);

        document.getElementById('loading_div').style.visibility = "hidden";
        document.getElementById('results').style.visibility = "visible";

        if (website == '1337x') {
            limitedData.forEach(torrent => {
                result += `<div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${torrent.Name}</h5>
                                    <p class="card-text"><strong>Category:</strong> ${torrent.Category || 'N/A'}</p>
                                    <p class="card-text"><strong>Size:</strong> ${torrent.Size || 'N/A'}</p>
                                    <p class="card-text"><strong>Seeders:</strong> ${torrent.Seeders || 'N/A'}</p>
                                    <div class="button-container">
                                        <a href="${torrent.Magnet}" class="btn btn-success">Magnet</a>
                                    </div>
                                </div>
                            </div>`
            });
            results.innerHTML = result;
        } else if (website == 'yts') {
            limitedData.forEach(torrent => {
                result += `<div class="card">
                        <div class="card-body">
                                <img src="${torrent.Poster}" class="card-img-top" alt="${torrent.Name}">
                                <div class="movie-details">
                                    <h5 class="card-title">${torrent.Name}</h5>
                                    <p class="card-text"><strong>Released Date:</strong> ${torrent.ReleasedDate || 'N/A'}</p>
                                    <p class="card-text"><strong>Genre:</strong> ${torrent.Genre || 'N/A'}</p>
                                    <div class="button-container">
                                    ${torrent.Files.map(file => `<a href="${file.Magnet}" class="btn btn-success">${file.Quality}</a>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>`
            });
            results.innerHTML = result;
        } else if (website == 'piratebay') {
            limitedData.forEach(torrent => {
                result += `<div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${torrent.Name}</h5>
                                    <p class="card-text"><strong>Size:</strong> ${torrent.Size || 'N/A'}</p>
                                    <p class="card-text"><strong>Date:</strong> ${torrent.DateUploaded || 'N/A'}</p>
                                    <p class="card-text"><strong>Category:</strong> ${torrent.Category || 'N/A'}</p>
                                    <p class="card-text"><strong>Seeders:</strong> ${torrent.Seeders || 'N/A'}</p>
                                    <div class="button-container">
                                        <a href="${torrent.Magnet}" class="btn btn-success">Magnet</a>
                                    </div>
                                </div>
                            </div>`
            });
            results.innerHTML = result;
        }
    }
}

    // fetch(apiUrl)
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             console.log(`Status: ${response.status} ${response.statusText}`);
    //             throw new Error('Network response was not ok.');
    //         }
    //     })
    //     .then(function (data) {
    //         if (!data || data.length === 0) {
    //             results.innerHTML = '<div class="text-center col-12">No results found.</div>';
    //             return;
    //         }
    //         show(data);
    //     })
    //     .catch(function (error) {
    //         console.log('There was a problem with the fetch operation: ' + error.message);
    //     });