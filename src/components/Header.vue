<template>
    <header class="w-full h-[60px] p-2 flex flex-row gap-3 justify-between bg-slate-900 overflow-hidden">
        <div class="w-full h-full flex justify-center items-center border border-amber-300/70 rounded-lg">
            <h1 class="inline-flex items-center gap-2 text-amber-300 font-bold text-2xl tracking-widest">
                PaynBits
            </h1>
        </div>

        <a href="/notif">
            <svg class="h-full p-2 bg-stone-300 text-stone-700 font-bold text-lg rounded-full tracking-wider hover:text-stone-200 hover:bg-stone-700" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
            </svg>
        </a>

        <a href="/profile">
            <img v-if="pfpUrl" :src="pfpUrl" class="h-full w-[60px] object-cover rounded-full border-2 border-stone-300 hover:border-amber-300" />
            <svg v-else class="h-full p-2 bg-stone-300 text-stone-700 font-bold text-lg rounded-full tracking-wider hover:text-stone-200 hover:bg-stone-700" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
            </svg>
        </a>
    </header>
</template>

<script setup lang="ts">
/* Import modules. */
import { onMounted, ref } from 'vue'
import { sdk } from '@farcaster/miniapp-sdk'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const pfpUrl = ref()

// const init = async () => {
//     /* Request Mini App flag. */
//     // TODO Maybe we set a SESSION flag??
//     const isMiniApp = await sdk.isInMiniApp()

//     /* Validate mini app. */
//     if (isMiniApp) {
//         /* Request user. */
//         const { user } = await sdk.context

//         /* Validate user. */
//         if (typeof user !== 'undefined' && user !== null) {
//             pfpUrl.value = user.pfpUrl
//         }
//     }
// }

onMounted(() => {
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
