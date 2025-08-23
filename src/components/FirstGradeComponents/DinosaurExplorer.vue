<template>
  <div class="dino-explorer">
    <h2 class="title">🦖 Dinosaur Explorer</h2>
    <p class="subtitle">Click on a dinosaur to learn more!</p>

    <div class="dino-grid">
      <div
        v-for="dino in dinosaurs"
        :key="dino.name"
        class="dino-card"
        @click="showDino(dino)"
      >
        <div class="dino-emoji">{{ dino.emoji }}</div>
        <h3 class="dino-name">{{ dino.name }}</h3>
      </div>
    </div>

    <!-- Dino Info Card -->
    <transition name="pop">
      <div v-if="selectedDino" class="dino-info-card">
        <button class="close-btn" @click="selectedDino = null">❌</button>
        <div class="dino-emoji big">{{ selectedDino.emoji }}</div>
        <h3>{{ selectedDino.name }}</h3>
        <p>
          <strong>Type / Era:</strong>
          {{ selectedDino.type }}
        </p>
        <p>
          <strong>Size:</strong>
          {{ selectedDino.size }}
        </p>
        <p>
          <strong>Food:</strong>
          {{ selectedDino.food }}
        </p>
        <p>
          <strong>Fun Fact:</strong>
          {{ selectedDino.fact }}
        </p>

        <div class="fun-meter">
          <span v-for="n in selectedDino.funLevel" :key="n">⭐</span>
        </div>

        <ul class="extra-info">
          <li v-for="(info, index) in selectedDino.extraInfo" :key="index">
            {{ info.emoji }} {{ info.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'DinosaurExplorer',
    data() {
      return {
        selectedDino: null,

        dinosaurs: [
          {
            name: 'T-Rex',
            emoji: '🦖',
            type: 'Carnivore, Late Cretaceous',
            size: '12 meters tall 🏔️',
            food: 'Meat 🍖',
            fact: 'T. Rex had the strongest bite of any land animal!',
            funLevel: 5,
            extraInfo: [
              { emoji: '🦷', text: 'Had around 60 sharp teeth!' },
              { emoji: '🏃', text: 'Could run up to 20 km/h' },
              { emoji: '👀', text: 'Had keen eyesight for hunting' },
            ],
          },
          {
            name: 'Triceratops',
            emoji: '🦕',
            type: 'Herbivore, Late Cretaceous',
            size: '9 meters long 🌿',
            food: 'Plants 🥦',
            fact: 'Triceratops had three horns and a large frill!',
            funLevel: 4,
            extraInfo: [
              { emoji: '🛡️', text: 'Used horns for defense' },
              { emoji: '🌾', text: 'Ate ferns and shrubs' },
            ],
          },
          {
            name: 'Velociraptor',
            emoji: '🐉',
            type: 'Carnivore, Late Cretaceous',
            size: '2 meters long 🏃',
            food: 'Small animals 🐇',
            fact: 'Velociraptor was fast and smart!',
            funLevel: 5,
            extraInfo: [
              { emoji: '🦵', text: 'Had strong legs for running' },
              { emoji: '🧠', text: 'Very clever hunter' },
            ],
          },
          {
            name: 'Stegosaurus',
            emoji: '🦕',
            type: 'Herbivore, Jurassic',
            size: '9 meters long 🌿',
            food: 'Plants 🍃',
            fact: 'Stegosaurus had big plates on its back.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🛡️', text: 'Used tail spikes for defense' },
              { emoji: '🌿', text: 'Loved eating low bushes' },
            ],
          },
          {
            name: 'Brachiosaurus',
            emoji: '🦕',
            type: 'Herbivore, Jurassic',
            size: '25 meters tall 🏔️',
            food: 'Leaves 🌳',
            fact: 'Brachiosaurus had a long neck to reach the tallest trees.',
            funLevel: 5,
            extraInfo: [
              { emoji: '🌳', text: 'Ate leaves from high trees' },
              { emoji: '🦵', text: 'Had very strong legs to carry its weight' },
            ],
          },
          {
            name: 'Pteranodon',
            emoji: '🦅',
            type: 'Carnivore, Late Cretaceous',
            size: '6 meters wingspan 🕊️',
            food: 'Fish 🐟',
            fact: 'Pteranodon was a flying reptile, not a dinosaur!',
            funLevel: 4,
            extraInfo: [
              { emoji: '🕊️', text: 'Could glide in the sky' },
              { emoji: '🐟', text: 'Caught fish in rivers and oceans' },
            ],
          },
          {
            name: 'Ankylosaurus',
            emoji: '🦕',
            type: 'Herbivore, Late Cretaceous',
            size: '8 meters long 🌿',
            food: 'Plants 🌱',
            fact: 'Ankylosaurus had a huge club tail for protection!',
            funLevel: 4,
            extraInfo: [
              { emoji: '🛡️', text: 'Heavy armor on back' },
              { emoji: '🔨', text: 'Used tail club to defend itself' },
            ],
          },
          {
            name: 'Allosaurus',
            emoji: '🦖',
            type: 'Carnivore, Jurassic',
            size: '12 meters long 🏔️',
            food: 'Meat 🍖',
            fact: 'Allosaurus was a fierce predator of the Jurassic era.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🦷', text: 'Sharp teeth for hunting' },
              { emoji: '🏃', text: 'Fast runner' },
            ],
          },
          {
            name: 'Spinosaurus',
            emoji: '🦖',
            type: 'Carnivore, Cretaceous',
            size: '15 meters long 🏔️',
            food: 'Fish and meat 🐟🍖',
            fact: 'Spinosaurus had a sail on its back.',
            funLevel: 5,
            extraInfo: [
              { emoji: '🌊', text: 'Could swim' },
              { emoji: '🦷', text: 'Long snout full of teeth' },
            ],
          },
          {
            name: 'Carnotaurus',
            emoji: '🦖',
            type: 'Carnivore, Cretaceous',
            size: '8 meters long 🏔️',
            food: 'Meat 🍖',
            fact: 'Carnotaurus had tiny arms and horns on its head!',
            funLevel: 4,
            extraInfo: [
              { emoji: '🦵', text: 'Strong legs for running' },
              { emoji: '👀', text: 'Good eyesight for hunting' },
            ],
          },
          {
            name: 'Giganotosaurus',
            emoji: '🦖',
            type: 'Carnivore, Cretaceous',
            size: '13 meters long 🏔️',
            food: 'Meat 🍖',
            fact: 'One of the largest land predators ever!',
            funLevel: 5,
            extraInfo: [
              { emoji: '🦷', text: 'Huge teeth for hunting' },
              { emoji: '🏃', text: 'Fast and deadly' },
            ],
          },
          {
            name: 'Diplodocus',
            emoji: '🦕',
            type: 'Herbivore, Jurassic',
            size: '27 meters long 🌿',
            food: 'Leaves 🌳',
            fact: 'Had a very long neck to eat from tall trees.',
            funLevel: 5,
            extraInfo: [
              { emoji: '🌿', text: 'Loved plants' },
              { emoji: '🦵', text: 'Strong legs to support its long body' },
            ],
          },
          {
            name: 'Iguanodon',
            emoji: '🦕',
            type: 'Herbivore, Cretaceous',
            size: '10 meters long 🌿',
            food: 'Plants 🌱',
            fact: 'Had thumb spikes for defense.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🛡️', text: 'Could defend itself with spikes' },
              { emoji: '🌾', text: 'Ate leaves and fruits' },
            ],
          },
          {
            name: 'Parasaurolophus',
            emoji: '🦕',
            type: 'Herbivore, Cretaceous',
            size: '10 meters long 🌿',
            food: 'Plants 🌿',
            fact: 'Had a long, curvy crest on its head.',
            funLevel: 5,
            extraInfo: [
              { emoji: '🎺', text: 'Used crest to make sounds' },
              { emoji: '🌿', text: 'Herbivore diet' },
            ],
          },
          {
            name: 'Corythosaurus',
            emoji: '🦕',
            type: 'Herbivore, Cretaceous',
            size: '9 meters long 🌿',
            food: 'Plants 🍃',
            fact: 'Had a helmet-shaped crest on its head.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🎶', text: 'Could make sounds through its crest' },
              { emoji: '🌿', text: 'Herbivore' },
            ],
          },
          {
            name: 'Compsognathus',
            emoji: '🦖',
            type: 'Carnivore, Jurassic',
            size: '1 meter long 🏃',
            food: 'Small animals 🐇',
            fact: 'One of the smallest dinosaurs.',
            funLevel: 3,
            extraInfo: [
              { emoji: '🏃', text: 'Very fast' },
              { emoji: '🦴', text: 'Hunted insects and small prey' },
            ],
          },
          {
            name: 'Microraptor',
            emoji: '🦖',
            type: 'Carnivore, Cretaceous',
            size: '0.8 meters 🏃',
            food: 'Small animals 🐦',
            fact: 'A tiny dinosaur with feathers.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🪶', text: 'Could glide using feathered wings' },
              { emoji: '🐦', text: 'Hunted small birds' },
            ],
          },
          {
            name: 'Oviraptor',
            emoji: '🦖',
            type: 'Omnivore, Cretaceous',
            size: '2 meters long 🏃',
            food: 'Eggs 🥚 & small animals 🐇',
            fact: 'Originally thought to steal eggs, but likely protective.',
            funLevel: 4,
            extraInfo: [
              { emoji: '🥚', text: 'Loved eggs' },
              { emoji: '👀', text: 'Had sharp eyesight' },
            ],
          },
          {
            name: 'Quetzalcoatlus',
            emoji: '🦅',
            type: 'Flying reptile, Late Cretaceous',
            size: '10 meters wingspan 🕊️',
            food: 'Fish 🐟',
            fact: 'One of the largest flying animals ever!',
            funLevel: 5,
            extraInfo: [
              { emoji: '🕊️', text: 'Could glide very far' },
              { emoji: '🐟', text: 'Caught fish in rivers and lakes' },
            ],
          },
        ],
      }
    },
    methods: {
      showDino(dino) {
        this.selectedDino = dino
      },
    },
  }
</script>

<style scoped>
  .dino-explorer {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    padding: 20px;
    background: #fdf6ec;
  }

  .title {
    font-size: 2rem;
    color: #ff6f61;
    margin-bottom: 5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 20px;
  }

  .dino-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin: 20px 0;
  }

  .dino-card {
    background: #fff8e7;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .dino-card:hover {
    transform: scale(1.05) rotate(-2deg);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  .dino-emoji {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .dino-name {
    font-size: 1.1rem;
    color: #333;
  }

  .dino-info-card {
    margin-top: 25px;
    background: #fffbea;
    padding: 20px;
    border-radius: 25px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    text-align: left;
    animation: pop 0.4s ease;
  }

  .dino-info-card .big {
    font-size: 4rem;
    margin-bottom: 10px;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
  }

  .fun-meter {
    margin-top: 10px;
    font-size: 22px;
    color: #ffd700;
  }

  .extra-info {
    margin-top: 15px;
    list-style: none;
    padding-left: 0;
  }

  .extra-info li {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  /* Pop animation */
  @keyframes pop {
    0% {
      transform: scale(0.6);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .pop-enter-active,
  .pop-leave-active {
    transition: all 0.3s ease;
  }

  .pop-enter-from,
  .pop-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
</style>
