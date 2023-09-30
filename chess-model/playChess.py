import chess
import chess.svg
from IPython.display import display, clear_output
from IPython.display import SVG, display
import tensorflow as tf
import numpy as np


# Load your trained model
model = tf.keras.models.load_model("./keras_model_02_final")

board = chess.Board()

def display_board(board):
    return chess.svg.board(board=board)

def display_svg(svg_string):
    return display(SVG(svg_string))


def board_to_input_format(board):
    piece_mapping = {
        None: [0, 0, 0],
        'P': [0, 0, 1],
        'R': [0, 1, 0],
        'N': [0, 1, 1],
        'B': [1, 0, 0],
        'Q': [1, 0, 1],
        'K': [1, 1, 0],
        'p': [0, 0, -1],
        'r': [0, -1, 0],
        'n': [0, -1, -1],
        'b': [-1, 0, 0],
        'q': [-1, 0, -1],
        'k': [-1, -1, 0]
    }
    
    input_data = []
    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece:
            input_data.extend(piece_mapping[piece.symbol()])
        else:
            input_data.extend(piece_mapping[None])
    return np.array(input_data, dtype=np.float32)


# UI Game
def get_user_move():
    legal_moves = [str(move) for move in board.legal_moves]
    while True:
        move_uci = input(f"Your move (legal moves: {', '.join(legal_moves[:10])}...): ")
        if move_uci in legal_moves:
            return chess.Move.from_uci(move_uci)
        else:
            print("Invalid move. Please try again.")

while not board.is_game_over():
    clear_output(wait=True)
    display_svg(display_board(board))
    
    if board.turn:  # True for White, False for Black
        print("White's turn (random move)")
        move = np.random.choice(list(board.legal_moves))
        board.push(move)
    else:
        print("Black's turn (model)")
        best_move = None
        best_score = -np.inf

        for move in board.legal_moves:
            board.push(move)
            input_data = board_to_input_format(board)
            score = model.predict(np.array([input_data]))
            board.pop()

            if score > best_score:
                best_move = move
                best_score = score

        board.push(best_move)


clear_output(wait=True)
display(display_board(board))
if board.is_checkmate():
    print("Checkmate!")
    if board.turn:
        print("Black wins!")
    else:
        print("White wins!")
else:
    print("Game over. It's a draw!")