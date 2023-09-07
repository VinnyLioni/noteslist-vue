import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { 
    getDocs, 
    collection, 
    onSnapshot, 
    setDoc, 
    addDoc,
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    orderBy 
} from 'firebase/firestore';
import { db } from '../js/firebase';
import { useAuthStore } from './AuthStore';

export const useNotesStore = defineStore('notesStore', () => {
  const notes = ref([]);
  const notesLoaded = ref(false)

  const authStore = useAuthStore()
  let notesCollectionRef
  let notesCollectionQuery
  let notesSnapshot = null


  const getNoteContentById = computed(() => {
    return (id) => {
      return notes.value.find((note) => note.id === id).content;
    };
  });

  const getNotes = async () => {
    console.log(authStore.user.uid)
    notesCollectionRef = collection(db, 'users', authStore.user.uid, 'notes');
    notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));
    // const querySnapshot = await getDocs(collection(db, 'notes'));
    // querySnapshot.forEach((doc) => {
    //   let note = {
    //     id: doc.id,
    //     content: doc.data().content
    //   };
    //   notes.value.push(note);
    // });

    notesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let notesData = [];
      notesLoaded.value=false
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        };
        notesData.push(note);
      });

      notes.value = notesData;
      notesLoaded.value=true
      console.log(notes.value)
    });
  };

  const clearNotes = () => {
    notes.value=[]
    if (notesSnapshot) notesSnapshot()
  }

  const totalNotesCount = computed(() => {
    return notes.value.length;
  });

  const totalCharactersCount = computed(() => {
    let count = 0;
    for (let note of notes.value) {
      count += note.content.length;
    }
    return count;
  });

  const addNote = async (noteContent) => {
    const currentDate = new Date().getTime().toString();

    await addDoc(notesCollectionRef, { content: noteContent, date: currentDate });
  };

  const deleteNote = async (noteId) => {
    await deleteDoc(doc(notesCollectionRef, noteId));
  };

  const updateNote = async (id, content) => {
    await updateDoc(doc(notesCollectionRef, id), {
      content
    });
  };

  return {
    notes,
    updateNote,
    getNoteContentById,
    addNote,
    deleteNote,
    totalCharactersCount,
    totalNotesCount,
    getNotes,
    notesLoaded,
    clearNotes
  };
});