import React, { useEffect, useState } from 'react';
import { Table as BootstrapTable, Pagination, FormControl, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import styles from './Table.module.css';
import Loader from '../Loader/Loader';
import Person from '../Person/Person';

const Table = () => {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortDirection, setSortDirection] = useState({ key: '', direction: 'asc' });
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAllPeople = async () => {
            try {
                let allPeople = [];
                let nextPage = 'https://swapi.dev/api/people/';

                while (nextPage) {
                    const response = await fetch(nextPage);
                    if (!response.ok) {
                        throw new Error('An error occurred!');
                    }
                    const result = await response.json();
                    allPeople = allPeople.concat(result.results);
                    nextPage = result.next;
                }

                setData(allPeople);
                setOriginalData(allPeople); // Store original data
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

    const handleSort = (key) => {
        const sortedData = [...data].sort((a, b) => {
            if (key === 'mass' || key === 'height') {
                let aValue = a[key] === 'unknown' ? Number.MIN_SAFE_INTEGER : Number(a[key].replace(/,/g, ''));
                let bValue = b[key] === 'unknown' ? Number.MIN_SAFE_INTEGER : Number(b[key].replace(/,/g, ''));
                if (sortDirection.direction === 'desc') {
                    aValue = a[key] === 'unknown' ? Number.MAX_SAFE_INTEGER : Number(a[key].replace(/,/g, ''));
                    bValue = b[key] === 'unknown' ? Number.MAX_SAFE_INTEGER : Number(b[key].replace(/,/g, ''));
                }
                return sortDirection.direction === 'desc' ? aValue - bValue : bValue - aValue;
            } else {
                if (a[key] < b[key]) return sortDirection.direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return sortDirection.direction === 'asc' ? 1 : -1;
                return 0;
            }
        });
        setData(sortedData);
        setSortDirection({ key, direction: sortDirection.direction === 'asc' ? 'desc' : 'asc' });
        setCurrentPage(1);
    };

    const handleReset = () => {
        setData(originalData);
        setSearchQuery('');
        setSortDirection({ key: '', direction: 'asc' });
        setCurrentPage(1);
    };

    const filteredData = data.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.mass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.height.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.hair_color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.skin_color.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Alert variant="danger" className="text-center">
                    An error occurred: {error.message}
                </Alert>
            )}
            <div className={loading ? styles.blur : ''}>
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs={12} md={11} lg={10}>
                            <h1 className={`text-center mb-4 ${styles['header-primary']}`}>Star Wars Characters</h1>
                            <Row className="justify-content-center mb-4">
                                <Col xs={12} md={6}>
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="justify-content-center mb-4">
                                <Col xs={12} md={6} className="text-center">
                                    {(searchQuery || sortDirection.key) && (
                                        <Button
                                            variant="secondary"
                                            onClick={handleReset}
                                            className={styles['reset-button']}>Reset Table
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                            <BootstrapTable striped bordered hover>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                            Name {sortDirection.key === 'name' && (sortDirection.direction === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th onClick={() => handleSort('mass')} style={{ cursor: 'pointer' }}>
                                            Mass {sortDirection.key === 'mass' && (sortDirection.direction === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th onClick={() => handleSort('height')} style={{ cursor: 'pointer' }}>
                                            Height {sortDirection.key === 'height' && (sortDirection.direction === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th onClick={() => handleSort('hair_color')} style={{ cursor: 'pointer' }}>
                                            Hair Color {sortDirection.key === 'hair_color' && (sortDirection.direction === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th onClick={() => handleSort('skin_color')} style={{ cursor: 'pointer' }}>
                                            Skin Color {sortDirection.key === 'skin_color' && (sortDirection.direction === 'asc' ? '▲' : '▼')}
                                        </th>
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