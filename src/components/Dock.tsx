import { dockApps, type DockApps, type WindowConfig } from "#constants"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { Tooltip } from "react-tooltip"
import gsap from "gsap"
import useWindowStore from "#store/window"

const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null)
  const { windows, openWindow, closeWindow } = useWindowStore()

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll(".dock-icon")

    const animateIcon = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect()

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect()
        const center = iconLeft - left + width / 2
        const distance = Math.abs(mouseX - center)

        const intensity = Math.exp(-(distance ** 2.5) / 20000)
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          ease: "power1.out",
          duration: 0.2,
        })
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect()
      animateIcon(e.clientX - left)
    }
    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          ease: "power1.out",
          duration: 0.3,
        })
      })
    }

    dock.addEventListener("mousemove", handleMouseMove)
    dock.addEventListener("mouseleave", resetIcons)
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove)
      dock.removeEventListener("mouseleave", resetIcons)
    }
  }, [])

  const toggleWindow = (app: DockApps) => {
    if (!app.canOpen) return
    console.log(windows, "windows")

    const windowKey = app.id

    const window = windows[windowKey as keyof WindowConfig]

    if (window.isOpen) {
      closeWindow(windowKey)
    } else {
      openWindow(windowKey)
    }

    console.log(windows, "windows")
  }
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map((dockApp) => {
          const isOpen = useWindowStore(
            (state) =>
              state.windows[dockApp.id as keyof WindowConfig]?.isOpen ?? false
          )
          return (
            <div key={dockApp.id} className="relative flex justify-center">
              <button
                type="button"
                className={`dock-icon ${isOpen ? "has-open-window" : ""}`}
                aria-label={dockApp.name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={dockApp.name}
                data-tooltip-delay-show={150}
                disabled={!dockApp.canOpen}
                onClick={() => toggleWindow(dockApp)}
              >
                <img
                  src={`/images/${dockApp.icon}`}
                  alt={dockApp.name}
                  loading="lazy"
                  // className={canOpen ? "" : "opacity-60"}
                />
              </button>
            </div>
          )
        })}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock
