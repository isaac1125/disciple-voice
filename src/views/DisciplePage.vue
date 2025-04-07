<template>
  <div class="container-fluid text-center py-5 bg-custom">
    <div v-if="disciple">
      <h1 class="click-hint">點擊圖片播放心聲</h1>
      <img :src="disciple.image" class="img-fluid rounded mb-3" :class="{ 'speaking': isPlaying }" alt="門徒圖片"
        @click="togglePlay" @error="imageError" />
      <div class="audio-player">
        <input type="range" v-model="currentTime" :max="duration" class="progress-bar" @input="seekAudio" />
        <span class="time-display ms-2 text-white">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
      </div>
      <audio ref="audio" :src="disciple.audio" @error="audioError" @timeupdate="updateProgress"
        @loadedmetadata="setDuration" @ended="onAudioEnd"></audio>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
    <div v-else class="py-5">
      <h3 class="text-white">找不到此門徒</h3>
    </div>
  </div>
</template>

<script>
import { disciples } from '../data/disciples';

export default {
  props: ['id'],
  data() {
    return {
      disciple: null,
      errorMessage: '',
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };
  },
  mounted() {
    console.log('All disciples:', disciples);
    console.log('Received ID:', this.id);
    this.disciple = disciples.find((d) => d.slug.toLowerCase() === this.id.toLowerCase());
    console.log('Found disciple:', this.disciple);
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => {
          console.error('Audio play error:', err);
          this.errorMessage = '無法播放音檔';
        });
      }
      this.isPlaying = !this.isPlaying;
    },
    updateProgress() {
      this.currentTime = this.$refs.audio.currentTime;
    },
    setDuration() {
      this.duration = this.$refs.audio.duration;
    },
    seekAudio() {
      this.$refs.audio.currentTime = this.currentTime;
    },
    onAudioEnd() {
      this.isPlaying = false;
      this.currentTime = 0;
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    },
    imageError() {
      console.error('Image load failed:', this.disciple.image);
      this.errorMessage = '無法載入圖片';
    },
    audioError() {
      console.error('Audio load failed:', this.disciple.audio);
      this.errorMessage = '無法載入音檔';
    },
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #20150b;
  /* 自訂背景色 */
  min-height: 100vh;
  /* 填滿螢幕高度 */
}

.click-hint {
  font-family: 'Noto Serif TC', serif;
  /* 好看的繁體中文字體 */
  color: #ffffff;
  font-size: 1.3rem;
  /* 稍大一點，更顯眼 */
  font-weight: 700;
  /* 加粗，增加質感 */
  margin-top: 10px;
}

.img-fluid {
  width: 100%;
  /* 圖片填滿寬度 */
  height: auto;
  max-width: none;
  /* 移除 Bootstrap 預設限制 */
  cursor: pointer;
  /* 提示可點擊 */
}

/* 微震動動畫 */
.speaking {
  animation: shake 2s infinite;
  /* 快速微震動 */
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(1px, 1px);
  }

  50% {
    transform: translate(-1px, -1px);
  }

  75% {
    transform: translate(1px, -1px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.audio-player {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.progress-bar {
  width: 50%;
  /* 進度條寬度 */
  height: 5px;
  accent-color: #007bff;
  /* 與 Bootstrap 一致 */
}

.time-display {
  font-size: 0.9rem;
}
</style>