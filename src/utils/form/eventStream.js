function sseevent(message) {
  let type = 'message',
    start = 0
  if (message.startsWith('event: ')) {
    start = message.indexOf('\n')
    type = message.slice(7, start)
  }
  start = message.indexOf(': ', start) + 2
  let data = message.slice(start, message.length)

  return new MessageEvent(type, { data: data })
}

export function XhrSource(url, opts) {
  const eventTarget = new EventTarget()
  const xhr = new XMLHttpRequest()

  xhr.open(opts.method || 'GET', url, true)
  for (let k in opts.headers) {
    xhr.setRequestHeader(k, opts.headers[k])
  }

  const ongoing = false,
    start = 0
  xhr.onprogress = function () {
    if (!ongoing) {
      ongoing = true
      eventTarget.dispatchEvent(
        new Event('open', {
          status: xhr.status,
          headers: xhr.getAllResponseHeaders(),
          url: xhr.responseUrl
        })
      )
    }

    let i, chunk
    while ((i = xhr.responseText.indexOf('\n\n', start)) >= 0) {
      chunk = xhr.responseText.slice(start, i)
      start = i + 2
      if (chunk.length) {
        eventTarget.dispatchEvent(sseevent(chunk))
      }
    }
  }

  xhr.onloadend = _ => {
    eventTarget.dispatchEvent(new CloseEvent('close'))
  }

  xhr.timeout = opts.timeout
  xhr.ontimeout = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request timed out' }))
  }
  xhr.onerror = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: xhr.responseText || 'Network request failed' }))
  }
  xhr.onabort = _ => {
    eventTarget.dispatchEvent(new CloseEvent('error', { reason: 'Network request aborted' }))
  }

  eventTarget.close = _ => {
    xhr.abort()
  }

  xhr.send(opts.body)
  return eventTarget
}
