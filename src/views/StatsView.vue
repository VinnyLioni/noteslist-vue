<template>
    <div class="mt-3">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Total Notes Count</td>
                    <td>{{ notesCount }}</td>
                </tr>
                <tr>
                    <td>Total Characters Count</td>
                    <td>{{ totalCharactersCount }}</td>
                </tr>
            </tbody>
        </table>

        <input type="text" class="input" placeholder="Enter Feedback..." v-autofocus v-model="feedback">
    </div>
</template>

<script setup>
    import { useNotesStore } from '../store/NoteStore';
    import { vAutofocus } from '../directives/vAutoFocus'
    import { userCharactersLimit } from '../composables/useCharactersLimits';
    import { ref } from 'vue'

    const NoteStore = useNotesStore()
    const feedback = ref('')

    const notesCount = NoteStore.totalNotesCount
    const totalCharactersCount = NoteStore.totalCharactersCount

    userCharactersLimit(feedback, 50)
</script>