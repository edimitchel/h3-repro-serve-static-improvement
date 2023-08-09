
fetch('/api/users')
  .then((response) => response.json())
  .then((users) => {
    document.querySelector('section').innerText = users
      .map((user) => user.name)
      .join(', ');
  });

document.querySelector('code').innerHTML = window.location.pathname