<template>
  <div class="table-wrapper">
    <table 
      :class="['custom-table', { 'table-border': border }]" 
      :style="{ borderRadius: borderRadius + 'px' }"
    >
      <!-- Header -->
      <thead>
        <tr>
          <th 
            v-for="(col, index) in headers" 
            :key="index" 
            :style="{ width: col.width ? col.width + 'px' : 'auto', textAlign: col.align || 'left' }"
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
            :style="{ width: col.width ? col.width + 'px' : 'auto', textAlign: col.align || 'left' }"
          >
            {{ row[col.field] }}
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
  name: "TableComponent",
  props: {
    headers: { type: Array, required: true }, // [{label:'Name', field:'name', width:100, align:'center'}]
    data: { type: Array, required: true },
    footer: { type: Boolean, default: false },
    footerData: { type: Object, default: () => ({}) },
    border: { type: Boolean, default: true },
    borderRadius: { type: Number, default: 8 },
    evenRowColor: { type: String, default: '#f9f9f9' },
    oddRowColor: { type: String, default: '#ffffff' },
    hoverColor: { type: String, default: '#e0e0e0' }
  }
};
</script>

<style scoped>
.table-wrapper {
  --even-color: #f9f9f9;
  --odd-color: #ffffff;
  --hover-color: #e0e0e0;
}

.custom-table {
  width: 100%;
  border-collapse: separate; /* allow border-radius */
  border-spacing: 0;
  font-family: Arial, sans-serif;
  overflow: hidden;
  border-radius: var(--border-radius, 8px);
}

/* Table borders */
.table-border th, .table-border td {
  border: 1px solid #ddd;
  padding: 8px;
}

/* Header */
thead th {
  background-color: #0bbb98;
  color: white;
  font-weight: bold;
  padding: 10px;
}

/* Footer */
tfoot td {
  background-color: #f5f5f5;
  font-weight: bold;
  padding: 10px;
}

/* Row colors */
.row-even {
  background-color: var(--even-color);
}
.row-odd {
  background-color: var(--odd-color);
}

/* Row hover */
tbody tr:hover {
  background-color: var(--hover-color) !important;
}
</style>

