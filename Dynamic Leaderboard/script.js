const players = [
    { name: "Alice", score: 150},
    { name: "Bob", score: 200},
    { name: "Charlie", score: 100},
]

function populateLeaderboard(data) {
    const table = document.getElementById("leaderboard");

    data.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${player.name}</td>
            <td>${player.score}</td>`;

        table.appendChild(row)
    });
}

populateLeaderboard(players);