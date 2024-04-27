import React from 'react';

export const starts = [
  {
    x: 18,
    y: 25,
    xOffset: 5.3,
    columnCount: 11,
    shifts: [0, 0, 0, 0.15, 0.25, 0.4, 0.5, 0.7, 0.8, 0.9, 1, 1.05],
  },
  {
    y: 36.4,
    xOffset: 5.3,
    x: 12.7,
    columnCount: 13,
    shifts: [0, 0, 0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  },
  {
    y: 47.8,
    xOffset: 5.3,
    x: 12.7,
    columnCount: 14,
    shifts: [0, 0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1],
  },
  {
    y: 59.2,
    xOffset: 5.3,
    x: 18,
    columnCount: 11,
    shifts: [0, 0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  },
];

export const BlackListSpots = [
  { x: 1, cy: 12 },
  { x: 2, y: 12 },
];

function Letter(props: { row: number; column: number; letter: string }) {
  const { row, column, letter } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: `${starts[row]?.y}%`,
        left: `${(starts[row]?.x ?? 0) + starts[row].xOffset * column + starts[row].shifts[column]}%`,
        width: '3.7%',
        height: '8.5%',
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: '4em',
      }}
    >
      {letter}
    </div>
  );
}

export default Letter;
