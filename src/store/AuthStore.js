import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../js/firebase'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useNotesStore } from './NoteStore';

export const useAuthStore = defineStore('authStore', () => {

    const user = ref({})

    const router = useRouter()

    const noteStore = useNotesStore()

    const init = () => {
        onAuthStateChanged(auth, (userDetails) => {
            if (userDetails) {
              const uid = userDetails.uid;
              user.value = {email: userDetails.email, uid}
              router.push({ name: 'notes'})
              noteStore.getNotes()
              // ...
            } else {
                user.value = {}
                router.replace({ name: 'auth'})
                noteStore.clearNotes()
            }
          });
    }

    const registerUser = (credentials) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
            console.log(error.message)
          // ..
        });
    }

    const loginUser = (credentials) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            console.log(error.message)
        });
    }

    const logoutUser = () => {
        signOut(auth).then(() => {
            console.log('logged out')
        }).catch((error) => {
            // An error happened.
          });
    }

    return {
        registerUser,
        loginUser,
        logoutUser,
        init,
        user
    }
})