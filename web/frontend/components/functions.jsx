import {
  IndexTable,
  Card,
  Text,
  Badge,
  BlockStack,
  Box,
  InlineStack,
  Button,
  EmptyState,
  Modal,
} from '@shopify/polaris';
import { useState } from 'react';
import { AddFunctionModal } from './index';


export function Functions () {
  const [functions, setFunctions] = useState(DATA)
  const [openAddModal, setOpenAddModal] = useState(false)
  const resourceName = {
    singular: 'function',
    plural: 'functions',
  };

  const emptyStateMarkup =
    <EmptyState
      heading="Manage your functions"
      action={{ content: 'Add function', onClick: () => setOpenAddModal(true) }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Add more customized behavior to your checkout.</p>
    </EmptyState>

  const rowMarkup = functions.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index,
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  const tableHeadingMarkup = functions.length &&
    <Box paddingBlockStart="200" paddingBlockEnd="200" paddingInlineStart="300" paddingInlineEnd="300">
      <InlineStack align='space-between' blockAlign='center'>
        <Text variant="headingMd" tone='subdued'>Function List</Text>
        <Box width='30%'>
          <InlineStack align='end'>
            <Button variant='primary' onClick={() => setOpenAddModal(true)}>Add</Button>
          </InlineStack>
        </Box>
      </InlineStack>
    </Box>

  return (
    <Card padding="050" background='bg-fill-info-secondary'>

      <BlockStack align='center'>
        {tableHeadingMarkup}
        <IndexTable
          resourceName={resourceName}
          itemCount={functions.length}
          emptyState={emptyStateMarkup}
          headings={[
            { title: '#' },
            { title: 'Date' },
            { title: 'Name' },
            { title: 'Status' },
            { title: 'Details' },
          ]}
          selectable={false}
        >
          {rowMarkup}
        </IndexTable>
      </BlockStack>

     <AddFunctionModal open={openAddModal} handleClose={() => setOpenAddModal(false)} />

    </Card>
  );
}


const DATA = [
  {
    id: '1020',
    order: '#1020',
    date: 'Jul 20 at 4:34pm',
    customer: 'Jaydon Stanton',
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: '1019',
    order: '#1019',
    date: 'Jul 20 at 3:46pm',
    customer: 'Ruben Westerfelt',
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: '1018',
    order: '#1018',
    date: 'Jul 20 at 3.44pm',
    customer: 'Leo Carder',
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
]
