const icons = document.querySelectorAll('.card-icon');
const wishListItemContainer = document.querySelector('.items-container');
const favourites = new Set();

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener('click', (e: MouseEvent) => {
    const element = <HTMLElement>e.target;
    const id = element.id;

    console.log(id);

    if (element.classList.contains('selected')) {
      element.classList.remove('selected');
      favourites.delete(id);
    } else {
      favourites.add(id);
      element.classList.add('selected');
    }

    const container = <HTMLElement>wishListItemContainer;

    let listOfItems = '';

    console.log(favourites);

    favourites.forEach(item => {
      listOfItems += getItemHtml('hola');
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
             <div class="wishlist-item-label" style="padding: 5px">gola</div>
             <div class="wishlist-item-icon-container">
              <i
                class="fas fa-trash-alt fa-lg flyout-icon"
                style="color: black"
              ></i>
            </div>
          </div>
        </div>`;
};
