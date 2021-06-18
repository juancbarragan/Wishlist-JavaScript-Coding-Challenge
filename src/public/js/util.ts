const icons = document.querySelectorAll('.card-icon');
const wishListItemContainer = document.querySelector('.items-container');
const favourites = new Map();

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener('click', (e: MouseEvent) => {
    const element = <HTMLElement>e.target;
    const id = element.id;

    if (element.classList.contains('selected')) {
      element.classList.remove('selected');
      favourites.delete(id);
    } else {
      favourites.set(id, { name: element.dataset.gamename });
      element.classList.add('selected');
    }

    const container = <HTMLElement>wishListItemContainer;

    let listOfItems = '';

    favourites.forEach(f => {
      console.log(f);
      listOfItems += getItemHtml(f.name);
    });

    container.innerHTML = listOfItems;
  });
}

const flyout = document.querySelector('.flyout');
const flyoutIcon = document.querySelector('.flyout-icon');
flyoutIcon.addEventListener('click', (e: MouseEvent) => {
  if (flyout.classList.contains('opened')) {
    flyout.classList.remove('opened');
  } else {
    flyout.classList.add('opened');
  }
});

const getItemHtml = (label: string) => {
  return `<div class="wishlist-item-container">
            <div class="wishlist-item">
             <div class="wishlist-item-label" style="padding: 5px">${label}</div>
             <div class="wishlist-item-icon-container">
              <i
                class="fas fa-trash-alt fa-lg flyout-icon"
                style="color: black"
              ></i>
            </div>
          </div>
        </div>`;
};
