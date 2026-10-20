const WHATSAPP_NUMBER = '917688897306';
const video = document.getElementById('journeyVideo');
const videoThumbnail = document.querySelector('.video-thumbnail');
const watchButton = document.getElementById('watchButton');
const bookButton = document.getElementById('bookButton');

function getRegistrationDetails() {
  try {
    const r = JSON.parse(sessionStorage.getItem('webinarRegistration') || '{}');
    return ['Webinar Registration', `Name: ${r.name || ''}`, `Mobile: ${r.phone || ''}`, `City: ${r.city || ''}`, `Profession: ${r.profession || ''}`].join('\n');
  } catch { return 'Webinar Registration'; }
}
function openWhatsApp(message) { window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
watchButton.addEventListener('click', () => {
  video.src = 'https://www.youtube-nocookie.com/embed/tWH1_B8Jekk?autoplay=1&playsinline=1&rel=0';
  video.hidden = false;
  videoThumbnail.hidden = true;
  watchButton.textContent = '▶ Video Playing';
  watchButton.disabled = true;
});
bookButton.addEventListener('click', () => openWhatsApp(`${getRegistrationDetails()}\n\nI want to book my slot.`));
