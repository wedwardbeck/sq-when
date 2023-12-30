import { A } from '@solidjs/router'

export default function Home() {
    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            {/* <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16"></h1> */}

            <p class="my-4">
                <span>Home</span>
                {' - '}
                <A href="/events/" class="text-sky-600 hover:underline">
                    Events Page
                </A>
                {' - '}
                <A href="/test/" class="text-sky-600 hover:underline">
                    Test Page
                </A>
                {' - '}
                <A href="/about" class="text-sky-600 hover:underline">
                    About Page
                </A>{' '}
            </p>
        </main>
    )
}
