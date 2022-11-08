import { Avatar, Box, Flex, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Table } from 'react-chakra-pagination';
import 'react-toastify/dist/ReactToastify.css';
import { IFilmListProps } from "./dtos";

export function FilmsList ({ films, total, getFilmsFromApi, skip, setSkip, limit }: IFilmListProps) {
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<Array<{}>>([])
    let initialArray = Array(skip).fill({});

    const onPageChange = async (page: number) => {
        setSkip(((page - 1) * 10));
        setPage(page)
    }

    useEffect(() => {
        setPaginatedData(initialArray.concat(tableData))
    }, [films])

    console.log({skip})

    useEffect(() => {
        getFilmsFromApi(skip, limit);
    }, [page])

    const toastSuccessMessage = (message: string) => {
        toast.success(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
  
    const toastErrorMessage = (message: string) => {
        toast.error(`${message}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const tableData = films && films.map((film) => ({
        banner: (
            <Flex align="center">
                <Avatar name={film.title} src={film.movie_banner} size="sm" mr="4" />
            </Flex>
        ),
        title: film.title,
        description: (
            <Box
                css={{
                    'maxWidth':'35rem',
                    'white-space':'nowrap',
                    'overflow':'hidden',
                    'text-overflow':'ellipsis',
                }}
            >
                {film.description}
            </Box>
        ),
        director: film.director,
        producer: film.producer,
    }))

    const tableColumns = [
        {
          Header: "",
          accessor: "banner" as const
        },
        {
          Header: "Título",
          accessor: "title" as const
        },
        {
          Header: "Descrição",
          accessor: "description" as const
        },
        {
          Header: "Diretor",
          accessor: "director" as const
        },
        {
          Header: "Produtor",
          accessor: "producer" as const
        }
      ];

    return (
        <>  
            <Flex
                mt="30px"
                width="100%"
                flexDir="column"
                overflow='auto'
                height='600px'
                overflow-x='auto'
                css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'var(--chakra-colors-green)',
                      borderRadius: '24px',
                    },
                  }}
            >
                <Flex
                    align="center"
                    justify="center"
                >
                    <TableContainer
                        width='100%'
                    >
                        <Table 
                            colorScheme="twitter"
                            totalRegisters={total}
                            page={page}
                            onPageChange={(page) => onPageChange(page)}
                            columns={tableColumns}
                            data={paginatedData}
                        />
                    </TableContainer>
                </Flex>
                <ToastContainer />
            </Flex>
        </>
    )
}
