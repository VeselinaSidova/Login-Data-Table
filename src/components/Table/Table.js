import React, { useEffect, useState } from 'react';
import { Table as BootstrapTable, Pagination, FormControl, Container, Row, Col, Alert } from 'react-bootstrap';
import styles from './Table.module.css';
import Loader from '../Loader/Loader';
import Person from '../Person/Person';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAllPeople = async () => {
            try {
                let allPeople = [];
                let nextPage = 'https://swapi.dev/api/people/';

                while (nextPage) {
                    const response = await fetch(nextPage);
                    if (!response.ok) {
                        throw new Error('An error occured!');
                    }
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredData = data.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {loading && <Loader />}
            {error && (
                <Alert variant="danger"
                    className="text-center">
                    An error occured: {error.message}
                </Alert>
            )}
            <div className={loading ? styles.blur : ''}>
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs={12} md={11} lg={10}>
                            <h1 className="text-center mb-4">Star Wars Characters</h1>
                            <Row className="justify-content-center mb-4">
                                <Col xs={12} md={6}>
                                    <FormControl
                                        type="text"
                                        placeholder="Search by name"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                            </Row>
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
                                        linkStyle={{
                                            backgroundColor: index + 1 === currentPage ? '#0A3E93' : '',
                                            color: index + 1 === currentPage ? 'white' : '#0A3E93',
                                            borderColor: index + 1 === currentPage ? '#0A3E93' : '',
                                        }}
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