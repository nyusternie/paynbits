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

/**
 * Side Panel Menu Button
 *
 * Used to toggle the sliding side panel.
 */
class SidePanelMenuBtn {
    onAdd(_map) {
        /* Set map. */
        this._map = _map

        /* Set div container. */
        this._container = document.createElement('div')

        /* Add control class. */
        // NOTE: Required for events.
        this._container.className = 'mapboxgl-ctrl'

        // this._container.textContent = 'Click me!'
        // this._container.onclick = () => {
        //     alert('Button clicked!')
        // }
        // return this._container

        const img = document.createElement('img')
        img.src = 'https://paynbits.app/menu-solid.png'
        this._container.appendChild(img)

        /* Add Tailwind styling. */
        this._container.classList.add('w-12')
        this._container.classList.add('px-2')
        this._container.classList.add('py-2')
        this._container.classList.add('border-2')
        this._container.classList.add('border-cyan-800')
        this._container.classList.add('bg-cyan-600')
        this._container.classList.add('text-xl')
        // this._container.classList.add('text-pink-500')
        this._container.classList.add('rounded-xl')
        this._container.classList.add('shadow-lg')
        this._container.classList.add('cursor-pointer')

        this._container.onclick = () => {
            alert('Button clicked!')
        }

        this._container.addEventListener('mouseover', () => {
            this._container.classList.remove('bg-pink-200')
            this._container.classList.add('bg-yellow-500')

            this._container.classList.add('font-bold')
        })

        this._container.addEventListener('mouseout', () => {
            this._container.classList.remove('bg-yellow-500')
            this._container.classList.add('bg-pink-200')

            this._container.classList.remove('font-bold')
        })

        return this._container
    }

    onRemove(){
        this._container.parentNode.removeChild(this._container)
        this._map = undefined
    }
}

const initMap = (_latitude, _longitude) => {
    /* (Public) Access Token */
    // TODO Set as ENV VAR.
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG91c2VvZnNkb3QiLCJhIjoiY21kaGkxcmtxMDIxMjJscTBoMzl5MWh3cCJ9.y1NqKJHxhdwKe65ClzWRMw'

    /* Define map config. */
    const config = {
        container: mapContainer.value ?? '',
        // style: 'mapbox://styles/mapbox/streets-v12',
        style: 'mapbox://styles/mapbox/standard',
        center: [_longitude, _latitude],
        zoom: 13
    }

    /* Initialize map object. */
    const map = new mapboxgl.Map(config)

    /* Add full screen control. */
    map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')

    const showCompass = true
    const showZoom = true
    const visualizePitch = false

    /* Add navigation control. */
    map.addControl(
        new mapboxgl.NavigationControl({
            showCompass, showZoom, visualizePitch }), 'bottom-right')

    const enableHighAccuracy = true
    const positionOptions = { enableHighAccuracy }
    const trackUserLocation = true
    const showUserHeading = true

    /* Add (geolocate) control. */
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions,
            trackUserLocation,
            showUserHeading }), 'bottom-right')

    // // Add a default marker at specific coordinates
    // const marker = new mapboxgl.Marker()
    //     .setLngLat([_longitude, _latitude])
    //     .addTo(map)

    /* Add side panel menu button. */
    map.addControl(new SidePanelMenuBtn(), 'top-right')

    map.on('load', () => {
        map.addSource('listings', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            description: '<strong>Make it Mount Pleasant</strong><p>Handmade and vintage market.</p>'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [_longitude, _latitude]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            description: '<strong>Altenrative for testing ONL!</p>'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [_longitude+0.01, _latitude+0.01]
                        }
                    }
                ]
            }
        })

        map.addLayer({
            id: 'listings',
            type: 'circle',
            source: 'listings',
            paint: {
                'circle-color': '#fc00e4',
                'circle-radius': 10,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        })

        // Show popup on click
        map.on('click', 'listings', (e) => {
            const coordinates = e.features![0].geometry.coordinates.slice()
            const description = e.features![0].properties!.description

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map)
        })

        // Change cursor to pointer on hover
        map.on('mouseenter', 'listings', () => {
            map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'listings', () => {
            map.getCanvas().style.cursor = ''
        })
    })
}

onMounted(() => {
    // Midtown, Atlanta -84.38, 33.76
    // initMap(-84.38, 33.76)

    /* Request (user/device) location. */
    requestLocation()

})
</script>
