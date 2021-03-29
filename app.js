
const getCarouselDimensions = () => {
  const ASPECT_RATIO = window.screen.availWidth / window.screen.availHeight;
  const SCALE_FACTOR = ASPECT_RATIO < 1 ? 0.9 : 0.7;
  const IMG_WIDTH = Math.floor(window.innerWidth * SCALE_FACTOR);
  const IMG_HEIGHT = ASPECT_RATIO > 1 ? Math.floor(IMG_WIDTH / ASPECT_RATIO) : Math.floor(IMG_WIDTH * ASPECT_RATIO);
  return [IMG_WIDTH, IMG_HEIGHT];
};

let [CAROUSEL_WIDTH, CAROUSEL_HEIGHT] = getCarouselDimensions();

const CAROUSEL_IMAGE = document.querySelector('#carousel-image');
const CAROUSEL_PREV_BTN = document.querySelector('.prev');
const CAROUSEL_NEXT_BTN = document.querySelector('.next');
const CAROUSEL_CURR_POS = document.querySelector('.current-position');
const CAROUSEL_TOTAL = document.querySelector('.total');

const GET_RANDOM_NUMBER = (min = 3, max = 10) => Math.floor(Math.random() * (max - min)) + min;
const GET_RANDOM_IMAGE_URL = (SEED) => `https://picsum.photos/seed/${SEED}/${CAROUSEL_WIDTH}/${CAROUSEL_HEIGHT}`;
// set image width and height
const IMG_ARRAY = new Array(GET_RANDOM_NUMBER()).fill().map(() => new Image(CAROUSEL_WIDTH, CAROUSEL_HEIGHT));

const preloadImages = () => {
  IMG_ARRAY.forEach((img, index) => {
    img.src = GET_RANDOM_IMAGE_URL(index);
  });
}


preloadImages();

let curr_pos = 0;
const ARR_START = 0;
const ARR_END = IMG_ARRAY.length - 1;
CAROUSEL_TOTAL.textContent = IMG_ARRAY.length;
const setCurrentImage = () => {
  CAROUSEL_IMAGE.src = IMG_ARRAY[curr_pos].src;
  CAROUSEL_CURR_POS.textContent = curr_pos + 1;
}
setCurrentImage();
const previousImage = () => {
  curr_pos = curr_pos > ARR_START ? curr_pos - 1 : ARR_END;
  console.log("prev", { curr_pos, ARR_START });
  setCurrentImage();
}
const nextImage = () => {
  curr_pos = curr_pos < ARR_END ? curr_pos + 1 : ARR_START;
  console.log("next", { curr_pos, ARR_END });
  setCurrentImage();
}

window.addEventListener('resize', function () {
  [CAROUSEL_WIDTH, CAROUSEL_HEIGHT] = getCarouselDimensions();
  preloadImages();
  setCurrentImage();
});

CAROUSEL_NEXT_BTN.addEventListener('click', function () {
  nextImage();
});

CAROUSEL_PREV_BTN.addEventListener('click', function () {
  previousImage();
});



