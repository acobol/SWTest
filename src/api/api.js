const swapiURL = "https://swapi.dev/api";

export function getCharacters(page, successCb, errorCb) {
  fetch(`${swapiURL}/people/?page=${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      successCb?.(data);
    })
    .catch((err) => {
      errorCb?.(err);
    });
}

export function getCharacter(name, successCb, errorCb) {
  fetch(`${swapiURL}/people/?search=${name}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      successCb?.(data)
    })
    .catch((err) => {
      errorCb?.()
    });
}

export function getFilms(successCb, errorCb) {
  fetch(`${swapiURL}/films`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      successCb?.(data)
    })
    .catch((err) => {
      errorCb?.()
    });
}