// Function to scroll to different sections smoothly
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 60, // Adjust for header height
        behavior: 'smooth'
    });
}