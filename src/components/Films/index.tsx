import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import data from "../../services/data";
import api from "../../services/server";
import { FilmsList } from "./components/FilmsList";
import { IFilm } from "./dtos";

export function Films () {
    const [dataFilms, setDataFilms] = useState<IFilm[]>([]);
    const [apiFilms, setApiFilms] = useState<IFilm[]>([]);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0); 
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        getFilmsFromApi(skip, limit).then((response) => {
            if (response === true) {
                return
            } else {
                getAndShowMovies()
            }
        })
    }, [update])

    async function getAndShowMovies () {
        if (apiFilms.length > 0) {
            return
        }
        else if (apiFilms.length === 0) {
            await getFilms();
            dataFilms.map( async (film: IFilm) => {
                await postFilmsToAPI(film);
            })
        } 
    }

    async function getFilms () : Promise<void> {
        try {
            await data.get('/films').then((response) => {
                setDataFilms(response.data)
            })
        } catch (err) {
            console.log('erro', err);
        }
    }

    async function getFilmsFromApi(skip: number, limit: number) : Promise<boolean> {
        try {
            const response = await api.get(`/films?skip=${skip}&limit=${limit}`);
            if (response.data.films.length > 0) {
                setApiFilms(response.data.films);
                setTotal(response.data.total)
                return true
            } else return false;
        } catch (err) {
            console.log('erro', err);
            return false;
        }
    }

    async function postFilmsToAPI (film: IFilm) : Promise<void> {
        try {
            const body = {
                movie_banner: film.movie_banner,
                title: film.title,
                description: film.description,
                producer: film.producer,
                director: film.director,
            };

            await api.post('/films', body)
        } catch (err) {
            console.log('erro', err);
        }
    }

    async function deleteFilmsFromDatabase () {

    }
    
    return (
        <Flex flexDir="column" w="100vw" h="100vh" >
            <Flex flexDir='column' p={5}>
                <Box w="100%">
                    <Text fontSize='2xl' fontWeight="500" color='black'>Listagem de Filmes</Text>
                </Box>
                <Box w="100%" h="100%">
                    <Flex w="100%" flexDir="row" align="center" justify="end">
                        <Button
                            bgColor="green_logo"
                            borderRadius={5}
                            boxShadow="0px 3px 3px rgba(0, 0, 0, 0.3)"
                            border="2px solid green_logo"
                            _hover={{
                                transform: "scale(1.02)",
                            }}
                            onClick={() => {

                            }}
                        >
                            Atualizar
                        </Button>
                    </Flex>
                    <Flex
                        flexDir="column"
                        width="100%"
                    >
                        <FilmsList
                            total={total} 
                            films={apiFilms}
                            getFilmsFromApi={getFilmsFromApi}
                            skip={skip}
                            setSkip={setSkip}
                            limit={limit}
                        />
                    </Flex>
                </Box>   
            </Flex>
        </Flex>
    )
}