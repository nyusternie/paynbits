<template>
    <div ref="mapContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

/* Import classes. */
import SearchBox from './ui/SearchBox.js'

const mapContainer = ref()

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaG91c2VvZnNkb3QiLCJhIjoiY21kaGkxcmtxMDIxMjJscTBoMzl5MWh3cCJ9.y1NqKJHxhdwKe65ClzWRMw' // production
const API_ENDPOINT = `https://paynbits.app/v1`
const USER_INPUT_DELAY = 500 // 0.5 seconds

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
 * Search Map
 *
 * Searches all merchants and venues, based on user input.
 */
const searchMap = async (_term, _vue) => {
    console.log('SEARCHING FOR', _term)
    const searchResults = document.getElementById('search-results')

    // let target
    let result
    let venues

    result = await fetch(`${API_ENDPOINT}/search/autocomplete/${_term}`)
        .catch(err => console.error(err))

    result = await result.json()
    console.log('AUTOCOMPLETE (result):', result)

    venues = [
        ...result.coinmap,
        ...result.merchants,
    ]
    console.log('VENUES', venues)

    let html = ''
    let count = 0

    html += `<div class="py-2 flex flex-col">`
    venues.forEach(_venue => {
        if (count++ >= 5) return

        html += `
        <div id='${_venue.id}' javascript:alert('${_venue.value}') class="flex flex-row my-1 px-3 py-1 bg-yellow-100 border-2 border-yellow-300 rounded-lg cursor-pointer">
            <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>

            <span class="ml-2 text-lg font-medium truncate">
                ${_venue.value}
            </span>
        </div>
        `
    })
    html += `</div>`

    searchResults.innerHTML = html
    searchResults.style.visibility = 'visible'

    count = 0

    venues.forEach(_venue => {
        if (count++ >= 5) return

        document.getElementById(_venue.id).addEventListener('click', () => {
            _vue.$emit('openPopup', _venue.id)
        })
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
        img.src = 'https://paynbits.app/menu.png'
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
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN

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

    /* Add side panel menu button. */
    map.addControl(new SidePanelMenuBtn(), 'top-right')

    /* Add search box. */
    map.addControl(new SearchBox(), 'top-left')

    /* Handle map movement. */
    // map.on('moveend', () => {
    //     /* Manage map. */
    //     mapManager()
    // })

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
