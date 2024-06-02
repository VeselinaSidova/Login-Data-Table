import React from 'react';

const Person = ({ person }) => {
    const formatValue = (value, unit) => {
        return value !== 'unknown' ? `${value} ${unit}` : value;
    };

    return (
        <tr>
            <td>{person.name}</td>
            <td>{formatValue(person.mass, 'kg')}</td>
            <td>{formatValue(person.height, 'cm')}</td>
            <td>{person.hair_color}</td>
            <td>{person.skin_color}</td>
        </tr>
    );
};

export default Person;
