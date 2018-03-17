// Copyright (c) 2017 Lea Hayes. All rights reserved.

document.addEventListener("DOMContentLoaded", function(event) {


  function bemClass(block, element, modifier) {
    var className = block;
    if (!!element) {
      className += "__" + element;
    }
    if (!!modifier) {
      className += "--" + modifier;
    }
    return className;
  }

  function createModalElement(parent, type, block, element, modifier) {
    var el = parent.appendChild(document.createElement(type));
    el.classList.add(bemClass(block, element));
    if (modifier) {
      el.classList.add(bemClass(block, element, modifier));
    }
    return el;
  }

  function createModalViewer(entries) {
    var context = { images: [], currentIndex: 0 };
    for (var i = 0; i < entries.length; ++i) {
      context.images[i] = entries[i].getAttribute("data-src");
    }

    var modal = createModalElement(document.body, "div", "gallery-modal");

    var buttons = createModalElement(modal, "div", "gallery-modal", "buttons");
    var buttonPrev = createModalElement(buttons, "div", "gallery-modal", "button", "prev");
    var buttonNext = createModalElement(buttons, "div", "gallery-modal", "button", "next");
    var buttonClose = createModalElement(buttons, "div", "gallery-modal", "button", "close");

    var image = createModalElement(modal, "img", "gallery-modal", "image");

    context.setCurrentImage = function (index) {
      if (index < 0) {
        index = this.images.length - 1;
      }
      if (index >= this.images.length) {
        index = 0;
      }
      this.currentIndex = index;
      image.setAttribute("src", this.images[index]);
    };

    context.show = function (index) {
      this.setCurrentImage(index);
      modal.style.display = "block";
    };
    context.hide = function () {
      modal.style.display = "none";
    };

    modal.addEventListener("click", function(e) {
      context.hide();
      e.stopPropagation();
    });

    buttonPrev.addEventListener("click", function (e) {
      context.setCurrentImage(context.currentIndex - 1);
      e.stopPropagation();
    });
    buttonNext.addEventListener("click", function (e) {
      context.setCurrentImage(context.currentIndex + 1);
      e.stopPropagation();
    });

    return context;
  }


  var galleries = document.getElementsByClassName("gallery");
  for (var i = 0; i < galleries.length; ++i) {
    var gallery = galleries[i];
    var entries = gallery.getElementsByClassName(bemClass("gallery", "nav-thumb"));

    var modal = createModalViewer(entries);
    for (var j = 0; j < entries.length; ++j) {
      entries[j].addEventListener("click", getClickHandler(modal, j));
    }
  }


  function getClickHandler(modal, imageIndex) {
    return function (e) {
      modal.show(imageIndex);
      e.stopPropagation();
    };
  }


});
