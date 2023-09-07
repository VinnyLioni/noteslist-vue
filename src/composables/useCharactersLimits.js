import { watch } from 'vue'

export function userCharactersLimit(value, limit = 100){
    watch(value, (newValue, oldValue) => {
        if (newValue.length === limit) {
            alert(`Sorry, only ${limit} characters are allowed`)
        }
    })
}