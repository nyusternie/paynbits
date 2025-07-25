/**
 * Search Box
 *
 * A universal search box with geo-location (proximity) results.
 */
export default class SearchBox {
    onAdd(_map) {
        /* Set map. */
        this._map = _map

        this._isTyping = false

        /* Set div container. */
        this._container = document.createElement('div')

        /* Add control class. */
        // NOTE: Required for events.
        this._container.className = 'mapboxgl-ctrl'

        const search = document.createElement('input')

        /* Add Tailwind styling. */
        search.classList.add('search-box') // NOTE: Using a CSS class.
        search.classList.add('w-64')
        search.classList.add('sm:w-96')
        search.classList.add('h-10')
        search.classList.add('px-3')
        search.classList.add('py-5')
        search.classList.add('border-2')
        search.classList.add('border-sky-600')
        search.classList.add('bg-gradient-to-r')
        search.classList.add('from-sky-700')
        search.classList.add('to-sky-800')
        search.classList.add('text-lg')
        search.classList.add('font-bold')
        search.classList.add('text-gray-200')
        search.classList.add('rounded-xl')
        search.classList.add('shadow-lg')
        search.placeholder='What would you like to PaynBits?'
        this._container.appendChild(search)

        /* Initialize search results. */
        const searchResults = document.createElement('div')
        searchResults.setAttribute('id','search-results')
        searchResults.style.visibility = 'hidden'
        searchResults.classList.add('mt-1')
        searchResults.classList.add('w-64')
        searchResults.classList.add('sm:w-96')
        searchResults.classList.add('px-3')
        searchResults.classList.add('py-2')
        searchResults.classList.add('border-2')
        searchResults.classList.add('border-gray-400')
        searchResults.classList.add('bg-gradient-to-r')
        searchResults.classList.add('from-gray-200')
        searchResults.classList.add('to-gray-100')
        searchResults.classList.add('rounded-xl')
        searchResults.classList.add('shadow-lg')
        this._container.appendChild(searchResults)

        /* Handle user input. */
        // TODO: Handle pasted text (via keyboard & mouse).
        search.addEventListener('keyup', (_evt) => {
            // console.log('WHAT KEY', search.value, _evt)
            clearTimeout(this._isTyping)

            const searchResults = document.getElementById('search-results')
            searchResults.style.visibility = 'hidden'
            searchResults.innerHTML = ''

            if (_evt.keyCode === 27) {
                /* Clear search box. */
                return search.value = ''
            }

            if (_evt.keyCode === 13) {
                // console.log('SEARCH FOR', search.value)

                if (!search.value || search.value.length === 0) {
                    return alert(`I can't read your mind.\nYou MUST enter a search term to continue.`)
                }

                if (search.value.length < 3) {
                    return alert(`Oops! [ ${search.value} ] won't do.\nPlease enter a least 3 characters to begin searching.`)
                }

                /* Search map. */
                searchMap(search.value, this.vue)

                /* Clear search box. */
                return search.value = ''
            }

            if (search.value && search.value.length >= 3) {
                /* Handle user input delay. */
                this._isTyping = setTimeout(() => {
                    // console.log('SEARCH FOR', search.value)

                    /* Search map. */
                    searchMap(search.value, this.vue)
                }, USER_INPUT_DELAY)
            }
        })

        return this._container
    }

    onRemove(){
        this._container.parentNode.removeChild(this._container)
        this._map = undefined
    }
}
