<template>
  <div class="reading-explorer">
    <h2>📚 5th Grade Reading Explorer</h2>
    <p>Click a story to start reading and answer questions!</p>

    <div class="reading-grid">
      <div
        v-for="story in stories"
        :key="story.title"
        class="reading-card"
        @click="selectStory(story)"
      >
        <div class="story-emoji">{{ story.emoji }}</div>
        <h3>{{ story.title }}</h3>
      </div>
    </div>

    <!-- Story Detail -->
    <transition name="pop">
      <div v-if="selectedStory" class="story-detail-card">
        <button class="close-btn" @click="selectedStory = null">❌</button>
        <div class="story-emoji big">{{ selectedStory.emoji }}</div>
        <h2>{{ selectedStory.title }}</h2>
        <p>{{ selectedStory.content }}</p>

        <div v-if="selectedStory.questions && selectedStory.questions.length">
          <h3>Quiz 📝</h3>
          <ul class="quiz-list">
            <li
              v-for="(q, qIndex) in selectedStory.questions"
              :key="qIndex"
              class="quiz-item"
            >
              <p>
                <strong>{{ q.question }}</strong>
              </p>
              <ul>
                <li
                  v-for="(option, oIndex) in q.options"
                  :key="oIndex"
                  :class="{
                    selected: userAnswers[qIndex] === oIndex,
                    correct: showResults && q.answer === oIndex,
                    wrong:
                      showResults &&
                      userAnswers[qIndex] === oIndex &&
                      q.answer !== oIndex,
                  }"
                  @click="selectAnswer(qIndex, oIndex)"
                >
                  {{ option }}
                </li>
              </ul>
            </li>
          </ul>
          <button v-if="!showResults" class="check-btn" @click="checkAnswers">
            Check Answers ✅
          </button>
          <div v-if="showResults" class="score">
            Your Score: {{ score }}/{{ selectedStory.questions.length }}
          </div>
        </div>
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
        showResults: false,
        userAnswers: [],
        score: 0,
        stories: [
          {
            title: 'The Brave Little Ant',
            emoji: '🐜',
            content: `Once upon a time, a tiny ant wanted to explore the world outside its colony. 
          Even though it was small, the ant showed great courage and cleverness as it navigated forests, rivers, and dangerous insects. 
          Along the way, it learned about teamwork, perseverance, and the importance of helping friends. 
          Its journey teaches us that even the smallest creatures can make a big difference if they try their best.`,
            questions: [
              {
                question: 'Who is the main character in the story?',
                options: ['A brave lion', 'A little ant', 'A flying bird'],
                answer: 1,
              },
              {
                question: 'What does the ant learn?',
                options: [
                  'How to fly',
                  'Teamwork and perseverance',
                  'How to climb trees only',
                ],
                answer: 1,
              },
            ],
          },
          {
            title: 'The Magical Forest',
            emoji: '🌳',
            content: `Deep in the forest, trees whispered secrets and animals danced under the moonlight. 
          A young boy wandered in and discovered magical creatures that could talk. 
          He learned about the balance of nature and how every creature, big or small, has an important role. 
          The forest taught him respect for the environment and the wonders of imagination.`,
            questions: [
              {
                question: 'What did the boy find in the forest?',
                options: ['Talking creatures', 'A treasure chest', 'A castle'],
                answer: 0,
              },
              {
                question: 'What lesson does the forest teach?',
                options: [
                  'Nature has balance and importance',
                  'Magic is everywhere',
                  'Always be brave',
                ],
                answer: 0,
              },
            ],
          },
          // Add more stories here for a long reading list
        ],
      }
    },
    methods: {
      selectStory(story) {
        this.selectedStory = story
        this.userAnswers = Array(
          story.questions ? story.questions.length : 0,
        ).fill(null)
        this.showResults = false
        this.score = 0
      },
      selectAnswer(qIndex, oIndex) {
        this.userAnswers[qIndex] = oIndex
      },
      checkAnswers() {
        this.score = this.selectedStory.questions.reduce((acc, q, idx) => {
          return acc + (q.answer === this.userAnswers[idx] ? 1 : 0)
        }, 0)
        this.showResults = true
      },
    },
  }
</script>

<style scoped>
  .reading-explorer {
    text-align: center;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    padding: 20px;
    background: linear-gradient(135deg, #c2f0f0, #f7f6c5);
  }

  .reading-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 15px;
    margin-top: 20px;
  }

  .reading-card {
    background: #fff8e7;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .reading-card:hover {
    transform: scale(1.05) rotate(-2deg);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }

  .story-emoji {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .story-detail-card {
    margin-top: 25px;
    background: #fffbea;
    padding: 20px;
    border-radius: 25px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    text-align: left;
    animation: pop 0.4s ease;
  }

  .story-detail-card .big {
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

  .quiz-list {
    list-style: none;
    padding-left: 0;
    margin-top: 15px;
  }

  .quiz-item {
    margin-bottom: 15px;
  }

  .quiz-item ul {
    list-style: none;
    padding-left: 0;
  }

  .quiz-item li {
    padding: 5px 10px;
    border-radius: 10px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: 0.2s;
    background: #f0f0f0;
  }

  .quiz-item li.selected {
    background: #ffd70066;
  }

  .quiz-item li.correct {
    background: #8bf58b66;
  }

  .quiz-item li.wrong {
    background: #f58b8b66;
  }

  .check-btn {
    padding: 8px 15px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    background: #4caf50;
    color: white;
    font-size: 1rem;
    margin-top: 10px;
  }

  .score {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: bold;
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
