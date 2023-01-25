// wait until 1ms after animation
const timeout = setTimeout(() => {
  const btn = document.querySelector(".achievement-name-container");
  addEventListener("click", addFeedbackHandler);
}, 2501);

const addFeedbackHandler = (event) => {
  event.preventDefault();
  document.location.replace(`/single-achievement/${event.target.dataset.id}`);
};

// document
//   .querySelector(".achievement-name-container")
//   .addEventListener("click", addFeedbackHandler);
