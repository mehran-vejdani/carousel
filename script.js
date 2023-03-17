const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper i");
const firstImg = carousel.querySelectorAll("img")[0];

let isDragStart = false,
  prevPageX,
  prevScrollLeft,
  postionDiff,
  isDragging = false;

const showHideIcon = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcon(), 50);
  });
});

const autoSlide = () => {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  postionDiff = Math.abs(postionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - postionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      postionDiff > firstImgWidth / 3 ? valDifference : -postionDiff);
  }
  carousel.scrollLeft -=
    postionDiff > firstImgWidth / 3 ? valDifference : -postionDiff;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  isDragging = true;
  carousel.scrollLeft = e.pageX;
  postionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - postionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
  showHideIcon();
};
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  autoSlide();
};
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
////mobile

carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchend", dragStop);
