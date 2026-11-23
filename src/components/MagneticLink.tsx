import type { ComponentProps, PointerEvent } from 'react'

function followPointer(event: PointerEvent<HTMLSpanElement>) {
  if (event.pointerType !== 'mouse') return
  const { currentTarget, clientX, clientY } = event
  const { left, top, width, height } = currentTarget.getBoundingClientRect()
  const x = Math.max(-10, Math.min(10, (clientX - left - width / 2) * .12))
  const y = Math.max(-7, Math.min(7, (clientY - top - height / 2) * .24))
  currentTarget.style.setProperty('--magnetic-offset', `${x}px ${y}px`)
}

export default function MagneticLink(props: ComponentProps<'a'>) {
  return (
    <span className="portfolio-magnetic"
      onPointerMove={followPointer}
      onPointerLeave={(event) => event.currentTarget.style.removeProperty('--magnetic-offset')}>
      <a {...props} />
    </span>
  )
}
