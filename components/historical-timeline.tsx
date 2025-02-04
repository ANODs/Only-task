import type React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gsap from "gsap";

interface HistoricalEvent {
  year: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  startYear: string;
  endYear: string;
  events: HistoricalEvent[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "Кино",
    startYear: "1987",
    endYear: "1991",
    events: [
      { year: "1987", description: "«Хищник»/Predator (реж. Джон Мактирнан)" },
      { year: "1988", description: "«Кто подставил кролика Роджера?»" },
      { year: "1989", description: "«Назад в будущее 2»" },
      { year: "1990", description: "«Охотники за привидениями 2»" },
    ],
  },
  {
    id: 2,
    name: "Литература",
    startYear: "1992",
    endYear: "1995",
    events: [
      { year: "1992", description: "Публикация романа «Английский пациент»" },
      { year: "1993", description: "Первая книга серии «Бесконечная история»" },
      { year: "1994", description: "Издание «Алхимика» Пауло Коэльо" },
      { year: "1995", description: "Новый перевод «Властелина колец»" },
    ],
  },
  {
    id: 3,
    name: "Театр",
    startYear: "1999",
    endYear: "2002",
    events: [
      { year: "1999", description: "Премьера балета «Золушка»" },
      { year: "2000", description: "Возобновлено издание журнала «Театр»" },
      { year: "2001", description: "Фестиваль «Золотая Маска»" },
      { year: "2002", description: "Премьера пьесы «Берег Утопии»" },
    ],
  },
  {
    id: 4,
    name: "Музыка",
    startYear: "2006",
    endYear: "2009",
    events: [
      { year: "2006", description: "Выход альбома «Stadium Arcadium» RHCP" },
      { year: "2007", description: "Релиз «In Rainbows» Radiohead" },
      { year: "2008", description: "Премия Грэмми для Amy Winehouse" },
      { year: "2009", description: "Последний концерт Oasis" },
    ],
  },
  {
    id: 5,
    name: "Искусство",
    startYear: "2015",
    endYear: "2018",
    events: [
      { year: "2015", description: "Открытие новой экспозиции в Третьяковке" },
      { year: "2016", description: "Выставка работ Айвазовского" },
      { year: "2017", description: "Инсталляция Сая Туомбли" },
      { year: "2018", description: "Фестиваль современного искусства в Венеции" },
    ],
  },
  {
    id: 6,
    name: "Наука",
    startYear: "2015",
    endYear: "2022",
    events: [
      {
        year: "2015",
        description:
          "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
      },
      {
        year: "2016",
        description:
          "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
      },
      {
        year: "2017",
        description:
          "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
      },
      { year: "2022", description: "Запуск телескопа «Джеймс Уэбб»" },
    ],
  },
];

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f4f5f9;
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100vh;
  max-height: 945px;
  background-color: #f4f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-pt-sans);
  border-left: 1px solid #42567a1a;
  border-right: 1px solid #42567a1a;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background: #42567a1a;
    top: 50%;
    transform: translateY(-50%);
  }
  &::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 100%;
    background: #42567a1a;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (max-width: 768px) {
    &::before,
    &::after {
      display: none;
    }
  }
`;

const Header = styled.div`
  position: absolute;
  margin: 170px 0 clamp(20px, 5vmin, 56px) 0;
  width: 100%;
  max-width: 1440px;
  padding-left: clamp(20px, 5vw, 78px);
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 120px;
    background: linear-gradient(180deg, #3877ee 0%, #ef5da8 100%);
  }
  @media (max-width: 768px) {
    position: relative;
    &::before {
      display: none;
    }
    margin-top: 56px;
  }
`;

const Title = styled.h1`
  font-size: clamp(32px, 5vw, 56px);
  color: #42567a;
  margin: 0;
  font-weight: 700;
  line-height: 1.2;
  font-family: var(--font-pt-sans);
`;

const TimelineVisual = styled.div`
  position: relative;
  height: 530px;
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: clamp(20px, 5vmin, 56px);
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 768px) {
    top: auto;
    transform: translateY(0);
    border-bottom: 1px solid #c7cdd9;
    height: 186px;
    margin: 0 20px;
    max-width: calc(100% - 40px);
  }
`;

interface CircleContainerProps {
  scale: number;
  visible: boolean;
}

const CircleContainer = styled.div<CircleContainerProps>`
  z-index: 100;
  position: absolute;
  width: 530px;
  height: 530px;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(${(props) => props.scale});
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(66, 86, 122, 0.2);
  border-radius: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
