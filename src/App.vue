<template lang='pug'>
  #app
    #log
    transition-group(name='fade')
      .cover-wrapper(:key='music.cover' :class='{ hidden: !music.isplaying }')
        img.cover(:src='music.cover')
    .container
      transition-group.date-time(name='slide')
        .time(:key='time' ref='time') {{ time }}
        .date(:key='date') {{ date }}
        .spacing(key='spacing')
        a(key='playpause' href='xeninfo:playpause' v-if='music.title != null')
          img.play-pause(v-if='music.isplaying' src='./pause.svg' @click='music.isplaying = false')
          img.play-pause(v-else src='./play.svg' @click='music.isplaying = true')
        a(key='next' href='xeninfo:nexttrack' v-if='music.title != null')
          img.next(src='./next.svg')
      transition-group.lyric-container(name='slide' :style='{ height: lyricHeight + "px" }')
        .lyric(v-if='lyricLine' :key='lyricLine' ref='lyric' :style='{ minWidth: timeWidth + "px" }') {{ lyricLine }}
</template>

<script>
  import xen from './xen-event'
  import date from './date-event'
  import moment from 'moment'

  moment.locale(window.locale)

  export default {
    name: 'app',
    data() {
      return {
        music: {},
        date: '',
        time: '',
        lyricHeight: 0,
        timeWidth: 0
      }
    },
    created() {
      xen.on('music', (music) => {
        this.music = music
      })
      date.on('*:*', () => this.updateTime())
      this.updateTime()
    },
    methods: {
      updateTime() {
        this.time = moment().format(window.timeFormat)
        this.date = moment().format(window.dateFormat)
        setTimeout(() => {
          this.timeWidth = this.$refs.time ? this.$refs.time.clientWidth : 0
        }, 0)
      }
    },
    computed: {
      lyricLine() {
        return (
          this.music.isplaying && (
            window.albumAsLyrics && !this.music.artist ? this.music.album :
            [this.music.artist, this.music.title].filter(k => k).join(' - ')
          ) || ''
        ).replace(/\(.*?\)|（.*?）|【.*?】/g, '').replace(/\s+/g, ' ').trim()
      }
    },
    watch: {
      lyricLine() {
        setTimeout(() => {
          this.lyricHeight = this.$refs.lyric ? this.$refs.lyric.clientHeight + 10 : 0
        }, 0)
      }
    }
  }
</script>
<style lang='stylus'>
  @font-face
    font-family DosisLight
    src url('./Dosis-ExtraLight.ttf')

  .slide-enter-active, .slide-leave-active
    transition .5s

  .slide-enter, .slide-leave-to
    opacity 0 !important

  .slide-enter
    transform translateX(30px)

  .slide-leave-to
    transform translateX(-30px)

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

  #log
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    color #fff
    overflow hidden
    word-wrap break-word
    word-break break-all

  @keyframes rotate
    0%
      transform rotate(0deg)
    100%
      transform rotate(360deg)

  .cover-wrapper
    position absolute
    left 50%
    top 45px
    width 320px
    height 320px
    margin-left -160px
    border-radius 50%
    overflow hidden
    z-index -1
    box-shadow 0 0 20px rgba(0, 0, 0, .3)
    transition .5s

    .cover
      width 322px
      height 322px
      margin -1px
      opacity 1
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
    box-shadow 0 0 20px rgba(0, 0, 0, .3)

    .date-time
      display flex
      flex-direction row
      width 100%
      align-items baseline

      .time
        font-size 48px
        text-shadow 0 0 10px rgba(0, 0, 0, .4)
        font-family DosisLight

      .date
        display flex
        flex-direction column
        font-family DosisLight
        margin-left 10px
        opacity .7
        font-size 16px

      .spacing
        flex-grow 1

      .play-pause
        width 22px
        height 22px
        object-fit contain
        margin-left 15px
        margin-bottom -3px

      .next
        width 20px
        height 20px
        object-fit contain
        margin-left 15px
        margin-bottom -2px

    .lyric-container
      display block
      width 100%
      transition .5s
      position relative

      .lyric
        display inline-block
        margin-top 10px
        padding-top 10px
        border-top 1px solid #fff
        transition .5s
</style>
