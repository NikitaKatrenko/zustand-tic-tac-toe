export default function Square({ value, onSquareClick }) {
    return (
        <button
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                backgroundColor: '#fff',
                border: '1px solid #999',
                outline: 0,
                borderRadius: 0,
                fontSize: '24px',
                fontWeight: 'bold',
                width: '60px',
                height: '60px',
                cursor: 'pointer',
                color: value === 'X' ? '#007FFF' : '#FF4136',
                transition: 'background-color 0.2s',
            }}
            onClick={onSquareClick}
        >
            {value}
        </button>
    )
}
