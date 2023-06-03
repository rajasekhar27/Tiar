import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

function findLeft(element) {
  var rec = element.getBoundingClientRect();
  return rec.left + window.scrollX;
}

function SwipeButton({
  title,
  overlayText,
  onSwipeDone,
  reset,
  classList = "",
  overlayClassList = "",
  caretClassList = "",
  delta = 10,
  minSwipeWidth = 0.6,
  minSwipeVelocity = 0.6,
  caret = null,
}) {
  const [overlayWidth, setOverlayWidth] = useState(60);
  const [swipeComplete, setSwipeComplete] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    if (reset) {
      setSwipeComplete(false);
      setOverlayWidth(60);
    }
  }, [reset]);

  const handlers = useSwipeable({
    onSwipedRight: (data) => {
      if (swipeComplete) return;
      const butWidth = buttonRef.current.offsetWidth;
      if (data.velocity > minSwipeVelocity) {
        setOverlayWidth(butWidth);
        setSwipeComplete(true);
        setTimeout(() => onSwipeDone(), 100);
      } else {
        const offsetLeft = findLeft(buttonRef.current);
        const startPos = Math.abs(data.initial[0] - offsetLeft);
        if (
          startPos <= 100 &&
          (data.event.type === "touchend"
            ? data.event.changedTouches[0].clientX - offsetLeft
            : data.event.offsetX) >
            minSwipeWidth * butWidth
        ) {
          setOverlayWidth(butWidth);
          setSwipeComplete(true);
          setTimeout(() => onSwipeDone(), 100);
        } else setOverlayWidth(60);
      }
    },
    onSwiping: (data) => {
      if (swipeComplete) return;
      const offsetLeft = findLeft(buttonRef.current);
      const startPos = Math.abs(data.initial[0] - offsetLeft);
      if (startPos <= 100) {
        if (data.event.type && data.event.type === "touchmove")
          setOverlayWidth(data.event.touches[0].clientX - offsetLeft);
        else setOverlayWidth(data.event.offsetX);
      }
    },
    delta,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div
      className={`swipe-but rounded-full bg-white ${classList}`}
      {...handlers}
      ref={(t) => {
        handlers.ref(t);
        buttonRef.current = t;
      }}
    >
      <div
        className={`swipe-overlay bg-red-500 ${overlayClassList}`}
        style={{ width: overlayWidth }}
      >
        <div className="swipe-overlay-wrapper">
          <div className={`swipe-caret-wrapper ${caretClassList} `}>
            {caret ? (
              caret
            ) : (
              // <img src={Arrow} alt="caret" style={{ maxWidth: "100%" }} />
              <HiOutlineChevronDoubleRight color="white" />
            )}
          </div>
          <div className="swipe-overlay-txt">{overlayText}</div>
        </div>
      </div>
      <p className="text-ownOrange text-[18px] font-semibold">{title}</p>
    </div>
  );
}

export default SwipeButton;
