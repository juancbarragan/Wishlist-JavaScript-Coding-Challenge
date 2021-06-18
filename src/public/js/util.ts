const icons = document.querySelectorAll('.card-icon');
const wishListItemContainer = document.querySelector(
  '.wish-list-item-container'
);
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
      listOfItems += '<div><h4>hola</h4></div>';
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
  return;
};
