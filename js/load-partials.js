function loadHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("Page not found: " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(err));
}

// load header & footer dynamically
// since about.html is inside /about/, we go up one level (../) to reach /partial/
loadHTML("header", "../partial/header.html");
loadHTML("footer", "../partial/footer.html");
