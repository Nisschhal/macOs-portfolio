import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
}

const setupTextHover = (
  container: HTMLDivElement,
  type: keyof typeof FONT_WEIGHTS
) => {
  if (!container) return () => {}
  const letters = container.querySelectorAll("span")
  const { min, max, default: base } = FONT_WEIGHTS[type]

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration = 0.25
  ) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    // get the mouse position
    const { clientX, clientY } = e
    console.log(clientX, clientY, "clientX, clientY")
    // get the container left postion
    const { left, top, width, height } = container.getBoundingClientRect()
    console.log(left, top, width, height, "left, top, width, height")
    // calculate the mouse position relative to the container
    const mouseX = clientX - left
    console.log(mouseX, "mouseX")

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect()
      const distance = Math.abs(mouseX - (l - left + w / 2))
      const intensity = Math.exp(-(distance ** 2) / 20000)
      animateLetter(letter, min + (max - min) * intensity)
    })
  }

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3)
    })
  }

  container.addEventListener("mousemove", handleMouseMove)

  container.addEventListener("mouseleave", handleMouseLeave)
  return () => {
    container.removeEventListener("mousemove", handleMouseMove)

    container.removeEventListener("mouseleave", handleMouseLeave)
  }
}

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      //   font-variation-settings: 'wght' 400 is used to set or control the font weight
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
      }}
    >
      {/* \u00A0 preserves the space as html can break the white space into new line */}
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

const Welcome = () => {
  const subHeaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subTitleRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!titleRef.current || !subTitleRef.current) return
    const titleCleanup = setupTextHover(titleRef.current, "title")
    const subTitleCleanup = setupTextHover(subTitleRef.current, "subtitle")
    return () => {
      titleCleanup && titleCleanup()
      subTitleCleanup && subTitleCleanup()
    }
  }, [titleRef, subTitleRef])

  return (
    <section id="welcome">
      <div className="space-y-7 text-center">
        <p ref={subHeaderRef} className="shiny-text">
          {renderText("Hey there! 👋🏻", "text-3xl font-georama", 100)}
        </p>
        <p ref={subTitleRef}>
          {renderText(
            "I'm Nischal! Welcome to my",
            "shiny-text text-3xl font-georama",
            100
          )}
        </p>
        <h1 ref={titleRef} className="">
          {renderText(" Portfolio", "shiny-text text-9xl font-georama italic")}
        </h1>
      </div>
      <div className="small-screen">
        This Portfolio is designed for desktop/tablet screens only.
      </div>
    </section>
  )
}

export default Welcome
