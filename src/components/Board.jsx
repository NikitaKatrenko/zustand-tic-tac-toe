import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import Square from './Square.jsx'

const useGameStore = create(
    combine(
        {
            squares: Array(9).fill(null),
            xIsNext: true,
        },
        (set) => ({
            setSquares: (nextSquares) =>
                set((state) => ({
                    squares: typeof nextSquares === 'function'
                        ? nextSquares(state.squares)
                        : nextSquares,
                })),
            setXIsNext: (nextXIsNext) =>
                set((state) => ({
                    xIsNext: typeof nextXIsNext === 'function'
                        ? nextXIsNext(state.xIsNext)
                        : nextXIsNext,
                })),
        })
    )
)

export default function Board() {
    const squares = useGameStore((state) => state.squares)
    const xIsNext = useGameStore((state) => state.xIsNext)
    const setSquares = useGameStore((state) => state.setSquares)
    const setXIsNext = useGameStore((state) => state.setXIsNext)

    const winner = calculateWinner(squares)
    const turns = calculateTurns(squares)
    const player = xIsNext ? 'X' : 'O'
    const status = calculateStatus(winner, turns, player)

    function handleClick(i) {
        if (squares[i] || winner) return
        const nextSquares = squares.slice()
        nextSquares[i] = player
        setSquares(nextSquares)
        setXIsNext(!xIsNext)
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
                marginBottom: '1rem',
                fontSize: '24px',
                color: winner ? '#28a745' : '#fff'
            }}>
                {status}
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    width: '180px',
                    height: '180px',
                    border: '2px solid #999',
                    margin: '0 auto',
                }}
            >
                {squares.map((square, squareIndex) => (
                    <Square
                        key={squareIndex}
                        value={square}
                        onSquareClick={() => handleClick(squareIndex)}
                    />
                ))}
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }

    return null
}

function calculateTurns(squares) {
    return squares.filter((square) => !square).length
}

function calculateStatus(winner, turns, player) {
    if (!winner && !turns) return 'Draw'
    if (winner) return `Winner: ${winner}`
    return `Next player: ${player}`
}