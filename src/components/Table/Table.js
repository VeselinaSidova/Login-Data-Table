import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import Person from '../Person/Person';
import styles from './Table.module.css';

const TableComponent = ({ data, handleSort, sortDirection }) => (
    <BootstrapTable striped bordered hover className={styles['table-shadow']}>
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
            {data.map((person, index) => ( //using index since there is no ID in SWAPI but we do not modify data
                <Person key={index} person={person} />
            ))}
        </tbody>
    </BootstrapTable>
);

export default TableComponent;