import { useState, useEffect, useCallback } from 'react';
import { Filters } from './components/filter/Filter';
import { Character } from './components/character/Character';
import { Pagination } from './components/pagination/Pagination';
import { 
  Grid, 
  ChakraProvider, 
  extendTheme, 
  Box,
  Container,
  Heading,
} from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { CustomModal } from './components/modal/CustomModal';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1600',
})

const theme = extendTheme({ breakpoints })

function App() {
  const [characters, setCharacters] = useState(undefined);
  const [nextPageUrl, setNextPage] = useState(null);
  const [prevPageUrl, setPrevPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
  const [selectedCharacter, setSelectedCharacter] = useState({
    visible: false,
    image: '',
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
  })

  useEffect(() => {
    let cleanupFunction = false;
    const url = currentPageUrl
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if(!cleanupFunction) {
            setCharacters(data.results)
            setNextPage(data.info.next)
            setPrevPage(data.info.prev)
          }
        }
        else {
          console.error(response.status)
          setCharacters([])
        }
      }
      catch(err) {
        console.error(err);
      }
    }

    fetchData();
    return () => cleanupFunction = true;
    }, [currentPageUrl])

  const nextPage = () => {
    setCurrentPageUrl(nextPageUrl)
  }

  const prevPage = () => {
    setCurrentPageUrl(prevPageUrl)
  }

  const handleCharacterClick = (image, name, status, species, type, gender) => {
    setSelectedCharacter({ visible: true, image, name, status, species, type, gender})
  }

  const closeModal = () => {
    setSelectedCharacter({
      isOpen: false,
      description: {},
    })
  }

  const applyFilter = useCallback((filters) => {
    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value.trim() !== "")
    );

    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`)
        if (response.ok) {
          const data = await response.json();
          setCharacters(data.results);
          setNextPage(data.info.next);
          setPrevPage(data.info.prev);
        } else {
          setCharacters([])
        }
      }
      catch(err) {
        console.err(err)
      }
    }
    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='container.xl' padding='20px'>
        <Heading as='h1' marginBottom='30px' textAlign='center'>Rick and morty characters</Heading>
        <Box marginBottom='20px'>
          <Filters onFilter={applyFilter}/>
        </Box>
        <Grid templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', '2xl': 'repeat(5, 1fr)'}} gap={6} >
          {characters &&
            characters.length > 0 &&
            characters.map((character) => (
              <Character key={character.id} obj={character} onCharacterClick={handleCharacterClick}/>
            ))}
          {characters && characters.length === 0 && "Nothing found"}
        </Grid>
        <Pagination nextPage={nextPage} prevPage={prevPage} prevDisabled={prevPageUrl} nextDisabled={nextPageUrl}/>
      </Container>
      <CustomModal selectedCharacter={selectedCharacter} closeModal={closeModal}/>
    </ChakraProvider>
  );
}

export default App;
