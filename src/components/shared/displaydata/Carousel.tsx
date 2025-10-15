"use client";

import { cn } from "@/common/utils/cn";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "keen-slider/keen-slider.min.css";
import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
  useKeenSlider,
} from "keen-slider/react";
import {
  CSSProperties,
  Children,
  MutableRefObject,
  ReactNode,
  isValidElement,
  useState,
} from "react";
import Thumbnail from "./Thumbnail";

export function Carousel({
  className,
  style,
  autoPlay,
  children,
  loop,
  hideDot,
  hideDotOnMobile,
  hideArrow,
  hideArrowOnMobile,
  slides,
  mode = "snap",
  breakpoints,
  thumbnail = false,
  classNameDot,
  onChangeSlide,
  delay,
}: {
  className?: string;
  style?: CSSProperties | undefined;
  autoPlay?: boolean;
  children: ReactNode;
  loop?: boolean;
  hideDot?: boolean;
  hideDotOnMobile?: boolean;
  hideArrow?: boolean;
  hideArrowOnMobile?: boolean;
  thumbnail?: boolean;
  mode?: "free" | "snap" | "free-snap" | undefined;
  breakpoints?:
    | {
        [key: string]: Omit<
          KeenSliderOptions<{}, {}, KeenSliderHooks>,
          "breakpoints"
        >;
      }
    | undefined;
  slides?:
    | number
    | {
        origin?: "center" | "auto" | number;
        number?: number | (() => number | null) | null;
        perView?: "auto" | number | (() => number | "auto");
        spacing?: number | (() => number);
      }
    | null;
  classNameDot?: string;
  delay?: number;
  onChangeSlide?: (index: number) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: slides,
      loop: loop,
      mode: mode,
      initial: 0,
      breakpoints: breakpoints,
      slideChanged(slider) {
        const currSlide = slider.track.details.rel;
        const maxIdx = slider.track.details.maxIdx;
        setCurrentSlide(currSlide);
        if (onChangeSlide) onChangeSlide(currSlide + 1);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        if (!autoPlay) return;
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (
              slider.track.details?.position ===
              slider.track.details?.slidesLength - 1
            ) {
              slider.moveToIdx(0);
            } else {
              slider.next();
            }
          }, delay ?? 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const handlePrevClick = (e: any) => {
    e.stopPropagation();
    if (!instanceRef.current) return;
    const details = instanceRef.current.track.details;
    if (!loop && details.position <= 0) return;
    if (instanceRef.current && details.position === 0)
      instanceRef.current?.moveToIdx(details.slidesLength - 1);
    else instanceRef.current?.prev();
  };

  const handleNextClick = (e: any) => {
    e.stopPropagation();
    if (!instanceRef.current) return;
    const details = instanceRef.current.track.details;
    if (!loop && details.position >= details.maxIdx) return;
    if (
      instanceRef.current &&
      instanceRef.current.track.details?.position ===
        instanceRef.current?.track.details?.slidesLength - 1
    )
      instanceRef.current?.moveToIdx(0);
    else instanceRef.current?.next();
  };

  return (
    <>
      <div className={cn("relative", className)} style={style}>
        <div ref={sliderRef} className={cn("keen-slider", "h-full")}>
          {thumbnail
            ? Children.map(children, (child, index) => {
                if (isValidElement(child)) {
                  return (
                    <Thumbnail
                      key={index}
                      className="w-full h-full cursor-pointer"
                    >
                      {child}
                    </Thumbnail>
                  );
                }
                return child;
              })
            : children}
        </div>
        {!hideArrow && loaded && instanceRef.current && (
          <>
            <IconChevronLeft
              onClick={handlePrevClick}
              className={cn(
                "w-8 h-16 rounded-r-md absolute top-1/2 -translate-y-1/2 cursor-pointer bg-gray-800 hover:opacity-50 opacity-20 max-h-full",
                !loop && currentSlide === 0
                  ? "hover:opacity-20 cursor-not-allowed"
                  : "",
                hideArrowOnMobile ? "max-md:hidden" : ""
              )}
              color="white"
            />

            <IconChevronRight
              className={cn(
                "w-8 h-16 rounded-l-md absolute top-1/2 -translate-y-1/2 cursor-pointer bg-gray-800 hover:opacity-50 opacity-20 max-h-full",
                "right-0",
                !loop &&
                  currentSlide === instanceRef.current.track.details?.maxIdx
                  ? "hover:opacity-20 cursor-not-allowed"
                  : "",
                hideArrowOnMobile ? "max-md:hidden" : ""
              )}
              color="white"
              onClick={handleNextClick}
            />
          </>
        )}
        {!hideDot && !thumbnail && loaded && instanceRef.current && (
          <div
            className={cn(
              "flex py-2 justify-center absolute bottom-0 w-full",
              hideDotOnMobile ? "max-md:hidden" : ""
            )}
          >
            {Array.from(
              Array(instanceRef.current.track.details?.slides?.length).keys()
            ).map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  data-active={currentSlide === idx}
                  className={cn(
                    "border-none w-2 h-2 bg-gray-300 rounded-full mx-1 p-1 cursor-pointer",
                    "focus:outline-none",
                    "data-[active=true]:bg-black",
                    classNameDot
                  )}
                ></button>
              );
            })}
          </div>
        )}
      </div>

      {thumbnail ? (
        <div
          ref={thumbnailRef}
          className="keen-slider thumbnail mt-2 [&_>_div]:border [&_>_div]:cursor-pointer [&_>_div]:rounded"
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

export function CarouselItem({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties | undefined;
}) {
  return (
    <div className={cn("keen-slider__slide", className)} style={style}>
      {children}
    </div>
  );
}

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}
