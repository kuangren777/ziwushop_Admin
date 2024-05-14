<template>
  <QuillEditor ref="editor" toolbar="full" theme="snow" @update:content="updateContent"/>
</template>

<script setup>
import {ref, defineEmits } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const editor = ref();
const emit = defineEmits(["backContent"]);

const updateContent = ()=>{
	// console.log(e);
	emit("backContent",editor.value.getHTML());
	// model.value.details =  editor.value.getHTML()
	// console.log(editor.value.getHTML());
};

</script>

<style scoped>

</style>