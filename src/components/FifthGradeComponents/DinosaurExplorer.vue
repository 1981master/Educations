<template>
  <div class="dino-explorer">
    <h2>Dinosaur Explorer 🦖</h2>
    <p>Click on a dinosaur to learn more!</p>

    <div class="dino-grid">
      <div
        v-for="dino in dinosaurs"
        :key="dino.name"
        class="dino-card"
        @click="selectedDino = dino"
      >
        <img :src="dino.image" :alt="dino.name" />
        <h3>{{ dino.name }}</h3>
      </div>
    </div>

    <div v-if="selectedDino" class="dino-detail">
      <button class="close-btn" @click="selectedDino = null">Close ✖</button>
      <h2>{{ selectedDino.name }}</h2>
      <img :src="selectedDino.image" :alt="selectedDino.name" />
      <p>
        <strong>Type / Era:</strong>
        {{ selectedDino.type }}
      </p>
      <p>
        <strong>Fun Fact:</strong>
        {{ selectedDino.fact }}
      </p>
    </div>
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
            name: 'Tyrannosaurus Rex',
            type: 'Carnivore, Late Cretaceous',
            fact: 'T. Rex had the strongest bite of any land animal.',
            //            image: require('@/assets/dinos/trex.png'),
          },
          {
            name: 'Triceratops',
            type: 'Herbivore, Late Cretaceous',
            fact: 'Triceratops had three horns and a large frill.',
            //           image: require('@/assets/dinos/triceratops.png'),
          },
          {
            name: 'Velociraptor',
            type: 'Carnivore, Late Cretaceous',
            fact: 'Velociraptor was very fast and smart.',
            //          image: require('@/assets/dinos/velociraptor.png'),
          },
          {
            name: 'Brachiosaurus',
            type: 'Herbivore, Late Jurassic',
            fact: 'Brachiosaurus had a long neck to reach tall trees.',
            //         image: require('@/assets/dinos/brachiosaurus.png'),
          },
          {
            name: 'Stegosaurus',
            type: 'Herbivore, Late Jurassic',
            fact: 'Stegosaurus had plates on its back and spikes on its tail.',
            //        image: require('@/assets/dinos/stegosaurus.png'),
          },
          {
            name: 'Allosaurus',
            type: 'Carnivore, Late Jurassic',
            fact: 'Allosaurus was a top predator before T. Rex existed.',
            //       image: require('@/assets/dinos/allosaurus.png'),
          },
          {
            name: 'Ankylosaurus',
            type: 'Herbivore, Late Cretaceous',
            fact: 'Ankylosaurus had a huge club on its tail.',
            //      image: require('@/assets/dinos/ankylosaurus.png'),
          },
          {
            name: 'Spinosaurus',
            type: 'Carnivore, Cretaceous',
            fact: 'Spinosaurus had a sail on its back and could swim.',
            //     image: require('@/assets/dinos/spinosaurus.png'),
          },
          {
            name: 'Diplodocus',
            type: 'Herbivore, Late Jurassic',
            fact: 'Diplodocus was very long and could weigh up to 16 tons.',
            //    image: require('@/assets/dinos/diplodocus.png'),
          },
          {
            name: 'Pteranodon',
            type: 'Flying, Late Cretaceous',
            fact: 'Pteranodon could fly and had a huge wingspan.',
            //   image: require('@/assets/dinos/pteranodon.png'),
          },
          {
            name: 'Iguanodon',
            type: 'Herbivore, Early Cretaceous',
            fact: 'Iguanodon had a thumb spike for defense.',
            //  image: require('@/assets/dinos/iguanodon.png'),
          },
          {
            name: 'Compsognathus',
            type: 'Carnivore, Late Jurassic',
            fact: 'One of the smallest dinosaurs, about the size of a chicken.',
            // image: require('@/assets/dinos/compsognathus.png'),
          },
          {
            name: 'Carnotaurus',
            type: 'Carnivore, Late Cretaceous',
            fact: 'Carnotaurus had tiny arms and horns above its eyes.',
            //    image: require('@/assets/dinos/carnotaurus.png'),
          },
          {
            name: 'Pachycephalosaurus',
            type: 'Herbivore, Late Cretaceous',
            fact: 'Had a thick domed skull to head-butt rivals.',
            //   image: require('@/assets/dinos/pachycephalosaurus.png'),
          },
          {
            name: 'Parasaurolophus',
            type: 'Herbivore, Late Cretaceous',
            fact: 'Had a long curved crest for making sounds.',
            //  image: require('@/assets/dinos/parasaurolophus.png'),
          },
          {
            name: 'Mosasaurus',
            type: 'Marine, Late Cretaceous',
            fact: 'Giant marine predator that lived in the oceans.',
            //    image: require('@/assets/dinos/mosasaurus.png'),
          },
          {
            name: 'Therizinosaurus',
            type: 'Herbivore, Late Cretaceous',
            fact: 'Had huge claws up to 1 meter long!',
            //   image: require('@/assets/dinos/therizinosaurus.png'),
          },
          {
            name: 'Coelophysis',
            type: 'Carnivore, Late Triassic',
            fact: 'One of the earliest known dinosaurs.',
            //  image: require('@/assets/dinos/coelophysis.png'),
          },
          {
            name: 'Archaeopteryx',
            type: 'Flying, Late Jurassic',
            fact: 'Considered the first bird-like dinosaur.',
            //    image: require('@/assets/dinos/archaeopteryx.png'),
          },
          {
            name: 'Deinonychus',
            type: 'Carnivore, Early Cretaceous',
            fact: 'Fast predator with sharp claws on its feet.',
            //   image: require('@/assets/dinos/deinonychus.png'),
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .dino-explorer {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    color: #222;
    text-align: center;
    background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%);
    padding: 20px;
    border-radius: 15px;
    max-width: 1200px;
    margin: 20px auto;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .dino-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }

  .dino-card {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .dino-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }

  .dino-card img {
    width: 100%;
    border-radius: 8px;
  }

  .dino-card h3 {
    margin: 8px 0 0 0;
    font-size: 16px;
  }

  .dino-detail {
    margin-top: 30px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: inline-block;
    text-align: center;
    position: relative;
  }

  .dino-detail img {
    width: 200px;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: #f28b82;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
</style>
