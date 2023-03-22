<template>
  <div class="container mx-auto py-4 flex flex-wrap gap-2 justify-center">
    <StreamCard v-for="(stream, index) in store.getStreams" :key="index" :stream="stream" />
  </div>
</template>

<script setup>
import StreamCard from '../components/StreamCard.vue';
import { reactive } from 'vue'
import { useStreamStore } from '../stores/index';
import { mapState } from 'pinia'


const store = useStreamStore()

store.fetchStreams();
// const streams = store.streams;

/*
const streams = reactive([
  {
    id: 0,
    title: "10 Hour Study with Me: Productivity Music for Concentration & Focus!",
    description: "Need some study motivation? This 10-hour video will help you stay focused and productive while you study. Listen to our carefully curated playlist of classical music, ambient sounds, and instrumental beats.",
    live: false,
    watching: 2000,
    tags: ["study music", "focus", "productivity"]
  },
  {
    id: 1,
    title: "EPIC BATTLE of the Lofi Hip Hop Playlists! Who Will Win? You Decide!",
    description: "Two of the most popular Lofi Hip Hop playlists go head to head in this epic battle! Will it be Chillhop Music or ChilledCow? You decide by voting in the comments!",
    live: false,
    watching: 5000,
    tags: ["lofi hip hop", "chill beats", "study music"]
  },
  {
    id: 2,
    title: "🎧 Lo-Fi Cafe Sounds: The Ultimate Coffee Shop Ambience Experience 🎵",
    description: "Missing the vibe of working at a coffee shop? This video will transport you to a cozy cafe with the sound of clinking cups, soft chatter, and jazzy tunes. Grab your favorite beverage and get to work!",
    live: true,
    watching: 1000,
    tags: ["coffee shop ambience", "lofi hip hop", "jazz music"]
  },
  {
    id: 3,
    title: "The Most Relaxing Music You'll Ever Hear! 😴 Sleep Music, Meditation Music, Spa Music",
    description: "Unwind and de-stress with our selection of the most relaxing music you'll ever hear. Whether you're trying to fall asleep, meditate, or just chill out, this playlist has got you covered.",
    live: false,
    watching: 3000,
    tags: ["relaxing music", "sleep music", "meditation music"]
  },
  {
    id: 4,
    title: "24/7 Lofi Hip Hop Radio 🎧 Chillhop Music, Study Music, Relaxing Beats",
    description: "Join our Lofi Hip Hop community with this 24/7 radio station. With a mix of the best Chillhop Music, Study Music, and Relaxing Beats, you'll never have to search for the perfect playlist again!",
    live: true,
    watching: 8000,
    tags: ["lofi hip hop", "chill beats", "study music"]
  },
  {
    id: 5,
    title: "10 Hours of Rain and Thunderstorm Sounds for Sleeping, Relaxing, Studying",
    description: "Get cozy with this 10-hour video of soothing rain and thunderstorm sounds. Perfect for sleeping, relaxing, or studying, these sounds will help you drift off to dreamland in no time.",
    live: false,
    watching: 1500,
    tags: ["rain sounds", "thunderstorm sounds", "relaxing sounds"]
  },
  {
    id: 6,
    title: "The Best Classical Music for Studying and Concentration!",
    description: "Studies show that listening to classical music can improve focus and concentration. Tune in to this video for the best classical music to help you study and retain information better.",
    live: false,
    watching: 2500,
    tags: ["classical music", "study music", "focus"]
  },
  {
    id: 7,
    title: "Chill Beats for Studying",
    description: "Relax and focus with this chilled out beats playlist.",
    live: true,
    watching: 1234,
    tags: ["lofi", "study", "chill", "beats"]
  },
  {
    id: 8,
    title: "Jazz Radio",
    description: "Sit back and enjoy the smooth sounds of jazz.",
    live: true,
    watching: 5678,
    tags: ["jazz", "music", "live"]
  },
  {
    id: 9,
    title: "Relaxing Piano Music",
    description: "Unwind with these beautiful piano melodies.",
    live: false,
    watching: 0,
    tags: ["piano", "relaxing", "music"]
  },
  {
    id: 10,
    title: "Hip Hop Mixtape",
    description: "Get your head nodding with these dope hip hop beats.",
    live: false,
    watching: 0,
    tags: ["hip hop", "music", "mixtape"]
  },
  {
    id: 11,
    title: "Lofi Study Beats",
    description: "The perfect soundtrack for hitting the books.",
    live: true,
    watching: 2468,
    tags: ["lofi", "study", "beats"]
  },
  {
    id: 12,
    title: "Ambient Music for Sleep",
    description: "Drift off to dreamland with these soothing sounds.",
    live: false,
    watching: 0,
    tags: ["ambient", "sleep", "music"]
  },
  {
    id: 13,
    title: "Classical Radio",
    description: "Experience the beauty of classical music.",
    live: true,
    watching: 1357,
    tags: ["classical", "music", "live"]
  },
  {
    id: 14,
    title: "EDM Mix",
    description: "Get ready to dance with this high-energy electronic dance music.",
    live: false,
    watching: 0,
    tags: ["EDM", "music", "mix"]
  },
  {
    id: 15,
    title: "Guitar Solos",
    description: "Experience the artistry of guitar masters.",
    live: false,
    watching: 0,
    tags: ["guitar", "music", "solos"]
  },
  {
    id: 16,
    title: "Reggae Music",
    description: "Feel the rhythm of the islands with this chill reggae playlist.",
    live: false,
    watching: 0,
    tags: ["reggae", "music", "chill"]
  }
])
*/
</script>