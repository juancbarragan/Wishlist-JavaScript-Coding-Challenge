const icons = document.querySelectorAll('.fa-heart');

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener('click', (e: MouseEvent) => {
    const element = <HTMLElement>e.target;

    if (element.classList.contains('selected')) {
      element.classList.add('selected');

      element.classList.remove('selected');
    } else {
      element.classList.add('selected');
    }
  });
}
