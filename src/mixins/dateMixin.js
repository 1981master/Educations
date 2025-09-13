export default {
  methods: {
    /**
     * Convert a Date object or date string to ISO format: YYYY-MM-DD
     * @param {Date|string} date
     * @returns {string} ISO formatted date
     */
    toISODate(date) {
      if (!date) return ''
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
}
