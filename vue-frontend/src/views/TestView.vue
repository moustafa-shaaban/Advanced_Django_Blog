<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue';
import axios from "axios"
import { Notify, Dialog, Cookies } from 'quasar';

const data = ref([])

const name = ref('')
const address = ref('')

async function getData() {
    const response = await axios({
        url: "http://localhost:8000/graphql/",
        method: 'post',
        withCredentials: true,
        timeout: 4000,
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        },
        data: {
            query: `
    query ReturnAllPosts {
                allPosts {
                    id
                    slug
                    title
                    author {
                    username
                    avatar
                    }
                    favorites {
                    username
                    }
                    likes {
                    username
                    }
                    content
                    updatedAt
                    publishedAt
                    comments {
                    id
                    comment
                    publishedAt
                    user {
                        username
                    }
                    }
                    tag {
                    id
                    name
                    }
                }
                }
`
        }
    })

    console.log(response.data.data.allPosts)
    data.value = response.data.data
}



getData()


console.log(data.value)


const { mutate: createRestaurant } = useMutation(gql`
    mutation createRestaurant($name: String!, $address: String!) {
  createRestaurant(name: $name, address: $address) {
    ok
    restaurant {
        id
        name
        address
    }
  }
}
`, () => ({
    variables: {
        name: name.value,
        address: address.value,
    },
}))
</script>

<template>
    <div>
        <div>Loading...</div>
        <div>Error:</div>
        <ul v-if="data && data.allPosts">
            <li v-for="restaurant in data.allPosts" :key="restaurant.id">
                {{ restaurant.title }} - {{ restaurant.address }}
            </li>
        </ul>
    </div>

    <input v-model="name" placeholder="Enter name">
    <input v-model="address" placeholder="Enter address">

    <button @click="createRestaurant()">
        Send message
    </button>
</template>