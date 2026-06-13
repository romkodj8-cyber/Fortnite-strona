const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Endpoint do pobierania statystyk
app.get('/api/player/:nickname', async (req, res) => {
    const { nickname } = req.params;
    console.log(`Szukam gracza: ${nickname}`);
    
    try {
        // Używamy oficjalnego endpointu v2
        const response = await axios.get(`https://fortnite-api.com/v2/stats/br/v2?name=${nickname}`, {
            headers: {
                'Authorization': 'a0490736-2472-4e35-81a9-5bf33bf8ca59'
            }
        });
        
        // Zwracamy czyste dane do frontendu
        res.json(response.data);
    } catch (error) {
        // Logowanie błędu do Twojego terminala, żebyśmy wiedzieli co się dzieje
        if (error.response) {
            console.error("API zwróciło błąd:", error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error("Błąd połączenia:", error.message);
            res.status(500).json({ error: 'Błąd połączenia z API' });
        }
    }
});

app.listen(3001, () => {
    console.log('Serwer uruchomiony na http://localhost:3001');
});