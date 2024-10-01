import React, { useEffect, useState } from 'react';
import * as filmServices from '~/services/filmServices';
const Track = () => {
    const [slug, setSlug] = useState('dao-hai-tac');
    const [film, setFilm] = useState();

    useEffect(() => {
        const fetchFilmData = async () => {
            const result = await filmServices.getbyslug(slug);
            setFilm(result.film);
        };
        fetchFilmData();
    }, [slug]);
    return <div>Track page</div>;
};

export default Track;
