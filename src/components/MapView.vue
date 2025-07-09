<template>
    <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref(null)

onMounted(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG91c2VvZnNkb3QiLCJhIjoiUFVIX1VLayJ9.2NVTq3ewktsyDNM8lBRtxQ'

    new mapboxgl.Map({
        container: mapContainer.value,
        // container: 'mapContainer',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
    })
})
</script>
