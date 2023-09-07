<template>
    <AddEditNote v-model="newNote" ref="addEditNoteRef" >
        <template #button>
            <button 
                @click.prevent="addNote"
                :disabled="!newNote"
                class="button is-link is-danger">Add New Note
            </button>
        </template>
    </AddEditNote>

    <progress class="progress is-large is-info" max="100" v-if="!noteStore.notesLoaded"/>

    <template v-else>
        <SingleNote 
        v-for="note in notes" 
        :key="note.id" 
        :note="note"
        />
    </template>

    <div class="has-text-centered py-6 is-size-4 has-text-grey-light is-family-monospace" v-if="!notes.length && noteStore.notesLoaded">No Notes Added Here yet</div>

</template>

<script setup>
import SingleNote from '../components/notes/SingleNote.vue'
import AddEditNote from '../components/notes/AddEditNote.vue'
import { ref,watch,onMounted } from 'vue'
import { useNotesStore } from '../store/NoteStore'
import { storeToRefs } from 'pinia'
import { userCharactersLimit } from '../composables/useCharactersLimits'

const noteStore = useNotesStore()

const addEditNoteRef = ref(null)

const {notes} = storeToRefs(noteStore)


const newNote = ref('')

const addNote = () => {
    noteStore.addNote(newNote.value)
    newNote.value=''
    addEditNoteRef.value.focusTextArea()
}

userCharactersLimit(newNote, 100)


</script>