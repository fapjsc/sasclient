import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

export const scrollToBottom = (id) => {
  scroll.scrollToBottom({
    containerId: id,
    duration: 0,
  });
};

export const scrollToBottomAnimated = (id) => {
  scroll.scrollToBottom({
    containerId: id,
    duration: 250,
  });
};