`;

interface CategoryDotProps {
  angle: number;
  isActive: boolean;
  isHovered: boolean;
  isClicked: boolean;
}

const CategoryDot = styled.div<CategoryDotProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate(${(props) => props.angle}deg)
    translateX(265px);
  .dot-container {
    transform-origin: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .dot {
    width: ${(props) => (props.isActive || props.isHovered ? `56px` : `8px`)};
    height: ${(props) => (props.isActive || props.isHovered ? `56px` : `8px`)};
    border-radius: 50%;
    border: 1px solid
      ${(props) =>
        props.isActive || props.isHovered
          ? "rgba(48, 62, 88, 0.5)"
          : "transparent"};
    background-color: ${(props) =>
      props.isActive || props.isHovered ? "#ffffff" : "#42567a"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${(props) =>
      props.isActive || props.isHovered ? "#42567a" : "transparent"};
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: ${(props) =>
      props.isClicked
        ? "0 0 8px 2px rgba(48, 62, 88, 0.5)"
        : "none"};
  }
  .label {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 700;
    color: #42567a;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const Navigation = styled.div`
  flex-direction: column;
  position: absolute;
  bottom: -56px;
  left: clamp(20px, 5vw, 80px);
  display: flex;
  align-items: start;
  gap: 20px;
  margin-bottom: 56px;
`;

const CategoryNavigation = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Counter = styled.div`
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  color: #42567a;
  font-family: var(--font-pt-sans);
`;

const NavButton = styled.button<{ direction: "prev" | "next" }>`
  width: clamp(25px, 5vmin, 50px);
  height: clamp(25px, 5vmin, 50px);
  border-radius: 50%;
  border: 1px solid rgba(66, 86, 122, 0.5);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-top: 2px solid #42567a;
    border-right: 2px solid #42567a;
    transform: rotate(
      ${(props) => (props.direction === "prev" ? "225deg" : "45deg")}
    );
  }
  &:hover {
    background-color: #fff;
    &::before {
      border-color: #000;
    }
  }
`;

const MobileNavButton = styled(NavButton)`
  width: 30px;
  height: 30px;
  &::before {
    width: 5px;
    height: 5px;
  }
`;

const MobileCounter = styled(Counter)`
  position: fixed;
  left: 20px;
  bottom: 53px;
  z-index: 200;
`;

const MobileNavButtons = styled.div`
  position: fixed;
  left: 20px;
  bottom: 15px;
  display: flex;
  gap: 8px;
  z-index: 200;
`;

const MobilePagination = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 200;
`;

const BulletNav = styled.div`
  display: flex;
  gap: 8px;
`;

const Bullet = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#42567a" : "#C7CDD9")};
  border: none;
  cursor: pointer;
`;

const SlideContent = styled.div<{ mobileOpacity?: number }>`
  h3 {
    font-size: clamp(20px, 2vw, 25px);
    margin: 0 0 15px 0;
    font-weight: 700;
    font-family: var(--font-pt-sans);
    color: #3877ee;
    @media (max-width: 768px) {
      font-size: 25px;
    }
  }
  p {
    font-size: clamp(16px, 1vw, 20px);
    margin: 0;
    line-height: 1.5;
    font-family: var(--font-pt-sans);
    color: #42567a;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
  opacity: ${(props) =>
    props.mobileOpacity !== undefined ? props.mobileOpacity : 1};
  transition: opacity 0.3s ease;
`;

const SliderWrapper = styled.div`
  bottom: 0;
  transform: translateY(calc(100% + 56px));
  position: absolute;
  width: 100%;
  display: flex;
  background: #f4f5f9;
  @media (max-width: 768px) {
    bottom: auto;
    position: relative;
  }
`;

const SliderInner = styled.div`
  width: 100%;
  display: flex;
`;

const SliderContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  padding: 0 clamp(20px, 5vw, 80px);
  @media (max-width: 768px) {
    height: 114px;
    padding-top: 20px;
  }
`;

const SliderNavButton = styled.button<{ position: "left" | "right" }>`
  z-index: 100;
  position: absolute;
  top: 50%;
  ${(props) => (props.position === "left" ? "left: 40px;" : "right: 10px;")}
  transform: translate(-50%);
  background-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #3877ee;
  cursor: pointer;
  transition: opacity 0.1s ease;
  opacity: 1;
  text-align: center;
  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
  border: none;
  transition: 0.3s;
  &:hover {
    background-color: rgb(220, 243, 252);
    &::before {
      border-color: #ffffff;
    }
  }
`;

const AnimatedYear = ({
  year,
  isLeft,
}: {
  year: string;
  isLeft?: boolean;
}) => {
  const [displayedYear, setDisplayedYear] = useState(year);
  const previousYear = useRef(year);
  useEffect(() => {
    if (year === previousYear.current) return;
    const start = parseInt(previousYear.current);
    const end = parseInt(year);
    const duration = 1000;
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);
      setDisplayedYear(current.toString());
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    previousYear.current = year;
  }, [year]);
  return <Year isLeft={isLeft}>{displayedYear}</Year>;
};

