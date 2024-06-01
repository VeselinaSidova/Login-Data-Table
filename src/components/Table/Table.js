import React, { useEffect, useState } from 'react';
import { Table as BootstrapTable, Pagination, Container, Row, Col } from 'react-bootstrap';
import styles from './Table.module.css';
import Loader from '../Loader/Loader';
import Person from '../Person/Person';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAllPeople = async () => {
            try {
                let allPeople = [];
                let nextPage = 'https://swapi.dev/api/people/';

                while (nextPage) {
                    const response = await fetch(nextPage);
                    const result = await response.json();
                    allPeople = allPeople.concat(result.results);
                    nextPage = result.next; // URL for the next page of results, or null if no more pages
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

    // Calculate the data to be displayed on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {loading && <Loader />}
            <div className={loading ? styles.blur : ''}>
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs={12} md={11} lg={10}>
                            <h1 className="text-center mb-4">Star Wars Characters</h1>
                            <BootstrapTable striped bordered hover>
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
                                    {currentItems.map((person, index) => (  //using index since there is no ID in SWAPI but we do not modify data
                                        <Person key={index} person={person} />
                                    ))}
                                </tbody>
                            </BootstrapTable>
                            <Pagination className="justify-content-center mt-4">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index + 1}
                                        active={index + 1 === currentPage}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Table;
