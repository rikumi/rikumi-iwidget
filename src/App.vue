<template lang='pug'>
  #app
    transition-group(name='fade')
      img.cover(:src='cover' :key='cover' :class='{ hidden: !music.isplaying }')
    .container
      .date-time
        .time
          span.hour {{ hour }}
          span.min :{{ min }}
        .date {{ date }}  {{ weekday }}
      transition-group(name='slide')
        .lyric(v-if='lyricLine' :key='lyricLine') {{ lyricLine }}
</template>

<script>
  import xen from './xen-event'
  import date from './date-event'
  import moment from 'moment'

  export default {
    name: 'app',
    data() {
      return {
        music: {},
        date: '',
        hour: '',
        min: '',
        weekday: '',
        cover: '',
        lastMusic: {}
      }
    },
    created() {
      xen.on('music', (music) => {
        this.music = music
        if (music.artist != null
          && (music.title !== this.lastMusic.title || music.artist !== this.lastMusic.artist)) {
          setTimeout(() => {
            this.cover = 'file:///User/Documents/Artwork.jpg?t=' + Date.now()
          }, 500)
        }
        this.lastMusic = music
      })
      date.on('*:*', () => this.updateTime())
      this.updateTime()
    },
    methods: {
      updateTime() {
        this.hour = moment().format('H')
        this.min = moment().format('mm')
        this.date = moment().format('YYYY/M/D')
        this.weekday = moment().format('ddd')
      }
    },
    computed: {
      lyricLine() {
        return (
          this.music.isplaying && (
            this.music.artist ?
            [this.music.artist, this.music.title].filter(k => k).join(' - ') :
            this.music.album
          ) || ''
        ).replace(/\(.*?\)|（.*?）|【.*?】/g, '')
      }
    }
  }
</script>
<style lang='stylus'>
  @font-face
    font-family DosisLight
    src url('./Dosis-ExtraLight.ttf')

  @font-face
    font-family DosisBold
    src url('./Dosis-ExtraBold.ttf')

  .slide-enter-active, .slide-leave-active
    transition .5s

  .slide-enter, .slide-leave-to
    transform translateX(-20px) !important
    opacity 0 !important

  .slide-leave-active
    position absolute

  .fade-enter-active, .fade-leave-active
    transition .5s

  .fade-enter, .fade-leave-to
    opacity 0 !important

  .fade-leave-active
    position absolute

  :root
    font-size 14px
    line-height 1.5em

  *
    font-family -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans CJK SC', 'Source Han Sans CN', 'Microsoft YaHei UI', sans-serif
    -webkit-tap-highlight-color transparent
    -ms-overflow-style none
    text-size-adjust 100%
    color #ffffff

  body
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    margin 0
    display flex
    flex-direction column
    justify-content flex-end
    background rgba(0, 0, 0, .5)

  @keyframes rotate
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)

  .cover
    position absolute
    left 50%
    top 45px
    width 320px
    height 320px
    margin-left -160px
    border-radius 50%
    z-index -1
    opacity 1
    transition .5s
    animation-name rotate
    animation-duration 30s
    animation-timing-function linear
    animation-iteration-count infinite

    &.hidden
      opacity 0
      transform translateY(20px)

  .container
    display flex
    flex-direction column
    align-items flex-start
    background rgba(0, 0, 0, .5)
    -webkit-backdrop-filter blur(20px)
    padding 0 30px 290px

    .date-time
      display flex
      flex-direction row
      align-items baseline

      .time
        font-size 48px
        text-shadow 0 0 10px rgba(0, 0, 0, .4)

        .hour
          font-family DosisLight
        
        .min
          font-family DosisLight

      .date
        display flex
        flex-direction column
        font-family DosisLight
        margin-left 10px
        opacity .5
        font-size 16px

    .lyric
      margin-top 10px
      padding-top 10px
      border-top 1px solid #fff
      transition .5s

      &.slide-enter-active, &.slide-leave-active
        border-top-color transparent
</style>
