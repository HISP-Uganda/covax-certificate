import { Box, Flex, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Button } from "antd";
import QrCode from "qrcode.react";
import { PureComponent, useRef } from "react";
import { useParams } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import mohImage from '../moh.png';
import Signature from '../Signature.jpg';
import Attribute from "./Attribute";
import Events from "./Events";

type ParamProps = {
  tei: string
}

interface InstanceProps { tei: string }

class Instance extends PureComponent<InstanceProps> {
  render() {
    const { tei } = this.props;
    return <Flex direction="column" p="100px"  h="842px" fontFamily='"Times New Roman", Georgia, Serif'>
      <VStack>
        <Image src={mohImage} alt="Ministry of Health" boxSize="100px" />
        <Text textTransform="uppercase">The Republic of Uganda</Text>
        <Text textTransform="uppercase">Ministry of Health</Text>
      </VStack>
      <VStack spacing="20px">
        <Text mt="50px" fontWeight="extrabold">COVID-19 VACCINATION CERTIFICATE</Text>
        <Attribute tei={tei} />
        <Events tei={tei} />
      </VStack>
      <Box mt="300px">
        <SimpleGrid columns={2}  alignItems="center">
          <VStack textAlign="left">
            <Text textTransform="uppercase">Issued and Approved by</Text>
            {/* <Image src={Signature} alt="Ministry of Health" boxSize="60px" /> */}
            <Text textTransform="uppercase" fontWeight="bold">Minister of Health</Text>
            <Text fontStyle="italic" textTransform="uppercase">Vaccine Control Officer</Text>
            <Text fontStyle="italic" textTransform="uppercase">National COVID-19 Response Team</Text>
            <Text fontStyle="italic" textTransform="uppercase">Ministry of Health</Text>
          </VStack>
          <VStack>
            <QrCode
              value="http://facebook.github.io/react/"
              style={{
                width: 160,
                height: 160,
                marginTop: 5,
                marginBottom: 5,
              }}
              renderAs="svg"
            />
          </VStack>
        </SimpleGrid>
      </Box>
    </Flex>;
  }
}

const TrackedEntityInstance = () => {
  const componentRef = useRef();
  const { tei } = useParams<ParamProps>();
  return (
    <Box>
      <Instance ref={componentRef} tei={tei} />
      <ReactToPrint
        trigger={() => (
          <Button>
            PRINT CERTIFICATE
          </Button>
        )}
        content={() => componentRef.current}
      />
    </Box>
  )
}

export default TrackedEntityInstance
