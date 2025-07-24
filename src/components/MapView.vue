<template>
    <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const mapContainer = ref()

const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        /* Set latitude. */
        const latitude = position.coords.latitude

        /* Set longitude. */
        const longitude = position.coords.longitude

        /* Set altitude. */
        const altitude = position.coords.altitude

        /* Set accuracy. */
        const accuracy = position.coords.accuracy

        /* Set altitude accuracy. */
        const altitudeAccuracy = position.coords.altitudeAccuracy

        /* Set heading. */
        const heading = position.coords.height

        /* Set speed. */
        const speed = position.coords.speed

        /* Set timestamp. */
        const timestamp = position.timestamp

        console.info(
            'Latitude', latitude,
            'Longitude', longitude,
            'Altitude', altitude,
            'Accuracy', accuracy,
            'Altitude Accuracy', altitudeAccuracy,
            'Heading', heading,
            'Speed', speed,
            'Timestamp', timestamp,
        )

        /* Set geo(-location) position. */
        initMap(latitude, longitude)
        // this.geoPos = latitude + ',' + longitude
    })
}

const initMap = (_latitude, _longitude) => {
    /* (Public) Access Token */
    // TODO Set as ENV VAR.
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG91c2VvZnNkb3QiLCJhIjoiY21kaGkxcmtxMDIxMjJscTBoMzl5MWh3cCJ9.y1NqKJHxhdwKe65ClzWRMw'

    /* Initialize map. */
    const map = new mapboxgl.Map({
        container: mapContainer.value ?? '',
        // style: 'mapbox://styles/mapbox/streets-v12',
        style: 'mapbox://styles/mapbox/standard',
        center: [_longitude, _latitude],
        zoom: 13
    })

    /* Add (geolocate) control. */
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
        })
    )
}

onMounted(() => {
    // Midtown, Atlanta -84.38, 33.76
    // initMap(-84.38, 33.76)

    /* Request (user/device) location. */
    requestLocation()

})
</script>
