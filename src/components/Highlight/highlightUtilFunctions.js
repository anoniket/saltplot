import React from "react";
import ReactDOM from "react-dom";
import { colors } from "./colors.js";

export const assignedColors = {};

export const allColors = shuffle(colors);

//shuffle available colors for highliting
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// get the x and y coordinates of selected text
export const getSelectionCoords = () => {
  const sele = window.getSelection();
  const oRange = sele.getRangeAt(0);
  const oRect = oRange.getBoundingClientRect();
  return {
    x: Math.floor(oRect.x),
    y: Math.floor(oRect.y),
  };
};

// color the highlighted text
export const colorTags = () => {
  const highlightTags = Array.from(document.querySelectorAll(".tag-highlight"));

  highlightTags.map((tag) => {
    const index = Math.floor(tag.getBoundingClientRect().y);
    tag.style.background = assignedColors[index];
    return null;
  });
};

export const placeDiv = (y_pos, text) => {
  const tagsContainer = document.querySelector(".tags");
  const tags = Array.from(document.querySelectorAll(".tag"));

  // craete a new Tag span with the correct y position to align it to the highlighted line
  const newTag = React.createElement(
    "span",
    {
      style: {
        position: "absolute",
        left: `${tagsContainer.getBoundingClientRect().left}px`,
        top: `${y_pos}px`,
        background: `${assignedColors[y_pos]}`,
      },
      className: `tag ${y_pos}`,
      key: text,
    },
    `${text.substring(0, 15)}...`
  );

  const allTags = [];
  // fetch all previous tags and create a new Fragment to be rendered
  for (let i = 0; i < tags.length; i++) {
    // if multiple spans are selected in the same line, show tag of latest selection
    const sameLineTag = tags[i].className.includes(`${y_pos}`);

    if (!sameLineTag) {
      let newYPos = tags[i].className.split(" ")[1];
      const tag = React.createElement(
        "span",
        {
          style: {
            position: "absolute",
            left: `${tags[i].offsetLeft}px`,
            top: `${tags[i].offsetTop}px`,
            background: `${assignedColors[newYPos]}`,
          },
          className: tags[i].className,
          key: i,
        },
        `${tags[i].innerText}`
      );
      allTags.push(tag);
    }
  }

  allTags.push(newTag);
  ReactDOM.render(allTags, tagsContainer);

  colorTags();
};
