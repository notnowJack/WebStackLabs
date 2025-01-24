const players = [
    { name: "Alice", score: 150},
    { name: "Bob", score: 200},
    { name: "Charlie", score: 100},
]

function populateLeaderboard(data) 
{
    const table = document.getElementById("leaderboard");
    
    //rest table
    table.innerHTML =
        `<tr>
            <th>Player</th>
            <th>Score</th>
        </tr>`;

    //populate table
    data.forEach(player => {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${player.name}</td>
            <td>${player.score}</td>`;

        table.appendChild(row)
    });
}


function sortLeaderboard()
{
    //sort players in descending order of score
    players.sort((a, b) => b.score - a.score);
    //redo the table
    populateLeaderboard(players);
}   

sortLeaderboard();