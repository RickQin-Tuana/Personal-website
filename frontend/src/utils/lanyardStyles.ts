export const lanyardStyles = `
.lanyard-slot {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  pointer-events: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.lanyard-drop {
  width: 100%;
  height: 100%;
  transform: translateY(-100vh);
  transition: transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.lanyard-drop.dropped {
  transform: translateY(0);
}

.lanyard-inner {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.lanyard-wrapper {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1);
  transform-origin: center;
  pointer-events: auto;
}

@media (max-width: 1024px) {
  .lanyard-slot {
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .lanyard-drop {
    transform: translateY(-100vh);
  }

  .lanyard-drop.dropped {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .lanyard-slot {
    left: 0;
    width: 100%;
    height: 100vh;
  }

  .lanyard-drop {
    transform: translateY(-100vh);
  }

  .lanyard-drop.dropped {
    transform: translateY(0);
  }
}
`

let styleElement: HTMLStyleElement | null = null

export function injectLanyardStyles(): void {
  if (styleElement) return

  styleElement = document.createElement('style')
  styleElement.setAttribute('data-lanyard-styles', 'true')
  styleElement.textContent = lanyardStyles
  document.head.appendChild(styleElement)
}

export function removeLanyardStyles(): void {
  if (styleElement) {
    styleElement.remove()
    styleElement = null
  }
}

export function hasLanyardStyles(): boolean {
  return styleElement !== null
}
