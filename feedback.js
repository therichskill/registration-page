document.getElementById('askButton').addEventListener('click', () => {
  const message = encodeURIComponent('I want to ask something?');
  window.location.href = `https://wa.me/917688897306?text=${message}`;
});
