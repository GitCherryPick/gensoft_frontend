"use client"

export default function Layout({
  leftPanel,
  rightPanel,
  defaultLeftSize = 30,
  defaultRightSize = 70,
  minLeftSize = 25,
  minRightSize = 40,
}) {
  const leftWidth = `${defaultLeftSize}%`
  const rightWidth = `${defaultRightSize}%`

  return (
    <div className="h-full w-full flex">
      <div className="h-full overflow-auto" style={{ width: leftWidth }}>
        <div className="h-full p-4 overflow-auto">{leftPanel}</div>
      </div>

      <div className="h-full border-l border-cta-1/30 dark:border-cta-1/20 mx-2"></div>

      <div className="h-full overflow-auto" style={{ width: rightWidth }}>
        <div className="h-full p-4 overflow-auto flex items-center justify-center">{rightPanel}</div>
      </div>
    </div>
  )
}
