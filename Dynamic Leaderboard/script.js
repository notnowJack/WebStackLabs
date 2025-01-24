let players = JSON.parse(localStorage.getItem("players")) || [
    { name: "Alice", score: 150},
    { name: "Bob", score: 200},
    { name: "Charlie", score: 100},
];

populateLeaderboard(players);

function populateLeaderboard(data) 
{
    const table = document.getElementById("leaderboard");
    
    //reset table
    table.innerHTML =
        `<tr>
            <th>Player</th>
            <th>Score</th>
        </tr>`;

    //populate table
    data.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${player.name}</td>
            <td>${player.score}</td>`;
        
        if (index === 0)
        {
            row.classList.add("topPlayer");
        }

        table.appendChild(row);
    });
}

function sortLeaderboard()
{
    //sort players in descending order of score
    players.sort((a, b) => b.score - a.score);
    //redo the table
    populateLeaderboard(players);
    saveToLocalStorage();
}   

function addPlayer()
{
    const name = document.getElementById("newName").value;
    const score = document.getElementById("newScore").value;

    if (name && !isNaN(score))
    {
        players.push({name, score});
        sortLeaderboard();
    }
    else 
    {
        alert("Please enter a valid name and score");
    }
}

function filterLeaderboard()
{
    const minScore = parseInt(document.getElementById("minScore").value);

    if (!isNaN(minScore))
    {
        const filteredPlayers = players.filter(player => player.score >= minScore);
        populateLeaderboard(filteredPlayers);
    }
    else
    {
        alert("Please enter a valid minimum score");
    }
}

function saveToLocalStorage()
{
    localStorage.setItem("players", JSON.stringify(players));
}
sortLeaderboard();