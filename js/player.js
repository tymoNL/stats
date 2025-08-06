// Neem aan dat de `spelers`-array beschikbaar is (kopieer deze naar een apart JS-bestand of include via een <script> tag)
document.addEventListener('DOMContentLoaded', () => {
    // Haal de speler's naam uit de URL queryparameter
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('name');
    const player = spelers.find(p => p.Name === playerName);

    if (!player) {
        document.getElementById('player-name').textContent = 'Player Not Found';
        return;
    }

    // Vul de spelergegevens in
    document.getElementById('player-name').textContent = player.Name;
    document.getElementById('avg').textContent = player.AVG.toFixed(3);
    document.getElementById('obp').textContent = player.OBP.toFixed(3);
    document.getElementById('slg').textContent = player.SLG.toFixed(3);
    document.getElementById('ops').textContent = player.OPS.toFixed(3);
    document.getElementById('pa').textContent = player.PA;
    document.getElementById('ab').textContent = player.AB;
    document.getElementById('h').textContent = player.H;
    document.getElementById('rbi').textContent = player.RBI;
    document.getElementById('sb').textContent = player.SB;
    document.getElementById('cs').textContent = player.CS;
    document.getElementById('sbp').textContent = player.SB + player.CS > 0 ? ((player.SB / (player.SB + player.CS)) * 100).toFixed(0) + '%' : '0%';

    // Staafdiagram voor key stats (AVG, OBP, SLG, OPS)
    new Chart(document.getElementById('keyStatsChart'), {
        type: 'bar',
        data: {
            labels: ['AVG', 'OBP', 'SLG', 'OPS'],
            datasets: [{
                label: 'Key Stats',
                data: [player.AVG, player.OBP, player.SLG, player.OPS],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6'],
                borderColor: ['#2c3e50', '#27ae60', '#c0392b', '#8e44ad'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, max: 1 }
            },
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Key Batting Stats' }
            }
        }
    });

    // Donutgrafiek voor slagverdeling (1B, 2B, 3B, HR)
    new Chart(document.getElementById('hitDistributionChart'), {
        type: 'doughnut',
        data: {
            labels: ['Singles (1B)', 'Doubles (2B)', 'Triples (3B)', 'Home Runs (HR)'],
            datasets: [{
                data: [player['1B'], player['2B'], player['3B'], player.HR],
                backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6'],
                borderColor: ['#2c3e50', '#27ae60', '#c0392b', '#8e44ad'],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: { display: true, text: 'Hit Distribution' }
            }
        }
    });

    // Radardiagram voor percentages (GB%, LD%, FB%, K%, BB%, H%)
    new Chart(document.getElementById('pitchTypeChart'), {
        type: 'radar',
        data: {
            labels: ['GB%', 'LD%', 'FB%', 'K%', 'BB%', 'H%'],
            datasets: [{
                label: 'Percentages',
                data: [player['GB%'], player['LD%'], player['FB%'], player['K%'], player['BB%'], player['H%']],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: '#3498db',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: { beginAtZero: true, max: 100 }
            },
            plugins: {
                title: { display: true, text: 'Performance Percentages' }
            }
        }
    });
});