const observer = new IntersectionObserver(
  function ({ [0]: h1 }) {
    document.getElementsByClassName('logo')[0].hidden = h1.isIntersecting;
  },
  { threshold: [0] }
);

observer.observe(document.querySelector('h1'));
