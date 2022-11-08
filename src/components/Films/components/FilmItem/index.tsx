import { Td, Tr, Image, Box } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { IFilmItemProps } from "./dtos";

export function FilmItem ({ film }: IFilmItemProps) {
    const [deleteConfirmationModal, setOpenDeleteConfirmationModal] = useState(false);
    
    const toggleDeleteConfirmationModal = () => {
        setOpenDeleteConfirmationModal(!deleteConfirmationModal);
    }

    const formattedMoney = (value: number) => {
        return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value);
    }

    const formattedDate = (date: string) => {
        if (date !== undefined) {
            return date.split('-').reverse().join('/');
        }
    }

    return (
        <>
            <Tr>
                <Td>
                    <Image alt='movie_banner' src={film.movie_banner}/>
                </Td>
                <Td>{film.title}</Td>
                <Td
                    css={{
                        'max-width':'35rem',
                        'white-space':'nowrap',
                        'overflow':'hidden',
                        'text-overflow':'ellipsis',
                    }}
                >{film.description}</Td>
                <Td>{film.director}</Td>
                <Td>{film.producer}</Td>
            </Tr>
        </>
    )
}
