const hideSmallLogo = (hidden = true) => {
  document.getElementsByClassName('logo')[0].hidden = hidden;
};

const observer = new IntersectionObserver(
  ({ [0]: h1 }) => {
    hideSmallLogo(h1.isIntersecting);
  },
  { threshold: [0] }
);

const bigLogo = document.querySelector('h1 svg');
if (!bigLogo) {
  hideSmallLogo(false);
} else {
  observer.observe(bigLogo);
}

const table = document.getElementsByClassName('table-sortable')[0];
if (table) {
  new Tablesort(table, {
    descending: true,
  });
}
