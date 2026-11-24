/* The palette listens for this event so any component can open it without
   importing the component (and breaking Fast Refresh's single-export rule). */
export function openPalette() {
  window.dispatchEvent(new CustomEvent('f31:palette'))
}
