import { useParams } from '@solidjs/router'
import { createResource, For, Show } from 'solid-js'

const fetchEvent = async (id: Number) => {
    const res = await fetch('http://localhost:9000/events/' + 1)
    return (await res.json()) as Event
}

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
export default function EventDetail() {
    const params = useParams()

    const fetchEvent = async (id: number) => {
        const res = await fetch('http://localhost:9000/events/' + id)
        return await res.json()
    }

    const [event] = createResource<Event>(() => fetchEvent(Number(params.id)))

    return (
        <Show when={event()} fallback={<p>Loading ...</p>}>
            <div class="grid my-4">
                <p class="title">
                    {event()?.title} - {event()?.id}
                </p>
                <p class="sub-title">{event()?.subTitle}</p>
                <div class="column column is-one-third is-marginless">
                    <figure class="image is-4by3">
                        <img src={'/' + event()?.imageURL} alt="event image" />
                    </figure>
                </div>
                <span class=" columns is-mobile ">
                    <div class="column pull-left p-tb-min p-l-min">
                        {event()?.locationName}
                        <br />
                        <span v-if="event.address1">
                            {event()?.address1}
                            <span> {event()?.address2}</span>
                            <br></br>
                        </span>
                        <span> {event()?.city}, </span>
                        {event()?.region}
                    </div>
                </span>
                {event()?.phone}
                {event()?.email}
                <p>{event()?.eventStartDate}</p>
            </div>
        </Show>
    )
}
