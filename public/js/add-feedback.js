const addFeedbackHandler = async (event) => {
  event.preventDefault();
  document.location.replace("/single-achievement");
};

document
  .querySelector(".achievement-name-container")
  .addEventListener("submit", addFeedbackHandler);