const BigYears = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: clamp(20px, 10vmin, 95px);
`;

const Year = styled.div<{ isLeft?: boolean }>`
  font-size: clamp(56px, 10vw, 200px);
  font-weight: 700;
  color: ${(p) => (p.isLeft ? "#3877ee" : "#ef5da8")};
  line-height: 1;
  font-family: var(--font-pt-sans);
`;

export const HistoricalTimeline: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [sliderCategoryIndex, setSliderCategoryIndex] = useState(0);
  const [circleScale, setCircleScale] = useState(1);
  const [circleVisible, setCircleVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const updateDisplay = () => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width < 768) {
      setCircleVisible(false);
      setIsMobile(true);
    } else {
      setCircleVisible(true);
      setIsMobile(false);
      const scale = 0.6 + ((width - 768) * (1 - 0.6)) / (1920 - 768);
      setCircleScale(scale > 1 ? 1 : scale);
    }
  };
  useEffect(() => {
    updateDisplay();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDisplay);
      return () => window.removeEventListener("resize", updateDisplay);
    }
  }, []);
  const wheelRotationRef = useRef<number>(-60);
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const sliderInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isSliderBeginning, setIsSliderBeginning] = useState(true);
  const [isSliderEnd, setIsSliderEnd] = useState(false);
  const currentSlideNumber = (activeCategoryIndex + 1)
    .toString()
    .padStart(2, "0");
  const totalSlidesNumber = categories.length.toString().padStart(2, "0");
  useEffect(() => {
    const activeLabel = dotsRef.current[activeCategoryIndex]?.querySelector(
      ".label"
    );
    if (activeLabel) gsap.set(activeLabel, { opacity: 1 });
  }, []);
  const handleNavClick = (direction: "prev" | "next") => {
    let newIndex =
      direction === "prev" ? activeCategoryIndex - 1 : activeCategoryIndex + 1;
    if (newIndex < 0) newIndex = categories.length - 1;
    if (newIndex >= categories.length) newIndex = 0;
    handleCategoryClick(newIndex, direction);
  };
  const handleCategoryClick = (
    newIndex: number,
    forceDirection?: "prev" | "next"
  ) => {
    if (newIndex === activeCategoryIndex) return;
    setIsAnimationComplete(false);
    setClickedIndex(newIndex);
    const oldLabel = dotsRef.current[activeCategoryIndex]?.querySelector(
      ".label"
    );
    if (oldLabel) {
      gsap.to(oldLabel, { opacity: 0, duration: 0.3 });
    }
    const newDot = dotsRef.current[newIndex]?.querySelector(".dot");
    if (newDot) {
      gsap.to(newDot, {
        boxShadow: "0 0 12px 4px rgba(48, 62, 88, 1)",
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
    }
    if (sliderInnerRef.current) {
      gsap.to(sliderInnerRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(sliderInnerRef.current, { y: 0 });
        },
      });
    }
    let newRotation: number;
    if (forceDirection) {
      newRotation =
        wheelRotationRef.current +
        (forceDirection === "prev"
          ? 360 / categories.length
          : -360 / categories.length);
    } else {
      const angleOfNew = (360 / categories.length) * newIndex;
      const desiredAngle = -60 - angleOfNew;
      let delta = desiredAngle - wheelRotationRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      newRotation = wheelRotationRef.current + delta;
    }
    setActiveCategoryIndex(newIndex);
    if (animationRef.current) animationRef.current.kill();
    animationRef.current = gsap.to(wheelRotationRef, {
      current: newRotation,
      duration: 1,
      onUpdate: updateWheel,
      onComplete: () => {
        setIsAnimationComplete(true);
        const newLabel = dotsRef.current[newIndex]?.querySelector(".label");
        if (newLabel) {
          gsap.to(newLabel, { opacity: 1, duration: 0.3 });
        }
        setClickedIndex(null);
      },
      ease: "power2.inOut",
    });
    setTimeout(() => {
      setSliderCategoryIndex(newIndex);
      if (swiperInstance) {
        swiperInstance.slideTo(0, 0);
        setActiveSlideIndex(0);
      }
      if (sliderInnerRef.current) {
        gsap.fromTo(
          sliderInnerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.inOut" }
        );
      }
    }, 800);
  };
  const updateWheel = () => {
    if (!circleRef.current) return;
    gsap.set(circleRef.current, { rotation: wheelRotationRef.current });
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;
      const dotAngle = (360 / categories.length) * index;
      const compensation = -(wheelRotationRef.current + dotAngle);
      const dotContainer = dot.querySelector(".dot-container");
      if (dotContainer) gsap.set(dotContainer, { rotation: compensation });
    });
  };
  useEffect(() => {
    updateWheel();
  }, [wheelRotationRef.current]);
  const onSlideChange = (swiper: any) => {
    setIsSliderBeginning(swiper.isBeginning);
    setIsSliderEnd(swiper.isEnd);
    setActiveSlideIndex(swiper.activeIndex);
  };
  const currentCategory = categories[activeCategoryIndex];
  const sliderCategory = categories[sliderCategoryIndex];
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>
            Исторические <br />
            даты
          </Title>
        </Header>
        <TimelineVisual>
          <BigYears>
            <AnimatedYear year={currentCategory.startYear} isLeft />
            <AnimatedYear year={currentCategory.endYear} />
          </BigYears>
          <CircleContainer scale={circleScale} visible={circleVisible}>
            <Circle ref={circleRef}>
              {categories.map((cat, index) => {
                const angle = (360 / categories.length) * index;
                return (
                  <CategoryDot
                    key={index}
                    angle={angle}
                    isActive={index === activeCategoryIndex}
                    isHovered={index === hoveredIndex}
                    isClicked={index === clickedIndex}
                    ref={(el: HTMLDivElement | null) => {
                      dotsRef.current[index] = el;
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleCategoryClick(index)}
                  >
                    <div className="dot-container">
                      <div className="dot">{cat.id}</div>
                      <div className="label">{cat.name}</div>
                    </div>
                  </CategoryDot>
                );
              })}
            </Circle>
          </CircleContainer>
          {!isMobile && (
            <Navigation>
              <Counter>
                {currentSlideNumber}/{totalSlidesNumber}
              </Counter>
              <CategoryNavigation>
                <NavButton
                  direction="prev"
                  onClick={() => handleNavClick("prev")}
                  aria-label="Previous"
                />
                <NavButton
                  direction="next"
                  onClick={() => handleNavClick("next")}
                  aria-label="Next"
                />
              </CategoryNavigation>
            </Navigation>
          )}
          <SliderWrapper ref={sliderWrapperRef}>
            <SliderInner ref={sliderInnerRef}>
              <SliderContent>
                {!isMobile && (
                  <>
                    <SliderNavButton
                      position="left"
                      disabled={isSliderBeginning}
                      onClick={() => swiperInstance?.slidePrev()}
                      aria-label="Previous Slide"
                    >
                      &#10094;
                    </SliderNavButton>
                    <SliderNavButton
                      position="right"
                      disabled={isSliderEnd}
                      onClick={() => swiperInstance?.slideNext()}
                      aria-label="Next Slide"
                    >
                      &#10095;
                    </SliderNavButton>
                  </>
                )}
                <Swiper
                  slidesPerView={isMobile ? 2 : 3}
                  slidesPerGroup={1}
                  spaceBetween={isMobile ? 20 : 80}
                  onSwiper={(swiper) => setSwiperInstance(swiper)}
                  onSlideChange={onSlideChange}
                >
                  {sliderCategory.events.map((event, idx) => {
                    let mobileOpacity: number | undefined = undefined;
                    if (isMobile) {
                      if (idx === activeSlideIndex) mobileOpacity = 1;
                      else if (idx === activeSlideIndex + 1) mobileOpacity = 0.5;
                    }
                    return (
                      <SwiperSlide
                        key={idx}
                        style={
                          isMobile
                            ? { width: "calc((100% - 100px) / 2)", marginRight: "-100px" }
                            : undefined
                        }
                      >
                        <SlideContent mobileOpacity={mobileOpacity}>
                          <h3>{event.year}</h3>
                          <p>{event.description}</p>
                        </SlideContent>
                      </SwiperSlide>
                    );
                  })}
                  {isMobile && (
                    <SwiperSlide
                      key="empty-slide"
                      style={{ width: "calc((100% - 100px) / 2)", marginRight: "-100px" }}
                    />
                  )}
                </Swiper>
              </SliderContent>
            </SliderInner>
          </SliderWrapper>
        </TimelineVisual>
        {isMobile && (
          <>
            <MobileCounter>
              {(activeCategoryIndex + 1).toString().padStart(2, "0")}/
              {categories.length.toString().padStart(2, "0")}
            </MobileCounter>
            <MobileNavButtons>
              <MobileNavButton
                direction="prev"
                onClick={() => handleNavClick("prev")}
                aria-label="Previous Category"
              />
              <MobileNavButton
                direction="next"
                onClick={() => handleNavClick("next")}
                aria-label="Next Category"
              />
            </MobileNavButtons>
            <MobilePagination>
              <BulletNav>
                {categories.map((_, index) => (
                  <Bullet
                    key={index}
                    active={index === activeCategoryIndex}
                    onClick={() => handleCategoryClick(index)}
                    aria-label={`Перейти к категории ${index + 1}`}
                  />
                ))}
              </BulletNav>
            </MobilePagination>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};
