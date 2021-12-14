import { Button, Stack } from "@chakra-ui/react"


export const Pagination = ({nextPage, prevPage, prevDisabled, nextDisabled}) => {
  return(
    <Stack direction='row' align='center' justify='center' marginTop='20px'>
      <Button onClick={prevPage} size='md' colorScheme='teal' isDisabled={prevDisabled? false : true}>Prev</Button>
      <Button onClick={nextPage} size='md' colorScheme='teal' isDisabled={nextDisabled? false : true}>Next</Button>
    </Stack>
  )
}