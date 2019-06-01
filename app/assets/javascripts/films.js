// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", function() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toUpperCase();
    const titleNodes = document.querySelectorAll("#filmTable td:first-of-type");
    titleNodes.forEach(node => {
      if (node.innerText.toUpperCase().indexOf(searchValue) > -1) {
        node.parentNode.style.display = "";
      } else {
        node.parentNode.style.display = "none";
      }
    });
  });
});
