import React, { useState } from 'react';
import styled from 'styled-components';

// --- STYLES ---
const Container = styled.div`
  min-height: 100vh;
  background-color: #0b0e14;
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 12px 20px;
  border-radius: 6px;
  border: 1px solid #333;
  background: #1a1e26;
  color: white;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 25px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover { background: #0056b3; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 900px;
`;

const StatCard = styled.div`
  background: #1a1e26;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #007bff;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #a0a0a0;
  margin-top: 5px;
`;

// --- LOGIC ---
function App() {
  const [nickname, setNickname] = useState('');
  const [stats, setStats] = useState(null);

  const searchPlayer = async () => {
    try {
      const response = await fetch(`https://fortnitetrackerpl.onrender.com/api/player/${nickname}`);
      const data = await response.json();
      
      if (data.data) {
        setStats(data.data);
      } else {
        alert("Nie znaleziono gracza!");
      }
    } catch (e) { 
      console.error(e);
      alert("Błąd serwera - sprawdź konsolę (F12)"); 
    }
  };

  return (
    <Container>
      <h1>Fortnite stats checking</h1>
      <SearchBox>
        <Input placeholder="Podaj nick..." value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <Button onClick={searchPlayer}>SZUKAJ</Button>
      </SearchBox>
      
      {stats && stats.stats?.all?.overall && (
        <Grid>
          <StatCard>
            <StatValue>{stats.battlePass?.level || '0'}</StatValue>
            <StatLabel>Poziom konta</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.stats.all.overall.wins}</StatValue>
            <StatLabel>Wygrane</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.stats.all.overall.kills}</StatValue>
            <StatLabel>Łączne zabójstwa</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.stats.all.overall.kd}</StatValue>
            <StatLabel>K/D Ratio</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.stats.all.overall.matches}</StatValue>
            <StatLabel>Rozegrane mecze</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{Math.round(stats.stats.all.overall.minutesPlayed / 60)}</StatValue>
            <StatLabel>Godziny w grze</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>
              {stats.stats.all.rankedSolo?.rank || 
               stats.stats.all.rankedDuo?.rank || 
               stats.stats.all.rankedSquad?.rank || 
               'Brak'}
            </StatValue>
            <StatLabel>Najwyższa Ranga</StatLabel>
          </StatCard>
        </Grid>
      )}
    </Container>
  );
}

export default App;