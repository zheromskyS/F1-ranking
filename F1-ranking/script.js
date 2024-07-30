const participants = document.querySelector(".participants");
const selectName = document.getElementById("name");
const changeForm = document.getElementById("change-form");
const changePosition = document.getElementById("change-position");

function renderImg(appendInElement, direction) {
  if (direction === "up") {
    const imgUp = document.createElement("img");
    imgUp.src = "./assets/up.svg";
    appendInElement.append(imgUp);
  } else {
    const imgDown = document.createElement("img");
    imgDown.src = "./assets/down.svg";
    appendInElement.append(imgDown);
  }
}

async function test() {
  const array = await fetch("participants.json").then((response) =>
    response.json(),
  );

  array.forEach((person) => {
    renderParticipant(person);
    renderChangeParticipant(person);
  });
}

function renderParticipant(person) {
  const participant = document.createElement("div");
  participant.classList.add("participant");

  const participantPosition = document.createElement("span");
  participantPosition.classList.add("position");
  participantPosition.textContent = person.position;

  const participantName = document.createElement("span");
  participantName.classList.add("name");
  participantName.textContent = person.name;

  participant.append(participantPosition);
  participant.append(participantName);

  participants.append(participant);
}

function renderChangeParticipant(person) {
  const option = document.createElement("option");
  option.textContent = person.name;
  selectName.append(option);
}

changeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  Array.from(participants.children).forEach((participant) => {
    if (participant.querySelector(".name").textContent === selectName.value) {
      let firstPosition = participant.querySelector(".position").textContent;
      Animation(
        participant,
        Number(firstPosition),
        Number(changePosition.value),
      );
      participant.querySelector(".position").textContent = changePosition.value;
    }
  });
});

function Animation(participant, firstPosition, secondPosition) {
  if (firstPosition > secondPosition) {
    Array.from(participants.children)
      .sort((a, b) => a.children[0].textContent - b.children[0].textContent)
      .slice(secondPosition - 1, firstPosition - 1)
      .forEach((element, index, array) => {
        element.querySelector(".position").textContent++;
        element.style.top = `${Number(element.style.top.slice(0, element.style.top.length - 2)) + 62}px`;
        renderImg(element, "down");
      });

    participant.style.top = `${Number(participant.style.top.slice(0, participant.style.top.length - 2)) + (firstPosition - secondPosition) * -62}px`;
    renderImg(participant, "up");
  } else if (firstPosition < secondPosition) {
    Array.from(participants.children)
      .sort((a, b) => a.children[0].textContent - b.children[0].textContent)
      .slice(firstPosition, secondPosition)
      .forEach((element) => {
        element.querySelector(".position").textContent--;
        element.style.top = `${Number(element.style.top.slice(0, element.style.top.length - 2)) - 62}px`;
        renderImg(element, "up");
      });

    participant.style.top = `${Number(participant.style.top.slice(0, participant.style.top.length - 2)) + (secondPosition - firstPosition) * 62}px`;
    renderImg(participant, "down");
  }
}

test();
