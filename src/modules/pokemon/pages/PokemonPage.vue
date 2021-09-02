<template>
    <h1>Pokemon: <span>#{{ id }}</span></h1>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    created() {
        //console.log( this.$route )
    }
}
</script>