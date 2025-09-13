<template>
  <div class="table-wrapper" :style="tableStyles">
    <table :class="['custom-table', { 'table-border': border }]">
      <!-- Header -->
      <thead>
        <tr>
          <th
            v-for="(col, index) in headers"
            :key="index"
            :style="{
              width: col.width ? col.width + 'px' : 'auto',
              textAlign: col.align || 'left',
            }"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          :class="rowIndex % 2 === 0 ? 'row-even' : 'row-odd'"
        >
          <td
            v-for="(col, colIndex) in headers"
            :key="colIndex"
            :style="{
              width: col.width ? col.width + 'px' : 'auto',
              textAlign: col.align || 'left',
            }"
          >
            {{ row[col.field] }}
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="headers.length"
            style="text-align: center; padding: 10px"
          >
            No data available
          </td>
        </tr>
      </tbody>

      <!-- Footer -->
      <tfoot v-if="footer && footerData">
        <tr>
          <td v-for="(col, index) in headers" :key="index">
            {{ footerData[col.field] || '' }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'TableComponent',
    props: {
      headers: { type: Array, required: true },
      data: { type: Array, required: true },
      footer: { type: Boolean, default: false },
      footerData: { type: Object, default: () => ({}) },
      border: { type: Boolean, default: true },
      borderRadius: { type: Number, default: 8 },
      evenRowColor: { type: String, default: '#f9f9f9' },
      oddRowColor: { type: String, default: '#ffffff' },
      hoverColor: { type: String, default: '#e0e0e0' },
    },
    computed: {
      tableStyles() {
        return {
          '--even-color': this.evenRowColor,
          '--odd-color': this.oddRowColor,
          '--hover-color': this.hoverColor,
          '--border-radius': this.borderRadius + 'px',
        }
      },
    },
  }
</script>

<style scoped>
  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-family: Arial, sans-serif;
    overflow: hidden;
    border-radius: var(--border-radius);
  }

  .table-border th,
  .table-border td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  thead th {
    background-color: #0bbb98;
    color: white;
    font-weight: bold;
    padding: 10px;
  }

  tfoot td {
    background-color: #f5f5f5;
    font-weight: bold;
    padding: 10px;
  }

  .row-even {
    background-color: var(--even-color);
  }
  .row-odd {
    background-color: var(--odd-color);
  }

  tbody tr:hover {
    background-color: var(--hover-color) !important;
  }
</style>
