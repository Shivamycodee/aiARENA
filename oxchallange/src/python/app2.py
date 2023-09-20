import chess
import chess.svg
import random

def evaluate_board(board):
    # Simple evaluation function that sums up the value of all pieces
    piece_values = {'p': -1, 'r': -5, 'n': -3, 'b': -3, 'q': -9, 'k': -50,
                    'P': 1, 'R': 5, 'N': 3, 'B': 3, 'Q': 9, 'K': 50}

    evaluation = 0
    for square in chess.SQUARES:
        piece = board.piece_at(square)
        if piece:
            evaluation += piece_values.get(piece.symbol(), 0)
    return evaluation

def minimax(board, depth, maximizing, alpha, beta):
    if depth == 0 or board.is_game_over():
        return evaluate_board(board)

    legal_moves = list(board.legal_moves)
    if maximizing:
        max_eval = float('-inf')
        for move in legal_moves:
            board.push(move)
            eval = minimax(board, depth-1, False, alpha, beta)
            board.pop()
            max_eval = max(max_eval, eval)
            alpha = max(alpha, eval)
            if beta <= alpha:
                break
        return max_eval
    else:
        min_eval = float('inf')
        for move in legal_moves:
            board.push(move)
            eval = minimax(board, depth-1, True, alpha, beta)
            board.pop()
            min_eval = min(min_eval, eval)
            beta = min(beta, eval)
            if beta <= alpha:
                break
        return min_eval

def best_move(board, depth):
    max_eval = float('-inf')
    best_move_found = None

    for move in board.legal_moves:
        board.push(move)
        eval = minimax(board, depth-1, False, float('-inf'), float('inf'))
        board.pop()
        if eval > max_eval:
            max_eval = eval
            best_move_found = move
    return best_move_found

# Main game loop
board = chess.Board()
while not board.is_game_over():
    print(board)
    if board.turn == chess.WHITE:
        move = best_move(board, 2)  # You can adjust the depth for stronger/weaker play
    else:
        move = random.choice(list(board.legal_moves))  # Black makes random moves
    board.push(move)

print("Game Over")
print("Result: " + board.result())
