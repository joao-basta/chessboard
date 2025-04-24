// Seleciona elementos do tabuleiro e peças
const boardSquares = document.querySelectorAll(".square"); // Usando querySelectorAll para evitar HTMLCollection dinâmica
const pieces = document.querySelectorAll(".piece");        // Todas as peças
const pieceImages = document.querySelectorAll(".img");     // Imagens dentro das peças (se necessário)

// Configura o tabuleiro e as peças
setupBoardSquares();
setupPieces();

// ===== FUNÇÕES PRINCIPAIS ===== //

/** Configura os quadrados do tabuleiro */
function setupBoardSquares() {
    boardSquares.forEach((square, index) => {
        // Permite arrastar peças para cima do quadrado
        square.addEventListener("dragover", allowDrop);
        square.addEventListener("drop", drop);

        // Define o ID do quadrado (ex: "a1", "b2", etc.)
        const row = 8 - Math.floor(index / 8);
        const column = String.fromCharCode(97 + (index % 8)); // 'a' to 'h'
        square.id = `${column}${row}`;
    });
}

/** Configura as peças para serem arrastáveis */
function setupPieces() {
    pieces.forEach(piece => {
        piece.setAttribute("draggable", true);
        piece.addEventListener("dragstart", drag);

        // Define um ID único para a peça (ex: "Pa2" para um Peão em a2)
        const pieceType = piece.className.split(" ")[1] || "unknown"; // Pega a segunda classe (ex: "pawn", "rook")
        const parentSquareId = piece.parentElement.id;
        piece.id = `${pieceType}${parentSquareId}`;
    });

    // Se houver imagens dentro das peças, desativa o arrasto delas
    pieceImages.forEach(img => {
        img.setAttribute("draggable", false);
    });
}

// ===== FUNÇÕES DE ARRASTAR E SOLTAR ===== //

/** Permite soltar a peça no quadrado */
function allowDrop(event) {
    event.preventDefault(); // Permite o drop
}

/** Inicia o arrasto da peça */
function drag(event) {
    // Guarda o ID da peça sendo arrastada
    event.dataTransfer.setData("text/plain", event.target.id);
}

/** Solta a peça no quadrado de destino */
function drop(event) {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData("text/plain");
    const piece = document.getElementById(pieceId);
    const targetSquare = event.currentTarget;

    // Move a peça para o novo quadrado
    targetSquare.appendChild(piece);
}