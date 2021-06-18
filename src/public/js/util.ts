const icons = document.querySelectorAll('.card-icon');
const wishListItemContainer = document.querySelector('.items-container');
const favourites = new Map();
const flyout = document.querySelector('.flyout');
const flyoutIcon = document.querySelector('.flyout-icon');
const errorIcon = document.querySelector('.error-icon');
const closeFlyoutIcon = document.getElementById('close-flyout-icon');
const emptyItemsContainer = document.querySelector('.empty-items-container');

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener('click', (e: MouseEvent) => {
    const element = <HTMLElement>e.target;
    const id = element.id;

    if (element.classList.contains('selected')) {
      element.classList.remove('selected');
      favourites.delete(id);
    } else {
      favourites.set(id, { id, name: element.dataset.gamename });
      element.classList.add('selected');
    }

    redraw();
    checkEmpty();
  });
}

flyoutIcon.addEventListener('click', () => {
  if (flyout.classList.contains('opened')) {
    flyout.classList.remove('opened');
    flyoutIcon.classList.remove('opened');
  } else {
    flyout.classList.add('opened');
    flyoutIcon.classList.add('opened');
  }
});

errorIcon.addEventListener('click', () => {
  if (errorIcon.classList.contains('active')) {
    errorIcon.classList.remove('active');
  } else {
    errorIcon.classList.add('active');
  }
});

closeFlyoutIcon.addEventListener('click', () => {
  flyout.classList.remove('opened');
  flyoutIcon.classList.remove('opened');
});

const getItemHtmlElement = (id: string, label: string): HTMLElement => {
  let div = document.createElement('div');
  div.setAttribute('class', 'wishlist-item-container');
  div.innerHTML = `<div class="">
            <div class="wishlist-item">
             <div class="wishlist-item-label" style="padding: 5px">${label}</div>
             <div class="wishlist-item-icon-container">

            </div>
          </div>
        </div>`;

  let icon = document.createElement('i');
  icon.setAttribute('data-gameid', id);
  icon.setAttribute('style', 'color: black');
  icon.setAttribute('class', 'fas fa-trash-alt fa-lg delete-icon');

  icon.addEventListener('click', () => {
    document.getElementById(id).classList.remove('selected');
    favourites.delete(id);
    redraw();
    checkEmpty();
  });

  div
    .getElementsByClassName('wishlist-item-icon-container')[0]
    .appendChild(icon);

  return div;
};

const redraw = () => {
  const container = <HTMLElement>wishListItemContainer;
  container.innerHTML = '';

  favourites.forEach(f => {
    container.appendChild(getItemHtmlElement(f.id, f.name));
  });
};

const checkEmpty = () => {
  if (favourites.size === 0) {
    wishListItemContainer.classList.add('empty');
    emptyItemsContainer.classList.add('empty');
  } else {
    wishListItemContainer.classList.remove('empty');
    emptyItemsContainer.classList.remove('empty');
  }
};
