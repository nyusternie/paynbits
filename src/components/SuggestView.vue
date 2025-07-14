<template>
    <div class="bg-white">
        <!-- Background color split screen for large screens -->
        <div class="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
        <div class="fixed right-0 top-0 hidden h-full w-1/2 bg-sky-900 lg:block" aria-hidden="true" />

        <div class="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
            <h1 class="sr-only">Concierge Recommendations</h1>

            <section aria-labelledby="summary-heading" class="bg-stone-900 py-12 text-sky-300 rounded-xl">
                <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                    <h2 id="summary-heading" class="sr-only">Concierge Recommendations</h2>

                    <dl>
                        <dt class="text-sm font-medium">
                            Concierge Recommendations
                        </dt>

                        <dd class="mt-1 text-xl font-bold tracking-tight text-white">
                            Found x3 items that should meet your needs.
                            Ranked based on the popularity amongst your frens' latest activity.
                        </dd>
                    </dl>

                    <ul role="list" class="divide-y divide-white/10 text-lg font-medium">
                        <li v-for="product in products" :key="product.id" class="pb-3 flex flex-col items-end">
                            <div class="w-full flex items-start space-x-4 py-6">
                                <img
                                    :src="product.imageSrc"
                                    :alt="product.imageAlt"
                                    class="size-20 flex-none rounded-md object-cover"
                                />

                                <div class="flex-auto space-y-1">
                                    <h3 class="text-white">{{ product.name }}</h3>
                                    <p>{{ product.color }}</p>
                                    <p>{{ product.size }}</p>
                                </div>

                                <p class="flex-none text-base font-medium text-white">{{ product.price }}</p>
                            </div>

                            <div class="flex -space-x-0.5">
                                <dt class="sr-only">Commenters</dt>
                                <dd v-for="commenter in discussions[product.id].commenters" :key="commenter.id">
                                    <img class="size-6 rounded-full bg-gray-50 ring-2 ring-white" :src="commenter.imageUrl" :alt="commenter.name" />
                                </dd>
                            </div>

                        </li>
                    </ul>

                    <dl class="space-y-6 border-t border-white/10 pt-6 text-xl font-medium">
                        <div class="flex items-center justify-between">
                            <dt>Subtotal</dt>
                            <dd>$570.00</dd>
                        </div>

                        <div class="flex items-center justify-between">
                            <dt>Shipping</dt>
                            <dd>$25.00</dd>
                        </div>

                        <div class="flex items-center justify-between">
                            <dt>Taxes</dt>
                            <dd>$47.60</dd>
                        </div>

                        <div class="flex items-center justify-between border-t border-white/10 pt-6 text-white">
                            <dt class="text-base">Total</dt>
                            <dd class="text-base">$642.60</dd>
                        </div>
                    </dl>
                </div>
            </section>

            <!-- <section aria-labelledby="payment-and-shipping-heading" class="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0">
                <h2 id="payment-and-shipping-heading" class="sr-only">Payment and shipping details</h2>

                <form>
                    <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                            <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">Contact information</h3>

                            <div class="mt-6">
                                <label for="email-address" class="block text-sm/6 font-medium text-gray-700">Email address</label>
                                <div class="mt-2">
                                    <input
                                        type="email"
                                        id="email-address"
                                        name="email-address"
                                        autocomplete="email"
                                        class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="mt-10">
                            <h3 class="text-lg font-medium text-gray-900">Payment details</h3>

                            <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                <div class="col-span-3 sm:col-span-4">
                                    <label for="card-number" class="block text-sm/6 font-medium text-gray-700">Card number</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            id="card-number"
                                            name="card-number"
                                            autocomplete="cc-number"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-2 sm:col-span-3">
                                    <label for="expiration-date" class="block text-sm/6 font-medium text-gray-700">Expiration date (MM/YY)</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            name="expiration-date"
                                            id="expiration-date"
                                            autocomplete="cc-exp"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label for="cvc" class="block text-sm/6 font-medium text-gray-700">CVC</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            name="cvc"
                                            id="cvc"
                                            autocomplete="csc"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10">
                            <h3 class="text-lg font-medium text-gray-900">Shipping address</h3>

                            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                <div class="sm:col-span-3">
                                    <label for="address" class="block text-sm/6 font-medium text-gray-700">Address</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            autocomplete="street-address"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label for="city" class="block text-sm/6 font-medium text-gray-700">City</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            autocomplete="address-level2"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label for="region" class="block text-sm/6 font-medium text-gray-700">State / Province</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            id="region"
                                            name="region"
                                            autocomplete="address-level1"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label for="postal-code" class="block text-sm/6 font-medium text-gray-700">Postal code</label>
                                    <div class="mt-2">
                                        <input
                                            type="text"
                                            id="postal-code"
                                            name="postal-code"
                                            autocomplete="postal-code"
                                            class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10">
                            <h3 class="text-lg font-medium text-gray-900">Billing information</h3>

                            <div class="mt-6 flex gap-3">
                                <div class="flex h-5 shrink-0 items-center">
                                    <div class="group grid size-4 grid-cols-1">
                                        <input
                                            id="same-as-shipping"
                                            name="same-as-shipping"
                                            type="checkbox"
                                            checked=""
                                            class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-sky-600 checked:bg-sky-600 indeterminate:border-sky-600 indeterminate:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                            <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <label for="same-as-shipping" class="text-sm font-medium text-gray-900">Same as shipping information</label>
                            </div>
                        </div>

                    </div>
                </form>
            </section> -->

            <div class="w-full p-10 flex justify-center border-t border-gray-200 pt-6">
                <button
                    @click="orderNow"
                    class="rounded-md border border-transparent bg-sky-600 px-4 py-2 text-2xl font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                    Order Now
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const orderNow = () => {
        console.log('SHOW DEMO MODAL')
        alert('SHOW DEMO MODAL')
    }

    const products = [
        {
            id: 1,
            name: "High Wall Tote",
            href: "#",
            price: "$210.00",
            color: "White and black",
            size: "15L",
            imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-07-product-01.jpg",
            imageAlt: "Front of zip tote bag with white canvas, white handles, and black drawstring top.",
        },
        {
            id: 2,
            name: "Halfsize Tote",
            href: "#",
            price: "$330.00",
            color: "Clay",
            size: "11L",
            imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-07-product-02.jpg",
            imageAlt: "Front of satchel with light brown canvas body, flap top, and matching straps and handle.",
        },
        {
            id: 3,
            name: "Wrap Clutch",
            href: "#",
            price: "$30.00",
            color: "Light gray",
            size: "0.3L",
            imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/checkout-page-07-product-03.jpg",
            imageAlt: "Light grey canvas pouch with leather wrap strap and fold flap.",
        },
    ];



    import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

    const discussions = [
        {
            id: 1,
            title: "Atque perspiciatis et et aut ut porro voluptatem blanditiis?",
            href: "#",
            author: { name: "Leslie Alexander", href: "#" },
            date: "2d ago",
            dateTime: "2023-01-23T22:34Z",
            status: "active",
            totalComments: 24,
            commenters: [
                {
                    id: 12,
                    name: "Emma Dorsey",
                    imageUrl: "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 6,
                    name: "0xShomari",
                    imageUrl: "https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/57f8600f-2e51-4549-8cc4-f80e4c681800/anim=false,fit=contain,f=auto,w=336",
                },
                {
                    id: 4,
                    name: "Lindsay Walton",
                    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 16,
                    name: "Benjamin Russel",
                    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 23,
                    name: "Hector Gibbons",
                    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
            ],
        },
        {
            id: 2,
            title: "Et ratione distinctio nesciunt recusandae vel ab?",
            href: "#",
            author: { name: "Michael Foster", href: "#" },
            date: "2d ago",
            dateTime: "2023-01-23T19:20Z",
            status: "active",
            totalComments: 6,
            commenters: [
                {
                    id: 13,
                    name: "Alicia Bell",
                    imageUrl: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 16,
                    name: "Benjamin Russel",
                    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 3,
                    name: "Dries Vincent",
                    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
            ],
        },
        {
            id: 3,
            title: "Blanditiis perferendis fugiat optio dolor minus ut?",
            href: "#",
            author: { name: "Dries Vincent", href: "#" },
            date: "3d ago",
            dateTime: "2023-01-22T12:59Z",
            status: "resolved",
            totalComments: 22,
            commenters: [
                {
                    id: 19,
                    name: "Lawrence Hunter",
                    imageUrl: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 21,
                    name: "Angela Fisher",
                    imageUrl: "https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 14,
                    name: "Jenny Wilson",
                    imageUrl: "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 16,
                    name: "Benjamin Russel",
                    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
            ],
        },
        {
            id: 4,
            title: "Voluptatum ducimus voluptatem qui in eum quasi consequatur vel?",
            href: "#",
            author: { name: "Lindsay Walton", href: "#" },
            date: "5d ago",
            dateTime: "2023-01-20T10:04Z",
            status: "resolved",
            totalComments: 8,
            commenters: [
                {
                    id: 10,
                    name: "Emily Selman",
                    imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 11,
                    name: "Kristin Watson",
                    imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
            ],
        },
        {
            id: 5,
            title: "Perferendis cum qui inventore ut excepturi nostrum occaecati?",
            href: "#",
            author: { name: "Courtney Henry", href: "#" },
            date: "5d ago",
            dateTime: "2023-01-20T20:12Z",
            status: "active",
            totalComments: 15,
            commenters: [
                {
                    id: 11,
                    name: "Kristin Watson",
                    imageUrl: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 6,
                    name: "0xShomari",
                    imageUrl: "https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw/57f8600f-2e51-4549-8cc4-f80e4c681800/anim=false,fit=contain,f=auto,w=336",
                },
                {
                    id: 10,
                    name: "Emily Selman",
                    imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
                {
                    id: 16,
                    name: "Benjamin Russel",
                    imageUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                },
            ],
        },
    ];
</script>
