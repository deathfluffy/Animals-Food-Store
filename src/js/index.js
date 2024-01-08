import imageData from '../js/imageData';
import icons from '../img/icons.svg';

const sectionAllProducts = document.getElementById('all-products');
const productList = sectionAllProducts.querySelector(
  '.product-list-product__list'
);
const paginator = document.querySelector('.paginator');
const yOffset = -80;

const state = {
  currentPage: 1,
  itemsPerPage: 10,
  originalOrder: [...imageData],
  shouldShuffle: true,
};

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function renderProductCards({ page = 1 }) {
  state.currentPage = page;

  if (state.shouldShuffle) {
    state.originalOrder = shuffleArray([...imageData]);
    state.shouldShuffle = false;
  }

  const startIndex = (page - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const markup = state.originalOrder
    .slice(startIndex, endIndex)
    .map(({ _id, name, img, category, price, isInStock, artukyl, brend }) => {
      return `
        <li data-num="${_id}" class="product-list-product__card num">
          <div class="product-list-box__img">
            <img
              class="product-list-card__image"
              src=${img}
              alt=${name}
              width="140"
              height="140"
            />
          </div>
          <div class="product-list-info__box">
            <h3 class="product-list-name__product">${name}</h3>
            <p class="product-list-info__item">
              <span class="product-list-span__text">Артикул:</span>
              <span>${artukyl}</span>
            </p>
            <p class="product-list-info__item">
              <span class="product-list-span__text">Бренд:</span>
              <span>${brend}</span>
            </p>
            <p class="product-list-info__item">
              <span class="product-list-span__text">На складі:</span>
              <span>${isInStock ? 'Присутній' : 'Немає'}</span>
            </p>
            <p class="product-list-info__item">
              <span class="product-list-span__text">Категорія:</span>
              <span>${category}</span>
            </p>
          </div>
          <div class="product-list-price__btn">
            <p class="product-list-price__product">${price}грн</p>
            <button
              type="button"
              class="product-list-button__card"
              arial-label="product button"
            >
              <svg class="product-list-icon__btn" width="18" height="18">
                <use href="${icons}#icon-shopping-cart"></use>
              </svg>
            </button>
          </div>
        </li>`;
    })
    .join('');

  productList.innerHTML = markup;
  const buttons = paginator.querySelectorAll('.page-number');
  buttons.forEach(button => {
    const pageNumber = parseInt(button.dataset.pageNumber);
    if (pageNumber === page) {
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
    }
  });
}

function handlePaginationClick(event) {
  const target = event.target;
  if (target.classList.contains('page-number')) {
    const pageNumber = parseInt(target.dataset.pageNumber);
    renderProductCards({ page: pageNumber });

    const y =
      sectionAllProducts.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

paginator.addEventListener('click', handlePaginationClick);

renderProductCards({ page: 1 });
