import { Flex, Text } from '@chakra-ui/react';
import ReactLoading, { LoadingProps } from 'react-loading';
 
const Loading = ({ type, color }: LoadingProps) => (
    <Flex flexDir='column' align="center" justify="center" gap={5}> 
        <Text fontSize='2xl' fontWeight="500" color='black'>Carregando...</Text>
        <ReactLoading type={type} color={color} height={100} width={50} />
    </Flex>
);
 
export default Loading;