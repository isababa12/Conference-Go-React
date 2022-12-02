window.addEventListener('DOMContentLoaded', async () => {

    const confUrl = 'http://localhost:8000/api/conferences/';
    const confResponse = await fetch(confUrl);
    if (confResponse.ok) {
      const data = await confResponse.json();
      const selectTag = document.getElementById('conference');

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.id;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
    }

    const formTag = document.getElementById('create-presentation-form');
    const selectTag = document.getElementById('conference');
    formTag.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const presResponse = await fetch(presUrl, fetchConfig);
        if (presResponse.ok){
            formTag.reset();
            const newPresentation = await presResponse.json();
            console.log(newPresentation);
        }
    })
});
