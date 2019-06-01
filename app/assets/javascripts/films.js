// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", () => {
  enableFavourites();
  enableSearch();
});

function enableSearch() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keyup", e => {
    const searchValue = searchInput.value.toUpperCase();

    const filmTable = document.getElementById("filmTable");
    const rows = filmTable.getElementsByTagName("tr");
    for (let row of rows) {
      const cell = row.getElementsByTagName("td")[0];
      if (cell) {
        const title = cell.textContent;
        if (title.toUpperCase().indexOf(searchValue) > -1) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }
  });
}

function enableFavourites() {
  const filmTable = document.getElementById("filmTable");
  const tbody = filmTable.lastElementChild;

  // Check local storage for favourite films and update DOM
  const favFilms = JSON.parse(localStorage.getItem("favFilms")) || [];
  const rows = tbody.getElementsByTagName("tr");
  for (let row of rows) {
    const episodeId = row.dataset["episode_id"];
    if (favFilms.indexOf(episodeId) > -1) {
      row.lastElementChild.textContent = "Yes";
      tbody.prepend(tbody.removeChild(row));
    }
  }

  filmTable.addEventListener("click", e => {
    if (e.target.className.indexOf("fav-cell") > -1) {
      handleFavClick(e);
    } else {
      handleRowClick(e);
    }
  });
}

function handleFavClick(e) {
  const tr = e.target.parentNode;
  const tbody = tr.parentNode;
  const episodeId = tr.dataset["episode_id"];
  const favFilms = JSON.parse(localStorage.getItem("favFilms")) || [];
  const index = favFilms.indexOf(episodeId);
  if (index > -1) {
    favFilms.splice(index, 1);
    e.target.textContent = "No";
    tbody.insertBefore(
      tbody.removeChild(tr),
      tbody.childNodes[favFilms.length]
    );
  } else {
    favFilms.push(episodeId);
    e.target.textContent = "Yes";
    tbody.prepend(tbody.removeChild(tr));
  }
  localStorage.setItem("favFilms", JSON.stringify(favFilms));
}

function handleRowClick(e) {
  const episodeId = e.target.parentNode.dataset["episode_id"];
  // window.location = `/films/${episodeId}`;
}
