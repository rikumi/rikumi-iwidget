import EventEmitter from 'events'

const EVENT_KEYS = {
  statusbar: [
    'signalBars',
    'signalName',
    'wifiStrength',
    'wifiBars',
    'wifiName',
    'bluetooth'
  ],
  battery: [
    'batteryPercent',
    'batteryCharging',
    'ramFree',
    'ramUsed',
    'ramAvailable',
    'ramPhysical'
  ],
  alarm: [
    'alarmString',
    'alarmDay',
    'alarmHour',
    'alarmMinute'
  ],
  system: [
    'deviceName',
    'deviceType',
    'systemVersion',
    'twentyfourhour'
  ],
  music: [
    'artist',
    'album',
    'title',
    'isplaying'
  ]
}

export default new class extends EventEmitter {
  constructor() {
    super()
    window.mainUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(type) {
    let keys = EVENT_KEYS[type]
    let event
    if (keys) {
      event = keys.map(k => ({ [k]: this.cleanup(window[k]) })).reduce((a, b) => Object.assign(a, b), {})
    } else {
      event = window[type]
    }
    let emitter = this
    if (type === 'music') {
      // Translate an album cover image to base64 data URI
      // This is the perfect solution when the music info changes multiple times during one single piece of music
      // In these cases the same cover image file will produce same base64 data, thus preventing Vue.js to reload the cover image.
      let img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = function () {
        let canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        let data = canvas.toDataURL('image/png')
        event.cover = data
        emitter.emit(type, event)
      }
      img.src = 'file:///User/Documents/Artwork.jpg?t=' + Date.now()
    } else {
      emitter.emit(type, event)
    }
  }

  cleanup(data) {
    if (typeof data === 'string' && data === '(null)') {
      return null
    }
    return data
  }

  playPause() {
    window.location = 'xeninfo:playpause'
  }

  nextTrack() {
    window.location = 'xeninfo:nexttrack'
  }

  prevTrack() {
    window.location = 'xeninfo:prevtrack'
  }

  openApp(bundleId) {
    window.location = 'xeninfo:openapp:' + bundleId
  }

  openUrl(url) {
    window.location = 'xeninfo:openurl:' + url
  }
}