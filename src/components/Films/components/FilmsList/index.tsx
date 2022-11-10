import { Avatar, Box, Flex, TableContainer, Tag, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table } from 'react-chakra-pagination';
import { IFilmListProps } from "./dtos";
import Loading from "../Loading";
import React from "react";

export function FilmsList ({ films, total, getFilmsFromApi, skip, setSkip, limit }: IFilmListProps) {
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<Array<{}>>([]);
    const [loading, setLoading] = useState(false); 

    let initialArray = Array(skip).fill({});

    const onPageChange = async (page: number) => {
        setSkip(((page - 1) * 10));
        setPage(page)
    }

    useEffect(() => {
        setPaginatedData(initialArray.concat(tableData))
        if (films.length === 0) setLoading(false);
        else {
            setLoading(true)
        };  
    }, [films])

    useEffect(() => {
        getFilmsFromApi(skip, limit);
    }, [page])

    const tableData = films && films.map((film) => ({
        banner: (
            <Flex align="center">
                <Avatar name={film.title} src={film.movie_banner} size="sm" mr="4" />
            </Flex>
        ),
        title: film.title,
        description: (
            <Tooltip
              label={film.description}
              color="black"
              textAlign='justify'
              boxShadow="0px 3px 3px rgba(0, 0, 0, 0.3)"
              backgroundColor='var(--chakra-colors-light_gray)'
            >
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
            </Tooltip>
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
                      background: 'var(--chakra-colors-cool_blue)',
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
                        {
                            loading ?
                            <Table
                                colorScheme="twitter"
                                totalRegisters={total}
                                page={page}
                                onPageChange={(page) => onPageChange(page)}
                                columns={tableColumns}
                                data={paginatedData}
                            />
                        : 
                        <Flex align="center" justify="center" mt={200}>
                            <Loading 
                                type='spin'
                                color='var(--chakra-colors-cool_blue)'
                            />
                        </Flex>
                    }
                    </TableContainer>
                </Flex>
            </Flex>
        </>
    )
}
