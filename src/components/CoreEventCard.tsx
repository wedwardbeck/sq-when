type props = {
    rounded?: boolean
    flat?: boolean
    children?: any
}

export default function CoreEventCard(props: props) {
    return (
        <div
            class="bg-white p-4 text-center rounded-md shadow-md"
            classList={{
                'rounded-md': props.rounded,
                'shadow-md': !props.flat,
            }}
        >
            {props.children}
        </div>
    )
}
