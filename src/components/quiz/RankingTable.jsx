import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const RankingTable = ({ userData }) => {
  return (
    <TableContainer maxH="400px" minW="350px" overflowY="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th isNumeric>No.</Th>
            <Th>名前</Th>
            <Th isNumeric>スコア</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData.map((user, index) => (
            <Tr key={user.id}>
              <Td>{index + 1}</Td>
              <Td>{user.name}</Td>
              <Td isNumeric>{user.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
