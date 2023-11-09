document.addEventListener("DOMContentLoaded", function () {
  // Make a GET request to the Spotify API

  let headersList = {
    Accept: "*/*",
  };

  fetch("https://spotify.whosfritz.de/spotifywhosfritz", {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the src attribute of the iframe with the received favSongID
      const spotifyIframe = document.getElementById("spotifyIframe");
      spotifyIframe.src = `https://open.spotify.com/embed/track/${data.favSongID}?utm_source=generator`;
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// Function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Function to check if the "decision cookie" exists
function checkCookie() {
  const decisionCookie = getCookie("cookieConsent");
  if (!decisionCookie) {
    // Show the cookie consent banner if the decision cookie doesn't exist
    document.getElementById("cookieConsentBanner").style.display = "block";
  } else {
    // Hide the cookie consent banner if the decision cookie exists
    document.getElementById("cookieConsentBanner").style.display = "none";
  }
}

// Function to get a cookie by name
function getCookie(name) {
  const cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return cookieValue ? cookieValue[2] : null;
}

// Event listener for the accept button
document.getElementById("acceptCookiesButton").addEventListener("click", () => {
  // Set the "decision cookie" to 'accepted' for 365 days (adjust as needed)
  setCookie("cookieConsent", "accepted", 365);
  // Hide the cookie consent banner
  document.getElementById("cookieConsentBanner").style.display = "none";
});

// Check the "decision cookie" when the page loads
checkCookie();
