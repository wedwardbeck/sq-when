import CoreEventList from '~/components/CoreEventList'
import CoreEventTable from '~/components/CoreEventTable'

export default function Events() {
    return (
        <div>
            <main class="text-center mx-auto text-gray-700 p-4">
                <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16"></h1>
                <CoreEventList />
            </main>
        </div>
    )
}
