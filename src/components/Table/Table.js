import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader'

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://swapi.dev/api/people')
            .then((response) => response.json())
            .then((data) => {
                setData(data.results);
                setLoading(false);
            })
    }, []);

    if (loading) return <Loader />;

    return (
        <table className="data-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mass</th>
                    <th>Height</th>
                    <th>Hair Color</th>
                    <th>Skin Color</th>
                </tr>
            </thead>
            <tbody>
                {data.map((person, index) => (  //no ID in person, data is not modified
                    <tr key={index}>
                        <td>{person.name}</td>
                        <td>{person.mass}</td>
                        <td>{person.height}</td>
                        <td>{person.hair_color}</td>
                        <td>{person.skin_color}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
