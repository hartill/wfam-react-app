export function debounce(func: any, wait: number, context: any) {
  let timeout: NodeJS.Timeout | null

  return function executedFunction() {
    let args = arguments

    let later = function () {
      timeout = null
      func.apply(context, args)
    }

    let callNow = !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export function scale(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}
