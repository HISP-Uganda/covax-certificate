import { Flex, Text } from '@chakra-ui/react';
import { FC } from "react";
import { useD2 } from "../Context";
import { NAME_ATTRIBUTE, useTracker } from "../Queries";

interface AttributeProps {
  tei: string
}
const Attribute: FC<AttributeProps> = ({ tei }) => {
  const d2 = useD2();
  const {
    isLoading,
    isError,
    error,
    data
  } = useTracker(d2, tei);

  if (isLoading) {
    return <div>Is Loading</div>
  }

  if (isError) {
    return <div>
      {error.message}
    </div>
  }
  return (
    <Flex my="20px">
      <Text>This is to Certify that</Text>&nbsp;
      <Text fontWeight="extrabold">{data[NAME_ATTRIBUTE]} </Text>&nbsp;
      <Text>was vaccinated against COVID-19 as shown below</Text>
    </Flex>

  )
}

export default Attribute
