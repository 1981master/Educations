<template>
  <div class="profile">
    <h1>Profile Page</h1>
    <p>Welcome to your profile, Enter/Update your info below:</p>

    <!-- Card with student fields -->
    <CardComponent :title="titleText" :width="600">
      <div class="form-fields">
        <!-- Date Picker for Date of Birth -->
        <DatePickerComponent
          v-model="selectedStudent.dateOfBirth"
          label="Date of Birth"
          :width="200"
          :height="35"
          :fontSize="12"
          color="#0bbb98"
          id="dob"
          placeholder="YYYY-MM-DD"
        />

        <TextBoxComponent
          v-model="selectedStudent.firstName"
          label="First Name"
          size="small"
          :width="200"
          placeholder="Enter first name"
        />
        <TextBoxComponent
          v-model="selectedStudent.lastName"
          label="Last Name"
          size="small"
          :width="200"
          placeholder="Enter last name"
        />
        <TextBoxComponent
          v-model="selectedStudent.parentContactInfo"
          label="Parent Contact Info"
          size="small"
          :width="300"
          placeholder="Enter parent contact info"
        />
        <SelectComponent
          v-model="selectedStudent.grade"
          :options="gradeOptions"
          label="Grade"
          :width="150"
        />
      </div>
      <button @click="saveStudent">Save</button>
    </CardComponent>

    <!-- Student Table -->
    <TableComponent
      :headers="headers"
      :data="students"
      :border="true"
      :borderRadius="10"
    />

    <div class="details">
      <h3>User Details</h3>
    </div>
  </div>
</template>

<script>
  import dateMixin from '@/mixins/dateMixin'
  import CardComponent from '../Card.vue'
  import DatePickerComponent from '../DatePickerComponent.vue'
  import SelectComponent from '../SelectComponent.vue'
  import TableComponent from '../TableComponent.vue'
  import TextBoxComponent from '../TextBoxComponent.vue'

  export default {
    name: 'Profile',
    components: {
      CardComponent,
      TableComponent,
      TextBoxComponent,
      DatePickerComponent,
      SelectComponent,
    },
    mixins: [dateMixin],
    data() {
      return {
        titleText: 'Profile',
        user: {
          name: 'Your Name here...',
          email: 'john@example.com',
          joined: '2024-01-01',
        },
        headers: [
          { label: 'ID', field: 'id', width: 60, align: 'center' },
          { label: 'Date of Birth', field: 'dateOfBirth', width: 120 },
          { label: 'First Name', field: 'firstName', width: 120 },
          { label: 'Last Name', field: 'lastName', width: 120 },
          {
            label: 'Parent Contact Info',
            field: 'parentContactInfo',
            width: 200,
          },
          { label: 'Grade', field: 'grade', width: 80 },
        ],
        students: [], // fetch from backend
        selectedStudent: {
          dateOfBirth: '',
          firstName: '',
          lastName: '',
          parentContactInfo: '',
          grade: '',
        },
        gradeOptions: [
          { label: 'Kindergarten', value: 'K' },
          { label: 'First Grade', value: '1' },
          { label: 'Second Grade', value: '2' },
          { label: 'Third Grade', value: '3' },
          { label: 'Fourth Grade', value: '4' },
          { label: 'Fifth Grade', value: '5' },
          { label: 'Sixth Grade', value: '6' },
        ],
      }
    },
    mounted() {
      this.fetchStudents()
    },
    methods: {
      async fetchStudents() {
        try {
          const response = await fetch('http://localhost:8080/api/getStudents')
          if (!response.ok) {
            const text = await response.text()
            throw new Error(`HTTP ${response.status}: ${text}`)
          }
          const data = await response.json()
          console.log('------------------------------ studendnt;    ', data)

          // map backend studentId to frontend id
          this.students = data.map((student) => ({
            id: student.studentId,
            dateOfBirth: student.dateOfBirth,
            firstName: student.firstName,
            lastName: student.lastName,
            parentContactInfo: student.parentContactInfo,
            grade: student.grade,
          }))
        } catch (err) {
          console.error('Error fetching students:', err)
        }
      },
      async saveStudent() {
        try {
          const studentToSave = {
            ...this.selectedStudent,
            dateOfBirth: this.toISODate(this.selectedStudent.dateOfBirth),
          }
          const response = await fetch('http://localhost:8080/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentToSave),
          })

          if (!response.ok) {
            const text = await response.text()
            throw new Error(`HTTP ${response.status}: ${text}`)
          }

          const savedStudent = await response.json()
          console.log('++++++++++++++++++++++    ', savedStudent)
          this.students.push({
            id: savedStudent.id,
            dateOfBirth: savedStudent.dateOfBirth,
            firstName: savedStudent.firstName,
            lastName: savedStudent.lastName,
            parentContactInfo: savedStudent.parentContactInfo,
            grade: savedStudent.grade,
          })

          // Reset form
          this.selectedStudent = {
            dateOfBirth: '',
            firstName: '',
            lastName: '',
            parentContactInfo: '',
            grade: '',
          }
        } catch (err) {
          console.error('Error saving student:', err)
        }
      },
    },
  }
</script>

<style scoped>
  .profile {
    padding: 2rem;
  }

  /* Form fields inside card */
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  /* Save button styling */
  button {
    padding: 6px 12px;
    border: none;
    background: #0bbb98;
    color: white;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background: #099f80;
  }
</style>
