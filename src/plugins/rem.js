(function flexible (win) {
  const doc = win.document
  const docEl = doc.documentElement
  let tid
  const refreshRem = function refreshRem () {
    let width = docEl.getBoundingClientRect().width
    if (width > 750) {
      width = 750
    } else if (width < 320) {
      width = 320
    }
    const rem = width / 7.5
    docEl.style.fontSize = rem + 'px'
  }

  win.addEventListener('resize', () => {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)

  win.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '14px'
  } else {
    doc.addEventListener('DOMContentLoaded', () => {
      doc.body.style.fontSize = '14px'
    }, false)
  }

  refreshRem()
}(window))
