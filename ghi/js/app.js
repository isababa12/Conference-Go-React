window.addEventListener('DOMContentLoaded', async () => {

    function createCard(name, description, pictureUrl, starts, ends, location) {
        return `
        
        <div class="col-md-4">
        <div class="w-100">
        <div class="shadow p-3 mb-5 bg-white rounded">
        <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
          <p class="card-text">${starts} - ${ends}</p>
            </div>
        </div>
      </div>
      </div>
      </div>
      `;
    }

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Response not ok');
        } else {
            const data = await response.json();
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;;
                const pictureUrl = details.conference.location.picture_url;
                const starts = new Date(details.conference.starts);
                const ends = new Date (details.conference.ends);
                const location = details.conference.location.name
                const html = createCard(title, description, pictureUrl, starts.toLocaleDateString(), ends.toLocaleDateString(), location);
                const column = document.querySelector('.row');
                column.innerHTML += html;
            }
            }
        }
    } catch (e) {
        console.error('error', e);
        const row = document.querySelector('.row');
    }
});
