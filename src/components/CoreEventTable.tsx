import { createSignal, For, Switch, Match } from 'solid-js'
import { A } from '@solidjs/router'
import {
    QueryClient,
    QueryClientProvider,
    createQuery,
} from '@tanstack/solid-query'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    FiltersTableState,
    ColumnDef,
    createSolidTable,
    FilterFn,
} from '@tanstack/solid-table'
import { formatDate } from '~/utility/formatter'

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

const defaultColumns: ColumnDef<Event>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
        accessorKey: 'eventStartDate',
        header: 'Start Date',
        cell: (info) => formatDate(info.getValue<string>()),
    },
    {
        accessorKey: 'locationName',
        header: 'Location',
        cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
        accessorKey: 'eventStartDate',
        header: 'Start Date',
        cell: (info) => formatDate(info.getValue<string>()),
    },
]

function EventTable() {
    const query = createQuery(() => ({
        queryKey: ['events'],
        queryFn: fetchEvents,
    }))

    const [data, setData] = createSignal(query.data as Event[])
    const [sorting, setSorting] = createSignal<SortingState>([])
    const [filtering, setFiltering] = createSignal<FiltersTableState>()
    const rerender = () => setData(query.data as Event[])
    const globalFilterFn: FilterFn<any> = (
        row,
        columnId,
        filterValue: string
    ) => {
        const search = filterValue.toLowerCase()

        let value = row.getValue(columnId) as string
        if (typeof value === 'number') value = String(value)

        return value?.toLowerCase().includes(search)
    }
    const table = createSolidTable({
        get data() {
            return data()
        },

        columns: defaultColumns,
        state: {
            get sorting() {
                return sorting()
            },
            get globalFilter() {
                return filtering()
            },
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        debugTable: true,
    })

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
                    <div>
                        <input
                            value={filtering()?.toString() ?? ''}
                            onInput={setFiltering}
                            placeholder="Search all columns..."
                        />
                        <table class="w-full table-auto">
                            <thead>
                                <For each={table.getHeaderGroups()}>
                                    {(headerGroup) => (
                                        <tr class="bg-gray-200">
                                            <For each={headerGroup.headers}>
                                                {(header) => (
                                                    <th
                                                        colSpan={header.colSpan}
                                                    >
                                                        <div
                                                            class={
                                                                header.column.getCanSort()
                                                                    ? 'cursor-pointer select-none'
                                                                    : undefined
                                                            }
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header
                                                                          .column
                                                                          .columnDef
                                                                          .header,
                                                                      header.getContext()
                                                                  )}
                                                            {{
                                                                asc: ' 🔼',
                                                                desc: ' 🔽',
                                                            }[
                                                                header.column.getIsSorted() as string
                                                            ] ?? null}
                                                        </div>
                                                    </th>
                                                )}
                                            </For>
                                        </tr>
                                    )}
                                </For>
                            </thead>
                            <tbody>
                                <For each={table.getRowModel().rows}>
                                    {(row) => (
                                        <tr>
                                            <For each={row.getVisibleCells()}>
                                                {(cell) => (
                                                    <td class="px-2">
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                )}
                                            </For>
                                        </tr>
                                    )}
                                </For>
                            </tbody>
                            <tfoot>
                                <For each={table.getFooterGroups()}>
                                    {(footerGroup) => (
                                        <tr>
                                            <For each={footerGroup.headers}>
                                                {(header) => (
                                                    <th>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                  header.column
                                                                      .columnDef
                                                                      .footer,
                                                                  header.getContext()
                                                              )}
                                                    </th>
                                                )}
                                            </For>
                                        </tr>
                                    )}
                                </For>
                            </tfoot>
                        </table>
                        <button onClick={() => rerender()} class="border p-2">
                            Rerender
                        </button>
                    </div>
                </Match>
            </Switch>
        </div>
    )
}
export default function CoreEventTable() {
    return (
        <QueryClientProvider client={queryClient}>
            <EventTable />
        </QueryClientProvider>
    )
}
