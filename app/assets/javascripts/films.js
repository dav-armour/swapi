// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", () => {
  enableFavourites();
  enableSearch();
});

// Enable search functionality of film titles
function enableSearch() {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keyup", e => {
      const searchValue = searchInput.value.toUpperCase();
      const filmTable = document.getElementById("filmTable");
      const rows = filmTable.getElementsByTagName("tr");

      // Hide rows that don't match search input
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
}

// Enable modifying favourite films and update table on initial load
function enableFavourites() {
  const filmTable = document.getElementById("filmTable");
  if (filmTable) {
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
}

// Move film row to correct position and update storage
function handleFavClick(e) {
  const tr = e.target.parentNode;
  const tbody = tr.parentNode;
  const episodeId = tr.dataset["episode_id"];
  const favFilms = JSON.parse(localStorage.getItem("favFilms")) || [];
  const index = favFilms.indexOf(episodeId);

  // If already favourite remove film and move row underneath favourites
  if (index > -1) {
    favFilms.splice(index, 1);
    e.target.textContent = "No";
    tbody.insertBefore(
      tbody.removeChild(tr),
      tbody.childNodes[favFilms.length]
    );
  } else {
    // Add new favourite and move to top of table
    const title = tr.firstElementChild.textContent;
    showAlert(title);
    favFilms.push(episodeId);
    e.target.textContent = "Yes";
    tbody.prepend(tbody.removeChild(tr));
  }
  // Update storage
  localStorage.setItem("favFilms", JSON.stringify(favFilms));
}

// Change to film show page
function handleRowClick(e) {
  const episodeId = e.target.parentNode.dataset["episode_id"];
  window.location = `/films/${episodeId}`;
}

// Show alert for adding a new favourite film
function showAlert(title) {
  // Remove old alert
  let oldAlert = document.querySelector(".alert");
  if (oldAlert) {
    oldAlert.remove();
  }

  // Create new alert
  let newDiv = document.createElement("div");
  newDiv.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show"
  );
  newDiv.setAttribute("role", "alert");
  newDiv.innerHTML = `
    ${title} was successfully added to favourites.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;
  document.body.insertBefore(newDiv, document.body.childNodes[3]);

  // Remove alert after 3 seconds if it is still on page
  setTimeout(() => {
    if (newDiv.parentNode) {
      document.body.removeChild(newDiv);
    }
  }, 2500);
}
