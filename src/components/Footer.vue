<template>
    <footer class="w-full h-[45px] grid grid-cols-2 gap-0.5 justify-between bg-slate-900 border border-t-stone-700 overflow-hidden">
        <a href="/map" @click="addHaptic()" class="group w-full flex flex-col justify-center items-center bg-stone-700 hover:bg-stone-200">
            <MapIcon class="mt-0.5 size-5 text-fuchsia-100 font-bold text-lg tracking-wider uppercase group-hover:text-fuchsia-900" />
            <span class="uppercase text-xs font-medium text-fuchsia-300 tracking-wider group-hover:text-fuchsia-900">map</span>
        </a>

        <a href="/" @click="addHaptic()" class="group w-full flex flex-col justify-center items-center bg-stone-700 hover:bg-stone-200">
            <ChatBubbleBottomCenterTextIcon class="mt-0.5 size-5 text-fuchsia-100 font-bold text-lg tracking-wider uppercase group-hover:text-fuchsia-900" />
            <span class="uppercase text-xs font-medium text-fuchsia-300 tracking-wider group-hover:text-fuchsia-900">concierge</span>
        </a>
    </footer>
</template>

<script setup lang="ts">
/* Import modules. */
import { ref } from 'vue'
import { sdk } from '@farcaster/miniapp-sdk'
import {
    ChatBubbleBottomCenterTextIcon,
    MapIcon,
    WalletIcon,
} from '@heroicons/vue/20/solid'

/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const addHaptic = async () => {
    await sdk.haptics.impactOccurred('medium')
}

// const addNotif = async () => {
//     await sdk.haptics.notificationOccurred('success')
// }

// const addSelect = async () => {
//     await sdk.haptics.selectionChanged()
// }

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
