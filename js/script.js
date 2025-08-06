document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#statsTable tbody');

    // Define stats to rank
    const statsToRank = ['AVG', 'OBP', 'SLG', 'OPS', 'SB', 'LD%', 'PU%', 'FB%', 'GB%', 'K%', 'BB%', 'H%', 'TP', 'P/PA', 'BABIP', 'AB / RSP', 'AVG / RSP'];

    // Create a map of top 3 values for each stat
    const top3Map = {};
    statsToRank.forEach(stat => {
        const sortedValues = [...spelers]
            .filter(player => player[stat] !== '-' && !isNaN(player[stat]))
            .sort((a, b) => b[stat] - a[stat])
            .map(p => p[stat]);
        top3Map[stat] = new Set(sortedValues.slice(0, 3));
    });

    // Add all rows
    spelers.forEach(player => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer'; // Maak de rij klikbaar
        row.addEventListener('click', () => {
            // Navigeer naar de detailpagina met de speler's naam als queryparameter
            window.location.href = `player.html?name=${encodeURIComponent(player.Name)}`;
        });

        const classes = statsToRank.reduce((acc, stat) => {
            const value = player[stat];
            if (value !== '-' && !isNaN(value) && top3Map[stat].has(value)) {
                const sortedByStat = [...spelers]
                    .filter(p => p[stat] !== '-' && !isNaN(p[stat]))
                    .sort((a, b) => b[stat] - a[stat]);
                const rank = sortedByStat.findIndex(p => p[stat] === value);
                acc[stat] = rank === 0 ? 'gold' : rank === 1 ? 'silver' : rank === 2 ? 'bronze' : '';
            }
            return acc;
        }, {});

        row.innerHTML = `
            <td data-label="Name">${player.Name}</td>
            <td data-label="AVG" class="${classes['AVG'] || ''}">${player.AVG.toFixed(3)}</td>
            <td data-label="OBP" class="${classes['OBP'] || ''}">${player.OBP.toFixed(3)}</td>
            <td data-label="SLG" class="${classes['SLG'] || ''}">${player.SLG.toFixed(3)}</td>
            <td data-label="OPS" class="${classes['OPS'] || ''}">${player.OPS.toFixed(3)}</td>
            <td data-label="PA">${player.PA}</td>
            <td data-label="AB">${player.AB}</td>
            <td data-label="R">${player.R}</td>
            <td data-label="H">${player.H}</td>
            <td data-label="BB">${player.BB}</td>
            <td data-label="1B">${player['1B']}</td>
            <td data-label="2B">${player['2B']}</td>
            <td data-label="3B">${player['3B']}</td>
            <td data-label="HR">${player.HR}</td>
            <td data-label="RBI">${player.RBI}</td>
            <td data-label="K%" class="${classes['K%'] || ''}">${player['K%'].toFixed(1)}%</td>
            <td data-label="SO">${player.SO}</td>
            <td data-label="HBP">${player.HBP}</td>
            <td data-label="SB" class="${classes['SB'] || ''}">${player.SB}</td>
            <td data-label="CS">${player.CS}</td>
            <td data-label="SB%">${player.SB + player.CS > 0 ? ((player.SB / (player.SB + player.CS)) * 100).toFixed(0) : 0}%</td>
            <td data-label="SF">${player.SF}</td>
            <td data-label="SAC">${player.SAC}</td>
            <td data-label="AB / RSP" class="${classes['AB / RSP'] || ''}">${player['AB / RSP']}</td>
            <td data-label="AVG / RSP" class="${classes['AVG / RSP'] || ''}">${player['AVG / RSP'].toFixed(3)}</td>
            <td data-label="GPI">-</td>
            <td data-label="LD%" class="${classes['LD%'] || ''}">${player['LD%'].toFixed(1)}%</td>
            <td data-label="PU%" class="${classes['PU%'] || ''}">${player['PU%'].toFixed(1)}%</td>
            <td data-label="FB%" class="${classes['FB%'] || ''}">${player['FB%'].toFixed(1)}%</td>
            <td data-label="GB%" class="${classes['GB%'] || ''}">${player['GB%'].toFixed(1)}%</td>
            <td data-label="K%" class="${classes['K%'] || ''}">${player['K%'].toFixed(1)}%</td>
            <td data-label="BB%" class="${classes['BB%'] || ''}">${player['BB%'].toFixed(1)}%</td>
            <td data-label="H%" class="${classes['H%'] || ''}">${player['H%'].toFixed(1)}%</td>
            <td data-label="Strike">${player.Strike}</td>
            <td data-label="Foul">${player.Foul}</td>
            <td data-label="Ball">${player.Ball}</td>
            <td data-label="BIP">${player.BIP}</td>
            <td data-label="TP" class="${classes['TP'] || ''}">${player.TP}</td>
            <td data-label="P/PA" class="${classes['P/PA'] || ''}">${player['P/PA'] === '-' ? '-' : player['P/PA'].toFixed(2)}</td>
            <td data-label="BABIP" class="${classes['BABIP'] || ''}">${player['BABIP'] === '-' ? '-' : player['BABIP'].toFixed(3)}</td>
        `;
        tableBody.appendChild(row);
    });
});