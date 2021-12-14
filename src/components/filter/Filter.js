import { useState } from "react";
import {Button, FormControl, FormLabel, Input, Select, Grid, Stack} from '@chakra-ui/react';

export const Filters = ({ onFilter }) => {
  const [filterValues, setFilterValues] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFilter(filterValues);
      }}
    >
      <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)'}} gap={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={filterValues.name}
            onChange={(e) => {
              setFilterValues((values) => ({
                ...values,
                name: e.target.value
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            placeholder="Select option"
            value={filterValues.status}
            onChange={(e) => {
              setFilterValues((values) => ({
                ...values,
                status: e.target.value
              }));
            }}
          >
            <option value='alive'>alive</option>
            <option value='dead'>dead</option>
            <option value='unknown'>unknown</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Species</FormLabel>
          <Input
            value={filterValues.species}
            onChange={(e) => {
              setFilterValues((values) => ({
                ...values,
                species: e.target.value
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            value={filterValues.type}
            onChange={(e) => {
              setFilterValues((values) => ({
                ...values,
                type: e.target.value
              }));
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select option"
            value={filterValues.gender}
            onChange={(e) => {
              setFilterValues((values) => ({
                ...values,
                gender: e.target.value
              }));
            }}
          >
            <option value='female'>female</option>
            <option value='male'>male</option>
            <option value='genderless'>genderless</option>
            <option value='unknown'>unknown</option>
          </Select>
        </FormControl>
      </Grid>
      <Stack direction='row' align='center' justify='center' marginTop='20px'>
        <Button type="submit">Filter</Button>
        <Button
          type="submit"
          onClick={() => {
            setFilterValues({
              name: "",
              status: "",
              species: "",
              type: "",
              gender: "",
            });
          }}
        >
          Clear
        </Button>
      </Stack>
    </form>
  );
};
