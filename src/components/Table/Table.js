import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styles from './Table.module.css';
import Loader from '../Loader/Loader';
import Person from '../Person/Person';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllPeople = async () => {
            try {
                let allPeople = [];
                let nextPage = 'https://swapi.dev/api/people/';

                while (nextPage) {
                    const response = await fetch(nextPage);
                    const result = await response.json();
                    allPeople = allPeople.concat(result.results);
                    nextPage = result.next;
                }

                setData(allPeople);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchAllPeople();
    }, []);

    return (
        <div>
            {loading && <Loader />}
            <div className={loading ? styles.blur : ''}>
                <Container className="mt-5">
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
                            {data.map((person, index) => (  //using index since there is no ID in SWAPI but we do not modify data
                                <Person key={index} person={person} />
                            ))}
                        </tbody>

                    </table>
                </Container>
            </div>
        </div>
    );
};

export default Table;
