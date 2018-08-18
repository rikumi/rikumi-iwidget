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
    this.emit(type, event)
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