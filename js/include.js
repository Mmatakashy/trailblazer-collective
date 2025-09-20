// js/include.js
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const text = await res.text();
    document.getElementById(id).innerHTML = text;
  } catch (err) {
    console.error(err);
  }
}
