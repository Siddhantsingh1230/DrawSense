const classNames = ["small", "medium", "big","xl","xs","xxl","color1","color2","color3","color4"];
const randomSizeGeneartor = () => {
  return classNames[Math.floor(Math.random() * classNames.length)];
};

const container = document.querySelector(".container");
const moreBtn = document.querySelector(".more");

const createCards = (index) => {
  for (let i = index; i <= index + 14; i++) {
    let card = document.createElement("div");
    card.classList.add(randomSizeGeneartor());
    let url = "https://drawsensearchives.onrender.com/Image?file=" + i;
    console.log(url);
    let styles =
      `border-radius: 1rem;
        margin: 0.5rem;
        background-image: url('` +
      url +
      `');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;`;
    card.setAttribute("style", styles);
    container.appendChild(card);
  }
};

let index = 1;
const fetchCards = () => {
  createCards(index);
  index += 15;
};
fetchCards();
moreBtn.addEventListener("click", () => {
  fetchCards();
});
