import { FC } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useD2 } from "../Context"
import { useEvents } from "../Queries";

interface TableProps {
  tei: string;
}

const Events: FC<TableProps> = ({ tei }) => {
  const d2 = useD2();
  const { isLoading,
    isError,
    error,
    data
  } = useEvents(d2, tei);

  if (isLoading) {
    return <div>Is Loading</div>
  }
  if (isError) {
    return <div>
      {error.message}
    </div>
  }
  return (
    <Table variant="unstyled">
      <Thead>
        <Tr>
          <Th border="1px solid black">Date</Th>
          <Th border="1px solid black">Vaccine</Th>
          <Th border="1px solid black">Dose</Th>
          <Th border="1px solid black">Manufacturer</Th>
          <Th border="1px solid black">Site</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data && data.length > 0 ?
          data.map((event: any) => <Tr key={event.event}>
            <Td border="1px solid black">{new Intl.DateTimeFormat('fr').format(Date.parse(event.eventDate))}</Td>
            <Td border="1px solid black">{event.bbnyNYD1wgS}</Td>
            <Td border="1px solid black">{event.LUIsbsm3okG}</Td>
            <Td border="1px solid black">{event.rpkH9ZPGJcX}</Td>
            <Td border="1px solid black">{event.orgUnitName}</Td>
          </Tr>)
          : <Tr>
            <Td textAlign="center" colSpan={5}>No Vaccinations</Td>
          </Tr>}
      </Tbody>
    </Table>
  )
}

export default Events
