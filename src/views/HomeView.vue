<script setup lang="ts">
import { fetchPosts } from '@/apis/testApi/testService'

const data = async () => {
  const data = await fetchPosts()

  console.log(data)
}

data()
</script>

<template>
  <main>Home</main>
</template>
