<template>
  <div
    class="file-upload-wrapper"
    :style="{ width: width + 'px', borderColor: borderColor }"
  >
    <!-- Upload button -->
    <label
      :for="id"
      class="file-label"
      :style="{ backgroundColor: color, padding: size + 'px' }"
    >
      {{ label }}
      <input
        type="file"
        :id="id"
        class="file-input"
        @change="handleFileChange"
        :multiple="multiple"
      />
    </label>

    <!-- Selected files list -->
    <ul v-if="fileList.length" class="file-list">
      <li v-for="(file, index) in fileList" :key="index" class="file-item">
        {{ file.name }}
        <button type="button" @click="removeFile(index)" class="remove-btn">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'FileUploadComponent',
    props: {
      modelValue: { type: Array, default: () => [] },
      label: { type: String, default: 'Upload File' },
      color: { type: String, default: '#0bbb98' },
      borderColor: { type: String, default: '#0bbb98' },
      width: { type: Number, default: 300 },
      size: { type: Number, default: 12 },
      multiple: { type: Boolean, default: false },
      id: { type: String, default: 'file-upload' },
    },
    data() {
      return {
        fileList: [...this.modelValue], // local copy of files
      }
    },
    watch: {
      modelValue(val) {
        this.fileList = [...val]
      },
    },
    methods: {
      handleFileChange(event) {
        const files = Array.from(event.target.files)
        if (this.multiple) {
          this.fileList.push(...files)
        } else {
          this.fileList = files
        }
        this.$emit('update:modelValue', this.fileList)
        event.target.value = null // reset input so same file can be selected again
      },
      removeFile(index) {
        this.fileList.splice(index, 1)
        this.$emit('update:modelValue', this.fileList)
      },
    },
  }
</script>

<style scoped>
  .file-upload-wrapper {
    display: flex;
    flex-direction: column;
    border: 2px dashed;
    border-radius: 6px;
    padding: 10px;
    text-align: center;
  }

  .file-label {
    display: inline-block;
    cursor: pointer;
    color: white;
    font-weight: bold;
    border-radius: 4px;
  }

  .file-input {
    display: none;
  }

  /* File list styling */
  .file-list {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f0f0f0;
    padding: 6px 10px;
    margin-bottom: 5px;
    border-radius: 4px;
  }

  .remove-btn {
    background: #ff4d4f;
    border: none;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    line-height: 16px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
