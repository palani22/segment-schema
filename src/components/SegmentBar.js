import React, { useState, useMemo } from 'react';
import { Box, Button, Input, Select, VStack, Link, Text, Flex, IconButton, FormLabel, useToast } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import NavBar from './NavBar';

const schemaOptions = [
    { label: 'First Name', value: 'first_name', task: 'user' },
    { label: 'Last Name', value: 'last_name', task: 'user' },
    { label: 'Gender', value: 'gender', task: 'user' },
    { label: 'Age', value: 'age', task: 'user' },
    { label: 'Account Name', value: 'account_name', task: 'group' },
    { label: 'City', value: 'city', task: 'group' },
    { label: 'State', value: 'state', task: 'group' }
];

const SegmentSidebar = ({ closeSegmentSidebar }) => {
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [newSchema, setNewSchema] = useState('');

    const toast = useToast();

    const availableSchemas = useMemo(() =>
        schemaOptions.filter(option =>
            !selectedSchemas.find(selected => selected.value === option.value)
        ), [selectedSchemas]);

    const handleAddSchema = () => {
        if (newSchema) {
            const selectedOption = availableSchemas.find(option => option.value === newSchema);
            if (selectedOption) {
                setSelectedSchemas(prev => [...prev, selectedOption]);
                setNewSchema('');
            }
        }
    };

    const handleSchemaChange = (index, newValue) => {
        const newSchema = availableSchemas.find(option => option.value === newValue);
        if (newSchema) {
            setSelectedSchemas(prev =>
                prev.map((item, idx) => idx === index ? newSchema : item)
            );
        }
    };

    const handleRemoveSchema = (index) => {
        setSelectedSchemas(prev => {
            const updatedSchemas = [...prev];
            const [removedSchema] = updatedSchemas.splice(index, 1);
            return updatedSchemas;
        });
    };

    const handleSaveSegment = async () => {
        const dataToSend = {
            segment_name: segmentName,
            schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
        };

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';
        const webhookUrl = 'https://webhook.site/4202a456-bd47-41fb-ad31-755f067e8d66';

        try {
            const response = await fetch(corsProxy + webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const jsonResponse = await response.json();
                    console.log("Received JSON response:", jsonResponse);
                    toast({
                        title: "Segment saved.",
                        description: "Your segment has been saved successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    closeSegmentSidebar()
                } else {
                    const textResponse = await response.text();
                    console.log("Received non-JSON response:", textResponse);
                    toast({
                        title: "Segment saved.",
                        description: "Your segment has been saved successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    closeSegmentSidebar()
                }
            } else {
                toast({
                    title: "Error saving segment.",
                    description: `HTTP error! Status: ${response.status}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                console.error("HTTP error! Status:", response.status);
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };



    return (
        <>
            <NavBar title="Saving Segment" onBackClick={closeSegmentSidebar} />
            <Box padding="20px" display="flex" flexDirection="column" height="calc(100vh - 60px)" overflow="auto">
                <VStack spacing={2} flex="1" align="stretch">
                    <FormLabel fontSize="sm">Enter the Name of the Segment</FormLabel>
                    <Input
                        placeholder="Name of the segment"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                        fontSize="sm"
                        mb={2}
                    />
                    <Text fontSize="sm" color="gray.600" textAlign="start">
                        To save your segment, you need to add schemas to build the query.
                    </Text>

                    <Flex justifyContent="center" mt={1} marginLeft="auto" gap={4}>
                        <Flex alignItems="center">
                            <Box
                                width="6px"
                                height="6px"
                                borderRadius="full"
                                bg="green.400"
                                mr={2}
                            />
                            <Text fontSize="xs">User Tasks</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Box
                                width="6px"
                                height="6px"
                                borderRadius="full"
                                bg="red.400"
                                mr={2}
                            />
                            <Text fontSize="xs">Group Tasks</Text>
                        </Flex>
                    </Flex>

                    <Box width="100%" padding="4" borderWidth="1px" borderColor="blue.500">
                        {selectedSchemas.length > 0 ? (
                            selectedSchemas.map((schema, index) => (
                                <Flex key={index} alignItems="center" mb={2} gap={2}>
                                    <Box
                                        width="6px"
                                        height="6px"
                                        borderRadius="full"
                                        bg={schema.task === 'user' ? 'green.400' : 'red.400'}
                                        mr={2}
                                    />
                                    <Select
                                        value={schema.value}
                                        onChange={(e) => handleSchemaChange(index, e.target.value)}
                                        size="sm"
                                        width="250px"
                                    >
                                        {availableSchemas.concat(selectedSchemas).map((schemaOption) => (
                                            <option key={schemaOption.value} value={schemaOption.value}>
                                                {schemaOption.label}
                                            </option>
                                        ))}
                                    </Select>
                                    <IconButton
                                        aria-label="Remove schema"
                                        icon={<MinusIcon />}
                                        onClick={() => handleRemoveSchema(index)}
                                        size="sm"
                                        variant="none"
                                        colorScheme="red"
                                    />
                                </Flex>
                            ))
                        ) : (
                            <Box color="gray.500" textAlign="center" fontSize="xs">No schemas added yet</Box>
                        )}
                    </Box>

                    <Flex direction="column" gap={2} mt={2}>
                        <Flex alignItems="center" gap={2} ml={4}>
                            <Box
                                width="6px"
                                height="6px"
                                borderRadius="full"
                                bg="gray.400"
                                mr={2}
                            />
                            <Select
                                placeholder="Add schema to segment"
                                value={newSchema}
                                onChange={(e) => setNewSchema(e.target.value)}
                                width="250px"
                                size="sm"
                            >
                                {availableSchemas.map((schema) => (
                                    <option key={schema.value} value={schema.value}>{schema.label}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Link
                            color="teal.500"
                            ml={8}
                            mt={2}
                            onClick={handleAddSchema}
                            fontSize="xs"
                            textDecoration="underline"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            + Add new schema
                        </Link>
                    </Flex>
                </VStack>

                <Flex justifyContent="flex-start" mt={4}>
                    <Button colorScheme="teal" onClick={handleSaveSegment} mr={4} fontSize="sm">Save the Segment</Button>
                    <Button variant="link" color="red" onClick={closeSegmentSidebar} fontSize="sm">Cancel</Button>
                </Flex>
            </Box>
        </>
    );
};

export default SegmentSidebar;
