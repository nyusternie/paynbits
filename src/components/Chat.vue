<template>

    <div class="my-6 flex gap-x-3">
        <img
            :src="pfpUrl"
            alt=""
            class="size-8 flex-none rounded-full bg-gray-50"
        />

        <form action="#" class="relative flex-auto">
            <div class="overflow-hidden rounded-lg pb-12 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <label for="comment" class="sr-only">Add your comment</label>
                <textarea
                    rows="2"
                    name="comment"
                    id="comment"
                    class="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-slate-900 placeholder:text-gray-400 focus:outline focus:outline-0"
                    placeholder="What shall we shop for next?"
                />
            </div>

            <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <div class="flex items-center space-x-5">


                </div>
                <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Make Request
                </button>
            </div>
        </form>
    </div>

    <ul role="list" class="space-y-6">
        <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id" class="relative flex gap-x-4">
            <div :class="[activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
                <div class="w-px bg-gray-200" />
            </div>
            <template v-if="activityItem.type === 'commented'">
                <img :src="activityItem.person.imageUrl" alt="" class="relative mt-3 size-6 flex-none rounded-full bg-gray-50" />
                <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div class="flex justify-between gap-x-4">
                        <div class="py-0.5 text-xs/5 text-gray-500"><span class="font-medium text-slate-900">{{ activityItem.person.name }}</span> commented</div>
                        <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs/5 text-gray-500">{{ activityItem.date }}</time>
                    </div>
                    <p class="text-sm/6 text-gray-500">{{ activityItem.comment }}</p>
                </div>
            </template>
            <template v-else>
                <div class="relative flex size-6 flex-none items-center justify-center bg-white">
                    <CheckCircleIcon v-if="activityItem.type === 'paid'" class="size-6 text-indigo-600" aria-hidden="true" />
                    <div v-else class="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                </div>
                <p class="flex-auto py-0.5 text-xs/5 text-gray-500"><span class="font-medium text-slate-900">{{ activityItem.person.name }}</span> {{ activityItem.type }} the invoice.</p>
                <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs/5 text-gray-500">{{ activityItem.date }}</time>
            </template>
        </li>
    </ul>

</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { CheckCircleIcon } from '@heroicons/vue/24/solid'
    import { FaceFrownIcon, FaceSmileIcon, FireIcon, HandThumbUpIcon, HeartIcon, PaperClipIcon, XMarkIcon } from '@heroicons/vue/20/solid'
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'

    const username = ref('shomari.eth')
    const pfpUrl = ref('https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/57f8600f-2e51-4549-8cc4-f80e4c681800/anim=false,fit=contain,f=auto,w=336')

    const activity = [
        { id: 1, type: "created", person: { name: username.value }, date: "7d ago", dateTime: "2023-01-23T10:32" },
        { id: 2, type: "edited", person: { name: username.value }, date: "6d ago", dateTime: "2023-01-23T11:03" },
        { id: 3, type: "sent", person: { name: username.value }, date: "6d ago", dateTime: "2023-01-23T11:24" },
        {
            id: 4,
            type: "commented",
            person: {
                name: username.value,
                imageUrl: pfpUrl.value,
            },
            comment: "Called client, they reassured me the invoice would be paid by the 25th.",
            date: "3d ago",
            dateTime: "2023-01-23T15:56",
        },
        { id: 5, type: "viewed", person: { name: "Alex Curren" }, date: "2d ago", dateTime: "2023-01-24T09:12" },
        { id: 6, type: "paid", person: { name: "Alex Curren" }, date: "1d ago", dateTime: "2023-01-24T09:20" },
        {
            id: 4,
            type: "commented",
            person: {
                name: username.value,
                imageUrl: pfpUrl.value,
            },
            comment: "Called client, they reassured me the invoice would be paid by the 25th.",
            date: "3d ago",
            dateTime: "2023-01-23T15:56",
        },
        { id: 5, type: "viewed", person: { name: "Alex Curren" }, date: "2d ago", dateTime: "2023-01-24T09:12" },
        { id: 6, type: "paid", person: { name: "Alex Curren" }, date: "1d ago", dateTime: "2023-01-24T09:20" },
    ]

    const moods = [
        { name: "Excited", value: "excited", icon: FireIcon, iconColor: "text-white", bgColor: "bg-red-500" },
        { name: "Loved", value: "loved", icon: HeartIcon, iconColor: "text-white", bgColor: "bg-pink-400" },
        { name: "Happy", value: "happy", icon: FaceSmileIcon, iconColor: "text-white", bgColor: "bg-green-400" },
        { name: "Sad", value: "sad", icon: FaceFrownIcon, iconColor: "text-white", bgColor: "bg-yellow-400" },
        { name: "Thumbsy", value: "thumbsy", icon: HandThumbUpIcon, iconColor: "text-white", bgColor: "bg-blue-500" },
        { name: "I feel nothing", value: null, icon: XMarkIcon, iconColor: "text-gray-400", bgColor: "bg-transparent" },
    ]

    const selected = ref(moods[5])
</script>
