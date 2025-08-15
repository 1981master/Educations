<template>
  <div id="app" class="app-container">
    <header>
      {{ user }} Grade {{ grade }} Dashboard
    </header>

    <main>
      <nav>
        <a href="#">&#128508; Fifth Grade</a>
        <a href="#">Fourth Grade</a>
        <a href="#">Third Grade</a>
        <a href="#">Second Grade</a>
        <a href="#">&#128640; First Grade</a>
      </nav>

      <div class="content-area">
        <Card :footer="false" :hoverable="true" :width="700">
          <TableComponent
            :headers="[
              { label: 'Name', field: 'name', width: 150 },
              { label: 'Age', field: 'age', width: 50, align: 'center' },
              { label: 'City', field: 'city', width: 100 },
              { label: 'Test', field: 'Test', width: 100 }
            ]"
            :data="tableData"
            :footer="true"
            :footerData="{ name: 'Total', age: 0, city: '' }"
            :border="true"
          />
        </Card>
        <Card  :footer="false" :hoverable="true" :width="700">
           <TextBoxComponent
  v-model="name"
  label="Enter your name"
  labelPosition="left"
  width="300"
  height="35"
  maxLength="50"
  :border="true"
  borderColor="#128052"
  placeholder="Here..."
/>

        </Card>
      </div>
    </main>

    <footer>
      &copy; 2025 Master Learning &trade;. All rights reserved.
    </footer>
  </div>
</template>

<script>
import BtnComponent from './components/BtnComponent.vue';
import Card from './components/Card.vue';
import CheckboxList from './components/CheckboxList.vue';
import GradeFive from './components/GradeFive.vue';
import RadioList from './components/RadioList.vue';
import TableComponent from './components/TableComponent.vue';
import TextBoxComponent from './components/TextBoxComponent.vue';

export default {
  name: 'App',
  components: {
    GradeFive,
    Card,
    CheckboxList,
    RadioList,
    BtnComponent,
    TableComponent,
    TextBoxComponent,
  },
  data() {
    return {
      user: "User",
      grade: "Five",
      textValue:"",
      tableData: [
        { name: "Alice", age: 25, city: "New York", Test: "Test Data" },
        { name: "Bob", age: 30, city: "Los Angeles", Test: "Test Data" },
        { name: "Charlie", age: 22, city: "Chicago", Test: "Test Data" },
        { name: "Diana", age: 28, city: "Houston", Test: "Test Data" },
        { name: "Ethan", age: 35, city: "Phoenix", Test: "Test Data" },
        { name: "Fiona", age: 27, city: "Philadelphia", Test: "Test Data" }
      ],
    };
  }
};
</script>

<style>
/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: Arial, sans-serif;
}

/* Flex container to push footer down */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
header {
  background-color: #0bbb98;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
}

/* Main container */
main {
  flex: 1; /* take remaining space */
  display: flex;
  min-height: 0;
}

/* Sidebar */
nav {
  width: 20%;
  background-color: #6fd2be;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 0;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: block;
  transition: background 0.2s;
}

nav a:hover {
  background-color: #06977a;
  color: #fff;
}

/* Content area */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: auto;
}

/* Footer */
footer {
  background-color: #0bbb98;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 16px;
  margin-top: auto; /* push footer to bottom */
}

/* Responsive */
@media (max-width: 768px) {
  main {
    flex-direction: row;
  }
  nav {
    width: 180px;
  }
}
</style>

