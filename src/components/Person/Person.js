import React from 'react';

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.mass}</td>
            <td>{person.height}</td>
            <td>{person.hair_color}</td>
            <td>{person.skin_color}</td>
        </tr>
    );
};

export default Person;
