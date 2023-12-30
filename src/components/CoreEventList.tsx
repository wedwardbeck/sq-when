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
    eventStartDate: string
}

const queryClient = new QueryClient()

const eventData: Event[] = [
    {
        id: 0,
        title: 'Evolve Lubbock is a Gi & No-Gi Event',
        subTitle:
            'Adults Gi & No-Gi, Kids & Teens Gi & No-Gi Tournament April 19th, 2020!',
        imageURL: 'txbjj.png',
        locationName: 'Apex Event Center',
        eventStartDate: '2020-04-19T00:06:48.616146Z',
    },
    {
        id: 1,
        title: 'Grapplefest Dallas 2020',
        subTitle:
            'Adults Gi & No-Gi, Kids & Teens Gi & No-Gi Tournament April 19th, 2020!',
        imageURL: 'image1.jpg',
        locationName: 'Bonnie Yard',
        eventStartDate: '2020-04-29T00:06:48.616146Z',
    },
    {
        id: 2,
        title: '10PATX WORLD OPEN - JIU JITSU TOURNAMENT',
        subTitle:
            '10PATX World Open is held annually at Paleo FX. First 50 Paid Registrants get a FREE rashguard.',
        imageURL: '10patx.png',
        locationName: 'Palmer Events Center',
        eventStartDate: '2020-05-04T00:06:48.616146Z',
    },
    {
        id: 3,
        title: 'Grapplefest Dallas 2020',
        subTitle:
            'Adults Gi & No-Gi, Kids & Teens Gi & No-Gi Tournament April 19th, 2020!',
        imageURL: 'image1.jpg',
        locationName: 'Bonnie Yard',
        eventStartDate: '2020-05-19T00:06:48.616146Z',
    },
    {
        id: 4,
        title: 'Grapplefest Dallas 2020',
        subTitle: '',
        imageURL: 'image1.jpg',
        locationName: 'Bonnie Yard',
        eventStartDate: '2020-06-02T00:06:48.616146Z',
    },
]
function fetchEvents(): Promise<Event[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(eventData), 700) // Simulating async operation
    })
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
