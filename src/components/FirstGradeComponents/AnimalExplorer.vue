<template>
  <div class="animal-explorer">
    <h2>🐾 Animal Explorer</h2>
    <p>Click on an animal to learn more!</p>

    <div
      v-for="(animals, className) in animalClasses"
      :key="className"
      class="animal-class"
    >
      <h3 class="class-title" @click="toggleClass(className)">
        {{ className }}
        <span>{{ expandedClasses.includes(className) ? '▼' : '►' }}</span>
      </h3>

      <transition name="slide-fade">
        <div v-if="expandedClasses.includes(className)" class="animal-grid">
          <div
            v-for="animal in animals"
            :key="animal.name"
            class="animal-card"
            @click="showAnimal(animal)"
          >
            <div class="animal-emoji">{{ animal.emoji }}</div>
            <h4>{{ animal.name }}</h4>
          </div>
        </div>
      </transition>
    </div>

    <!-- Animal Detail Card -->
    <transition name="pop">
      <div v-if="selectedAnimal" class="animal-detail-card">
        <button class="close-btn" @click="selectedAnimal = null">❌</button>
        <div class="animal-emoji big">{{ selectedAnimal.emoji }}</div>
        <h3>{{ selectedAnimal.name }}</h3>
        <p>
          <strong>Class:</strong>
          {{ selectedAnimal.class }}
        </p>
        <p>
          <strong>Diet:</strong>
          {{ selectedAnimal.diet }}
        </p>
        <p>
          <strong>Habitat:</strong>
          {{ selectedAnimal.habitat }}
        </p>
        <p>
          <strong>Fun Fact:</strong>
          {{ selectedAnimal.fact }}
        </p>

        <ul class="extra-info">
          <li v-for="(info, index) in selectedAnimal.extraInfo" :key="index">
            {{ info.emoji }} {{ info.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AnimalExplorer',
    data() {
      return {
        selectedAnimal: null,
        expandedClasses: [],

        animalClasses: {
          Reptiles: [
            {
              name: 'Crocodile',
              emoji: '🐊',
              class: 'Reptile',
              diet: 'Carnivore',
              habitat: 'Rivers',
              fact: 'Can hold breath underwater for 1 hour!',
              extraInfo: [
                { emoji: '🦷', text: 'Strong jaws' },
                { emoji: '🌊', text: 'Excellent swimmer' },
              ],
            },
            {
              name: 'Snake',
              emoji: '🐍',
              class: 'Reptile',
              diet: 'Carnivore',
              habitat: 'Forests',
              fact: 'Some detect heat to hunt!',
              extraInfo: [{ emoji: '👀', text: 'Heat-sensing pits' }],
            },

            {
              name: 'Turtle',
              emoji: '🐢',
              class: 'Reptile',
              diet: 'Herbivore',
              habitat: 'Ponds',
              fact: 'Can live for decades!',
              extraInfo: [
                { emoji: '🛡️', text: 'Hard shell for protection' },
                {
                  emoji: '🌱',
                  text: 'Baby turtles (hatchlings) eat insects, algae, and small plants.',
                },
                {
                  emoji: '🍃',
                  text: 'Juveniles start eating more plants like leaves, grasses, and aquatic vegetation.',
                },
                {
                  emoji: '🥗',
                  text: 'Adult turtles are mainly herbivores, enjoying water plants, fruits, and leafy greens.',
                },
                {
                  emoji: '🌡️',
                  text: 'They thrive in water between 75–86°F (24–30°C), which helps digestion and movement.',
                },
                {
                  emoji: '🌊',
                  text: 'Turtles live in ponds, lakes, and rivers with calm, fresh water and sunny basking spots.',
                },
                {
                  emoji: '🐠',
                  text: 'They can share habitats with small fish, frogs, and insects if the space has enough food.',
                },
                {
                  emoji: '🍼',
                  text: 'Life cycle: Egg → Hatchling → Juvenile → Adult → Some live 50–80 years or more!',
                },
                {
                  emoji: '💡',
                  text: 'Fun fact: Sea turtles migrate thousands of miles and always return to the same beach to lay eggs.',
                },
              ],
            },

            {
              name: 'Lizard',
              emoji: '🦎',
              class: 'Reptile',
              diet: 'Omnivore',
              habitat: 'Deserts',
              fact: 'Can regrow tail!',
              extraInfo: [{ emoji: '🦵', text: 'Fast runner' }],
            },
            {
              name: 'Komodo Dragon',
              emoji: '🐉',
              class: 'Reptile',
              diet: 'Carnivore',
              habitat: 'Islands',
              fact: 'Largest living lizard!',
              extraInfo: [{ emoji: '🦷', text: 'Sharp teeth' }],
            },
            {
              name: 'Gecko',
              emoji: '🦎',
              class: 'Reptile',
              diet: 'Insectivore',
              habitat: 'Tropical forests',
              fact: 'Can stick to walls!',
              extraInfo: [{ emoji: '🖐️', text: 'Sticky feet' }],
            },
            // …add more reptiles
          ],
          Mammals: [
            {
              name: 'Elephant',
              emoji: '🐘',
              class: 'Mammal',
              diet: 'Herbivore',
              habitat: 'Savannah',
              fact: 'Has amazing memory!',
              extraInfo: [
                { emoji: '👂', text: 'Big ears' },
                { emoji: '🐘', text: 'Social herd' },
              ],
            },
            {
              name: 'Lion',
              emoji: '🦁',
              class: 'Mammal',
              diet: 'Carnivore',
              habitat: 'Savannah',
              fact: 'Called the king of the jungle!',
              extraInfo: [{ emoji: '🦁', text: 'Live in prides' }],
            },
            {
              name: 'Monkey',
              emoji: '🐒',
              class: 'Mammal',
              diet: 'Omnivore',
              habitat: 'Forests',
              fact: 'Very playful and social!',
              extraInfo: [{ emoji: '🪵', text: 'Climbs trees' }],
            },
            {
              name: 'Panda',
              emoji: '🐼',
              class: 'Mammal',
              diet: 'Herbivore',
              habitat: 'Bamboo forests',
              fact: 'Loves bamboo!',
              extraInfo: [{ emoji: '🎋', text: 'Eats lots of bamboo' }],
            },
            {
              name: 'Fox',
              emoji: '🦊',
              class: 'Mammal',
              diet: 'Omnivore',
              habitat: 'Forests',
              fact: 'Very clever and quick!',
              extraInfo: [{ emoji: '🏃', text: 'Fast hunter' }],
            },
            {
              name: 'Bear',
              emoji: '🐻',
              class: 'Mammal',
              diet: 'Omnivore',
              habitat: 'Forests',
              fact: 'Hibernates in winter!',
              extraInfo: [{ emoji: '❄️', text: 'Sleeps in winter' }],
            },
            {
              name: 'Koala',
              emoji: '🐨',
              class: 'Mammal',
              diet: 'Herbivore',
              habitat: 'Eucalyptus forests',
              fact: 'Sleeps 18–20 hours/day!',
              extraInfo: [{ emoji: '🌿', text: 'Eats eucalyptus' }],
            },
            // …add more mammals
          ],
          Birds: [
            {
              name: 'Eagle',
              emoji: '🦅',
              class: 'Bird',
              diet: 'Carnivore',
              habitat: 'Mountains',
              fact: 'Incredible eyesight!',
              extraInfo: [{ emoji: '👀', text: 'Spot prey far away' }],
            },
            {
              name: 'Parrot',
              emoji: '🦜',
              class: 'Bird',
              diet: 'Herbivore',
              habitat: 'Tropical forests',
              fact: 'Can mimic human speech!',
              extraInfo: [{ emoji: '🗣️', text: 'Mimics sounds' }],
            },
            {
              name: 'Sparrow',
              emoji: '🐦',
              class: 'Bird',
              diet: 'Omnivore',
              habitat: 'Urban areas',
              fact: 'Small but adaptable!',
              extraInfo: [{ emoji: '🏠', text: 'Lives near humans' }],
            },
            {
              name: 'Penguin',
              emoji: '🐧',
              class: 'Bird',
              diet: 'Carnivore',
              habitat: 'Antarctica',
              fact: 'Cannot fly but swims excellently!',
              extraInfo: [{ emoji: '🌊', text: 'Great swimmer' }],
            },
            {
              name: 'Owl',
              emoji: '🦉',
              class: 'Bird',
              diet: 'Carnivore',
              habitat: 'Forests',
              fact: 'Nocturnal hunter!',
              extraInfo: [{ emoji: '🌙', text: 'Hunts at night' }],
            },
            {
              name: 'Swan',
              emoji: '🦢',
              class: 'Bird',
              diet: 'Herbivore',
              habitat: 'Lakes',
              fact: 'Very graceful swimmer!',
              extraInfo: [{ emoji: '🌊', text: 'Swims elegantly' }],
            },
            {
              name: 'Flamingo',
              emoji: '🦩',
              class: 'Bird',
              diet: 'Omnivore',
              habitat: 'Lakes, lagoons',
              fact: 'Pink from their food!',
              extraInfo: [{ emoji: '🍤', text: 'Color comes from shrimp' }],
            },
            // …add more birds
          ],
        },
      }
    },
    methods: {
      toggleClass(className) {
        if (this.expandedClasses.includes(className)) {
          this.expandedClasses = this.expandedClasses.filter(
            (c) => c !== className,
          )
        } else {
          this.expandedClasses.push(className)
        }
      },
      showAnimal(animal) {
        this.selectedAnimal = animal
      },
    },
  }
</script>

<style scoped>
  .animal-explorer {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    padding: 20px;
    background: #fef9f3;
  }

  .class-title {
    font-size: 1.5rem;
    margin-top: 20px;
    cursor: pointer;
    color: #ff6f61;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .animal-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(280px, 1fr)
    ); /* wider cards */
    gap: 25px;
    margin-top: 10px;
    justify-items: center; /* centers cards */
  }

  .animal-card {
    background: #fff8e7;
    border-radius: 20px;
    padding: 30px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

    /* remove width % so grid decides */
    width: 100%;
    max-width: 350px; /* cap so it won’t get too giant */
    text-align: center;
  }

  .animal-card:hover {
    transform: scale(1.05) rotate(-2deg);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  .animal-emoji {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .animal-detail-card {
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

  .animal-detail-card .big {
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

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
