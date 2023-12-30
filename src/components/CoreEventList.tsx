import { For, Switch, Match } from 'solid-js'
import { A } from '@solidjs/router'
import {
    QueryClient,
    QueryClientProvider,
    createQuery,
} from '@tanstack/solid-query'
import { formatDate } from '~/utility/formatter'

import CoreEventCard from './CoreEventCard'

type Event = {
    id: number
    title: string
    subTitle: string
    imageURL: string
    locationName: string
    address1: string
    address2: string
    city: string
    region: string
    postcode: string
    country: string
    phone: string
    email: string
    eventStartDate: string
    eventEndDate: string
    earlyRegistrationStartDate: string
    registrationStartDate: string
    registrationEndDate: string
    status: string
    position: string
    distSort: number
}

const queryClient = new QueryClient()

const fetchEvents = async () => {
    const res = await fetch('http://localhost:9000/events')
    return (await res.json()) as Event[]
}
function EventList() {
    const query = createQuery(() => ({
        queryKey: ['events'],
        queryFn: fetchEvents,
    }))

    return (
        <div>
            <Switch>
                <Match when={query.isPending}>
                    <p>Loading...</p>
                </Match>
                <Match when={query.isError}>
                    <p>Error: {query.error?.message}</p>
                </Match>
                <Match when={query.isSuccess}>
                    <div class="grid grid-cols-4 gap-10 my-4">
                        <For each={query.data}>
                            {(event) => (
                                <A href={`/events/${event.id}`}>
                                    <CoreEventCard rounded={true} flat={true}>
                                        <h1>{event.title}</h1>
                                        <p>
                                            {formatDate(event.eventStartDate)}
                                        </p>
                                    </CoreEventCard>
                                </A>
                            )}
                        </For>
                    </div>
                </Match>
            </Switch>
        </div>
    )
}
export default function CoreEventList() {
    return (
        <QueryClientProvider client={queryClient}>
            <EventList />
        </QueryClientProvider>
    )
}
