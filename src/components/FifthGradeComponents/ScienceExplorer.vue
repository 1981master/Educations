<template>
  <div class="science-explorer">
    <h2>🔬 5th Grade Science Explorer</h2>
    <p>Click on a topic to learn more!</p>

    <div class="science-grid">
      <div
        v-for="topic in topics"
        :key="topic.name"
        class="science-card"
        @click="selectedTopic = topic"
      >
        <div class="topic-emoji">{{ topic.emoji }}</div>
        <h3>{{ topic.name }}</h3>
      </div>
    </div>

    <!-- Topic Detail -->
    <transition name="pop">
      <div v-if="selectedTopic" class="science-detail-card">
        <button class="close-btn" @click="selectedTopic = null">❌</button>
        <div class="topic-emoji big">{{ selectedTopic.emoji }}</div>
        <h2>{{ selectedTopic.name }}</h2>

        <p>
          <strong>Fun Fact:</strong>
          {{ selectedTopic.fact }}
        </p>

        <!-- Long detail -->
        <p class="topic-detail">
          {{ selectedTopic.detail }}
        </p>

        <ul class="extra-info">
          <li v-for="(info, index) in selectedTopic.extraInfo" :key="index">
            {{ info.emoji }} {{ info.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'ScienceExplorer',
    data() {
      return {
        selectedTopic: null,
        topics: [
          {
            name: 'Gravity',
            emoji: '🌍',
            fact: 'Gravity pulls objects toward the Earth!',
            detail: `Gravity is an invisible force that pulls objects toward each other. On Earth, it pulls everything toward the planet’s center.
Without gravity, we would float into space! Gravity keeps our feet on the ground, water in oceans, and the Moon orbiting Earth.

Isaac Newton studied gravity in the 1600s. The famous story tells that an apple fell from a tree, inspiring him to wonder why objects always fall downward. Newton discovered that all objects with mass attract each other.

Gravity affects everything in the universe. It keeps planets orbiting stars, moons orbiting planets, and even galaxies together. The strength of gravity depends on the mass of objects and the distance between them. Bigger objects, like planets, have stronger gravity.

We can feel gravity daily. Jumping, falling, throwing objects—they all show gravity’s effect. Gravity also influences how rivers flow, tides rise and fall, and how objects fall in experiments. Understanding gravity helps scientists study planets, stars, and black holes, making it one of the most important forces in the universe.`,
            extraInfo: [
              { emoji: '🍎', text: 'Newton’s apple story' },
              { emoji: '🌕', text: 'Moon orbits Earth because of gravity' },
              { emoji: '⚖️', text: 'Gravity is invisible but measurable' },
            ],
          },
          {
            name: 'Volcanoes',
            emoji: '🌋',
            fact: 'Volcanoes erupt molten lava from inside Earth!',
            detail: `A volcano is an opening in the Earth's crust where molten rock, gases, and ash escape. Volcanoes form when magma from inside the Earth rises to the surface. Some eruptions are gentle lava flows, while others explode violently.

Volcanoes shape Earth’s landscape over millions of years. They can create mountains, islands, and fertile soil full of nutrients for plants. People living near volcanoes enjoy rich soil but must stay alert to eruptions.

Famous volcanoes include Mount Vesuvius in Italy, which buried Pompeii in AD 79, and Mount St. Helens in the USA. Scientists monitor volcanoes with seismographs, gas detectors, and satellites to predict eruptions.

Volcanoes also impact climate. Large eruptions release ash and gases that can cool the Earth temporarily. Studying volcanoes helps scientists understand Earth's interior, natural hazards, and the power of nature. Volcanoes teach us both awe and respect for the planet’s forces.`,
            extraInfo: [
              { emoji: '🔥', text: 'Hot lava can flow for kilometers' },
              { emoji: '🌪️', text: 'Eruptions create ash clouds' },
              { emoji: '🌎', text: 'Volcanoes shape Earth’s surface' },
            ],
          },
          {
            name: 'Planets',
            emoji: '🪐',
            fact: 'Our solar system has 8 planets orbiting the Sun!',
            detail: `A planet is a large object that orbits a star. Our solar system has eight planets orbiting the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.

Planets are divided into two types: terrestrial (rocky) and gas giants. Terrestrial planets include Earth, Mars, Venus, and Mercury. Gas giants like Jupiter and Saturn are mostly made of gases.

Earth is the only planet known to support life. It has water, an atmosphere, and suitable temperatures. Mars is the Red Planet, and Jupiter is the largest planet with a storm called the Great Red Spot. Saturn is famous for its icy rings.

Planets orbit stars because of gravity. Distance from the star determines temperature. Scientists use telescopes, satellites, and space missions to explore planets and understand Earth’s place in the universe. Studying planets helps us imagine life elsewhere and learn about space exploration.`,
            extraInfo: [
              { emoji: '☀️', text: 'Sun is the center of our solar system' },
              { emoji: '🌎', text: 'Earth is the only planet with known life' },
              { emoji: '🪐', text: 'Planets orbit stars due to gravity' },
            ],
          },
          {
            name: 'Dinosaurs',
            emoji: '🦖',
            fact: 'Dinosaurs lived millions of years ago!',
            detail: `Dinosaurs were reptiles that lived millions of years ago, during the Mesozoic Era. Some were enormous, like the Brachiosaurus, while others, like Velociraptor, were small and fast.

Dinosaurs were diverse: herbivores ate plants, carnivores hunted animals, and omnivores ate both. Fossils help scientists study their shapes, habits, and evolution.

Dinosaurs disappeared about 65 million years ago, likely due to an asteroid impact and climate changes. Fossils and footprints provide clues about how they lived, moved, and behaved.

Learning about dinosaurs teaches children about evolution, extinct species, and Earth's history. Museums, fossils, and interactive exhibits make dinosaurs exciting and fun for all ages. Understanding dinosaurs helps us appreciate how life on Earth changes over millions of years.`,
            extraInfo: [
              { emoji: '🥩', text: 'Some were carnivores, some herbivores' },
              { emoji: '🦕', text: 'Tyrannosaurus Rex was huge!' },
              { emoji: '🦴', text: 'Fossils help us learn about the past' },
            ],
          },
          {
            name: 'Oceans',
            emoji: '🌊',
            fact: "Oceans cover 71% of Earth's surface!",
            detail: `Oceans are massive bodies of saltwater covering most of Earth. They regulate climate, provide oxygen, and are home to countless creatures from tiny plankton to whales.

Ocean currents move warm and cold water, affecting weather patterns and temperatures. The deep ocean remains mostly unexplored, hiding mysteries like deep-sea vents and strange creatures.

Oceans provide food, transportation, and recreation for humans. Coral reefs support diverse ecosystems, but pollution and climate change threaten them.

Studying oceans helps scientists understand Earth’s systems, protect marine life, and discover new species. Oceans are not just water—they are complex, dynamic worlds full of life and energy.`,
            extraInfo: [
              { emoji: '🐠', text: 'Home to countless sea creatures' },
              { emoji: '🧭', text: 'Oceans influence weather and climate' },
              { emoji: '🌎', text: 'Essential for life on Earth' },
            ],
          },
          // You can continue adding more topics in this format
        ],
      }
    },
  }
</script>

<style scoped>
  .science-explorer {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    padding: 20px;
    background: linear-gradient(135deg, #f9fbc8, #f6d365);
  }

  .science-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }

  .science-card {
    background: #fff8e7;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .science-card:hover {
    transform: scale(1.05) rotate(-2deg);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  .topic-emoji {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .science-detail-card {
    margin-top: 25px;
    background: #fffbea;
    padding: 20px;
    border-radius: 25px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    text-align: left;
    animation: pop 0.4s ease;
  }

  .science-detail-card .big {
    font-size: 4rem;
    margin-bottom: 10px;
    text-align: center;
  }

  .topic-detail {
    margin-top: 15px;
    line-height: 1.5;
    text-align: justify;
    font-size: 0.95rem;
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
</style>
