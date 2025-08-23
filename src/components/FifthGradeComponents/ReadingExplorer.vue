<template>
  <div class="reading-explorer">
    <h2>📚 5th Grade Reading Explorer</h2>
    <p>Click a story to read and answer the quiz!</p>

    <div class="reading-grid">
      <div
        v-for="story in stories"
        :key="story.title"
        class="reading-card"
        @click="selectStory(story)"
      >
        <h3>{{ story.title }}</h3>
      </div>
    </div>

    <!-- Story Detail -->
    <transition name="pop">
      <div v-if="selectedStory" class="story-detail-card">
        <button class="close-btn" @click="selectedStory = null">❌</button>
        <h2>{{ selectedStory.title }}</h2>
        <p class="story-content">{{ selectedStory.content }}</p>

        <h3>Quiz</h3>
        <ul class="quiz-list">
          <li v-for="(q, index) in selectedStory.quiz" :key="index">
            <p>{{ q.question }}</p>
            <ul>
              <li
                v-for="(option, i) in q.options"
                :key="i"
                :class="{
                  selected: q.selected === i,
                  correct: q.selected === i && i === q.answer,
                  wrong: q.selected === i && i !== q.answer,
                }"
                @click="selectAnswer(q, i)"
              >
                {{ option }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'ReadingExplorer',
    data() {
      return {
        selectedStory: null,
        stories: [
          {
            title: 'The Magical Forest Adventure',
            content: `Once upon a time, in a magical forest filled with talking animals and sparkling streams, lived a brave young girl named Lily. Every day, Lily explored the forest, discovering new plants, helping animals in need, and solving mysteries. One day, she heard a soft cry near the riverbank. A tiny fox had its paw stuck in a net! Using her clever thinking and quick hands, Lily freed the fox. Grateful, the fox promised to help her whenever she needed it. Soon after, Lily encountered a glowing tree that whispered secrets about hidden treasures. With courage and determination, she navigated through twists and turns, meeting friendly creatures and learning valuable lessons about friendship, courage, and empathy. By the end of the day, Lily had not only found a secret waterfall but had also made friends with all the animals in the forest. Her heart was full of joy, and she realized that kindness and bravery always lead to wonderful adventures!`,
            quiz: [
              {
                question: 'Who is the main character in the story?',
                options: ['Lily', 'The fox', 'The glowing tree', 'A river'],
                answer: 0,
                selected: null,
              },
              {
                question: 'What lesson did Lily learn?',
                options: [
                  'Kindness and bravery lead to adventure',
                  'Always avoid animals',
                  'Treasure is the most important',
                  'Never enter forests',
                ],
                answer: 0,
                selected: null,
              },
              {
                question: 'Who helped Lily on her adventure?',
                options: ['A dragon', 'A tiny fox', 'A talking tree', 'No one'],
                answer: 1,
                selected: null,
              },
            ],
          },
          {
            title: 'The Mystery of the Hidden Cave',
            content: `On the outskirts of the village, a hidden cave awaited discovery. Tom, a curious boy with a love for exploration, decided to uncover its secrets. He packed a flashlight, rope, and snacks, ready for any surprises. Entering the cave, he noticed strange markings on the walls and sparkling crystals illuminating the dark corridors. As he moved deeper, he found evidence of ancient people who once lived there. A secret passage led to an underground chamber with glowing mushrooms and a small underground stream. Tom's heart raced with excitement as he carefully mapped the cave, realizing he had discovered a natural wonder that no one in the village had ever seen. He learned how important observation, patience, and respect for nature are during explorations. Tom left the cave feeling proud, knowing he had uncovered a story that nature had kept hidden for centuries, reminding him that curiosity and careful study can reveal incredible secrets in the world around us.`,
            quiz: [
              {
                question: 'What did Tom bring with him?',
                options: [
                  'Flashlight, rope, snacks',
                  'A backpack of toys',
                  'A bicycle',
                  'Nothing',
                ],
                answer: 0,
                selected: null,
              },
              {
                question: 'What did Tom find in the cave?',
                options: [
                  'Glowing mushrooms and crystals',
                  'Treasure chest with gold',
                  'A lost puppy',
                  'Nothing interesting',
                ],
                answer: 0,
                selected: null,
              },
              {
                question: 'What did Tom learn from this adventure?',
                options: [
                  'Curiosity and respect for nature reveal secrets',
                  'Caves are dangerous and should be avoided',
                  'Always bring friends',
                  'Maps are useless',
                ],
                answer: 0,
                selected: null,
              },
              {
                title: 'The Lost Balloon Adventure',
                content:
                  'One sunny morning, Lily’s red balloon slipped from her hands and floated away over the hills. Determined to rescue it, she packed a small backpack with snacks and a map. As she followed the balloon across meadows and streams, she met friendly animals that guided her path. Birds chirped directions, squirrels pointed to hidden trails, and even a wise old owl offered advice. After hours of exploring, Lily reached a magical glade where the balloon had landed near a sparkling pond. She carefully retrieved it and realized that her journey had taught her courage, patience, and how to appreciate nature. Returning home, she shared her adventure with friends, inspiring them to explore their own surroundings with curiosity and bravery. Through her adventure, Lily discovered that sometimes the journey itself is more valuable than the destination.',
                quiz: [
                  {
                    question: 'What flew away from Lily?',
                    options: ['A balloon', 'A kite', 'A hat', 'A dog'],
                    answer: 0,
                  },
                  {
                    question: 'Which animal offered advice?',
                    options: ['Owl', 'Squirrel', 'Bird', 'Dog'],
                    answer: 0,
                  },
                  {
                    question: 'What did Lily learn?',
                    options: [
                      'Courage and patience',
                      'Math',
                      'Cooking',
                      'Swimming',
                    ],
                    answer: 0,
                  },
                ],
              },
              {
                title: 'The Secret Garden of Colors',
                content:
                  'Emma discovered a hidden gate in her backyard that led to a secret garden filled with flowers of every imaginable color. As she stepped in, the petals seemed to glow, and the air smelled sweet. She learned that each flower had a special property: red flowers gave energy, blue flowers calmed the mind, and yellow flowers inspired happiness. Emma spent the day exploring, painting, and creating bouquets. She invited her friends to visit, and they all learned how to mix colors, appreciate nature, and express their creativity. By the evening, Emma realized that her secret garden had taught her lessons about emotions, teamwork, and the beauty of diversity in the world.',
                quiz: [
                  {
                    question: 'Where did Emma find the secret garden?',
                    options: ['Backyard', 'School', 'Library', 'Park'],
                    answer: 0,
                  },
                  {
                    question: 'Which flower color gave happiness?',
                    options: ['Yellow', 'Red', 'Blue', 'Purple'],
                    answer: 0,
                  },
                  {
                    question: 'What did Emma learn?',
                    options: [
                      'Creativity and teamwork',
                      'Math',
                      'Soccer',
                      'Cooking',
                    ],
                    answer: 0,
                  },
                ],
              },
              {
                title: 'The Curious Robot',
                content:
                  'Max built a small robot named Roxy in his garage. Unlike other robots, Roxy could ask questions and explore the world. Max and Roxy went on adventures in the park, library, and museum, learning new facts about animals, planets, and inventions. Roxy sometimes got stuck, but Max taught problem-solving skills, patience, and coding logic. Together, they discovered hidden details about the world that they had never noticed before. By the end of the summer, Max realized that curiosity and learning are powers as strong as any robot technology.',
                quiz: [
                  {
                    question: 'What could Roxy do?',
                    options: ['Ask questions', 'Cook food', 'Fly', 'Sing'],
                    answer: 0,
                  },
                  {
                    question: 'Where did Max and Roxy explore?',
                    options: [
                      'Park and museum',
                      'Home only',
                      'School',
                      'Market',
                    ],
                    answer: 0,
                  },
                  {
                    question: 'What lesson did Max learn?',
                    options: [
                      'Curiosity is powerful',
                      'Sleep more',
                      'Play video games',
                      'Eat candy',
                    ],
                    answer: 0,
                  },
                ],
              },
            ],
          },
          {
            title: 'The Enchanted Library',
            content:
              'Mia loved reading, but one rainy day she discovered a hidden door in her local library that led to a magical world of books. The books could talk, and their stories came alive around her. She met characters from fairy tales, mysteries, and adventures. One book taught her courage by showing a knight saving a village, another taught kindness through a tale of a gentle giant, and a third showed creativity through inventors and artists. Mia realized that reading could transport her anywhere and teach valuable lessons. She returned home, inspired to write her own stories and share the magic of books with her friends. From that day on, every visit to the library was an adventure full of imagination, learning, and fun.',
            quiz: [
              {
                question: 'What did Mia discover in the library?',
                options: [
                  'A hidden magical door',
                  'A secret tunnel',
                  'A treasure chest',
                  'A sleeping cat',
                ],
                answer: 0,
              },
              {
                question: 'What did the books do?',
                options: [
                  'Talk and come alive',
                  'Stay closed',
                  'Fly',
                  'Turn into food',
                ],
                answer: 0,
              },
              {
                question: 'What lesson did Mia learn?',
                options: [
                  'Reading teaches valuable lessons',
                  'Sleep is best',
                  'Math is hard',
                  'Play sports',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'Journey to the Tiny Planet',
            content:
              'Leo dreamed of traveling through space, and one night a tiny spaceship appeared in his backyard. It was small enough for just him, yet powerful enough to take him to a nearby tiny planet. The planet was covered with glowing crystals and rainbow rivers. Strange but friendly creatures taught Leo about science, nature, and cooperation. He helped them solve a problem with their energy source by combining teamwork with creative thinking. When Leo returned home, he realized that the universe was full of wonders waiting to be explored, and even the smallest planet could teach big lessons. He started drawing maps, designing his own spaceships, and imagining future adventures with friends.',
            quiz: [
              {
                question: 'Where did Leo travel?',
                options: ['Tiny planet', 'Moon', 'Forest', 'School'],
                answer: 0,
              },
              {
                question: 'What did Leo learn from the creatures?',
                options: [
                  'Science and teamwork',
                  'Cooking',
                  'Math only',
                  'Sports',
                ],
                answer: 0,
              },
              {
                question: 'What did Leo do after returning?',
                options: [
                  'Draw maps and design spaceships',
                  'Sleep',
                  'Play video games',
                  'Cook',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Talking River',
            content:
              'Sophie loved nature walks, but one morning she heard a voice while walking by the river. To her surprise, the river could talk! It told stories of animals, seasons, and the history of the land. It explained how water cycles, how plants grow, and why pollution harms life. Sophie spent the whole day listening, learning about conservation, and promising to protect the river and her environment. She shared these lessons at school, inspiring her classmates to care for nature. The Talking River taught Sophie that listening, observing, and taking action can make a difference in the world.',
            quiz: [
              {
                question: 'What surprised Sophie by the river?',
                options: [
                  'The river could talk',
                  'A fish jumped out',
                  'She found a treasure',
                  'A bird sang',
                ],
                answer: 0,
              },
              {
                question: 'What did the river teach her?',
                options: [
                  'Conservation and nature',
                  'Math',
                  'Sports',
                  'Cooking',
                ],
                answer: 0,
              },
              {
                question: 'What did Sophie do after learning?',
                options: [
                  'Inspired classmates to protect nature',
                  'Ignored it',
                  'Played video games',
                  'Went home only',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Secret of the Whispering Tree',
            content:
              'In the middle of a park, Ethan discovered a giant tree that whispered secrets about the world. Each leaf told a different story about animals, planets, and inventions. Ethan learned about bravery from a squirrel who outsmarted a fox, curiosity from a cat exploring rooftops, and perseverance from ants building tunnels. Every day, he returned, writing down the lessons and experimenting with ideas in his backyard lab. The Whispering Tree became a teacher for Ethan, showing that knowledge could come from unexpected places and that curiosity could make everyday life an adventure.',
            quiz: [
              {
                question: 'What did the tree do?',
                options: [
                  'Whisper secrets',
                  'Grow flowers instantly',
                  'Move',
                  'Sing songs',
                ],
                answer: 0,
              },
              {
                question: 'What lesson did Ethan learn?',
                options: [
                  'Curiosity and perseverance',
                  'Cooking',
                  'Sleeping',
                  'Video games',
                ],
                answer: 0,
              },
              {
                question: 'Where did Ethan write lessons?',
                options: ['Backyard lab', 'School desk', 'Library', 'Kitchen'],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Magical Paintbrush',
            content:
              'Anna received a magical paintbrush from her grandmother. Anything she painted came to life! She painted a garden, animals, and even a tiny fairy village. But she learned that with great power comes responsibility. When she painted too much without thinking, some creatures got confused and wandered away. Anna used problem-solving and planning to help them return safely. The experience taught her creativity, responsibility, and empathy. Her magical creations amazed her friends, but she understood that true magic lies in using talents wisely.',
            quiz: [
              {
                question: 'What did Anna receive?',
                options: ['A magical paintbrush', 'A book', 'A pet', 'A map'],
                answer: 0,
              },
              {
                question: 'What happened when she painted too much?',
                options: [
                  'Creatures wandered away',
                  'The paintbrush broke',
                  'It rained',
                  'Nothing happened',
                ],
                answer: 0,
              },
              {
                question: 'What lesson did Anna learn?',
                options: [
                  'Creativity and responsibility',
                  'Math',
                  'Sports',
                  'Sleep well',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Floating Island',
            content:
              'Jack discovered a small island floating in the middle of the lake. Curious, he sailed a small boat to it and found that it moved with the wind and clouds. The island had plants, rocks, and animals unlike anywhere else. Jack learned about ecosystems, food chains, and adaptation by observing how everything interacted. He even helped a lost bird find its family and helped plants grow in a new section of the island. When he returned home, Jack shared his adventure, teaching friends about ecology, responsibility, and the joy of exploration.',
            quiz: [
              {
                question: 'Where did Jack find the island?',
                options: [
                  'Middle of the lake',
                  'Mountain top',
                  'Forest',
                  'School',
                ],
                answer: 0,
              },
              {
                question: 'What did Jack learn?',
                options: [
                  'Ecosystems and adaptation',
                  'Math',
                  'Cooking',
                  'Sports',
                ],
                answer: 0,
              },
              {
                question: 'What did Jack do for the bird?',
                options: [
                  'Helped it find its family',
                  'Ignored it',
                  'Painted it',
                  'Fed it candy',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Time-Traveling Notebook',
            content:
              'Sophie found a notebook that could take her to any moment in history when she wrote a date. She visited ancient Egypt, the Renaissance, and even future cities. She learned about inventions, cultures, and famous figures. The notebook also taught her the importance of recording events carefully and reflecting on history. When she returned to the present, Sophie shared stories in school projects, inspiring classmates to appreciate history and imagine future possibilities. The notebook became a tool for learning, curiosity, and responsible imagination.',
            quiz: [
              {
                question: 'What could the notebook do?',
                options: ['Time travel', 'Fly', 'Sing', 'Cook food'],
                answer: 0,
              },
              {
                question: 'Which period did Sophie visit?',
                options: ['Ancient Egypt', 'Forest', 'Park', 'Zoo'],
                answer: 0,
              },
              {
                question: 'What did Sophie learn?',
                options: ['History and reflection', 'Math', 'Music', 'Sports'],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Cloud Painter',
            content:
              'Tom loved looking at clouds, imagining shapes and stories. One day, he discovered he could paint the clouds with a magical brush. He created dragons, castles, and animals that floated in the sky. People below marveled at the sky’s beauty. Tom learned about imagination, sharing, and the impact of creativity on others. He realized that small acts of creativity could inspire many, and he spent every afternoon painting skies with fun, inspiring shapes. His cloud paintings became stories in themselves, teaching others to see beauty in ordinary things.',
            quiz: [
              {
                question: 'What could Tom do?',
                options: ['Paint clouds', 'Fly', 'Swim', 'Sing'],
                answer: 0,
              },
              {
                question: 'What lesson did Tom learn?',
                options: [
                  'Creativity inspires others',
                  'Math',
                  'Sleep',
                  'Play games',
                ],
                answer: 0,
              },
              {
                question: 'What did people see?',
                options: [
                  'Dragons and castles in clouds',
                  'Nothing special',
                  'Rain only',
                  'Birds',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Whispering Wind',
            content:
              'Ella loved walking in the fields, listening to the wind. One day, the wind started whispering stories about distant lands, mysterious creatures, and brave explorers. By following the whispers, she solved riddles, discovered hidden treasures, and learned lessons about courage, friendship, and curiosity. She realized that nature has stories to tell if we pay attention. Ella began documenting the wind’s tales, sharing them in school, and encouraging friends to listen to nature’s secrets. The wind became a magical teacher, guiding her imagination and learning.',
            quiz: [
              {
                question: 'What did the wind do?',
                options: ['Whisper stories', 'Blow hard', 'Disappear', 'Rain'],
                answer: 0,
              },
              {
                question: 'What lesson did Ella learn?',
                options: ['Courage and curiosity', 'Math', 'Sports', 'Cooking'],
                answer: 0,
              },
              {
                question: 'What did Ella share?',
                options: [
                  'Stories from the wind',
                  'Recipes',
                  'Music',
                  'Sports scores',
                ],
                answer: 0,
              },
            ],
          },
          {
            title: 'The Magical Music Box',
            content:
              'Liam found an old music box in the attic. When he wound it up, magical creatures appeared and danced to the tunes. Each melody taught him about rhythm, harmony, and emotions. The music box could change the weather slightly—sunshine appeared on cloudy days, and flowers bloomed when melodies played. Liam learned how art and music affect moods and the environment. He invited friends to listen, creating community joy and creativity. The magical music box became a symbol of how music connects hearts, teaches lessons, and makes learning fun.',
            quiz: [
              {
                question: 'What happened when Liam wound the music box?',
                options: [
                  'Creatures danced',
                  'It broke',
                  'Nothing happened',
                  'Rained',
                ],
                answer: 0,
              },
              {
                question: 'What did Liam learn?',
                options: ['Rhythm and harmony', 'Math', 'Cooking', 'Sports'],
                answer: 0,
              },
              {
                question: 'What did he do with friends?',
                options: [
                  'Played music together',
                  'Ignored them',
                  'Cooked food',
                  'Went swimming',
                ],
                answer: 0,
              },
            ],
          },
        ],
      }
    },
    methods: {
      selectStory(story) {
        this.selectedStory = story
        // Reset quiz selections
        story.quiz.forEach((q) => (q.selected = null))
      },
      selectAnswer(question, index) {
        question.selected = index
      },
    },
  }
</script>

<style scoped>
  .reading-explorer {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    padding: 20px;
    background: linear-gradient(135deg, #fceabb, #f8b500);
  }

  .reading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }

  .reading-card {
    background: #fff8e7;
    border-radius: 15px;
    padding: 15px;
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .reading-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  .story-detail-card {
    margin-top: 25px;
    background: #fffbe6;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.25);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    animation: pop 0.4s ease;
  }

  .story-content {
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .quiz-list {
    list-style: none;
    padding-left: 0;
  }

  .quiz-list li {
    margin-bottom: 10px;
  }

  .quiz-list li ul {
    list-style: none;
    padding-left: 10px;
  }

  .quiz-list li ul li {
    cursor: pointer;
    padding: 5px;
    border-radius: 8px;
    transition: all 0.2s;
    margin-bottom: 3px;
    border: 1px solid transparent;
  }

  .quiz-list li ul li:hover {
    background: #fffae5;
  }

  .quiz-list li ul li.selected {
    font-weight: bold;
  }

  .quiz-list li ul li.correct {
    background-color: #c0f7c0;
    border-color: #2eb82e;
  }

  .quiz-list li ul li.wrong {
    background-color: #f7c0c0;
    border-color: #e60000;
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
