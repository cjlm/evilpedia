const observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting === false) {
      console.log('Element has just gone');
      document.getElementsByClassName('logo')[0].hidden = false;
    } else {
      document.getElementsByClassName('logo')[0].hidden = true;
    }
  },
  { threshold: [0] }
);

observer.observe(document.querySelector('h1'));
