export const saveGameResult = (playerLost, batteriesUsed ) => {
    const gameObject = {
        date: new Date().toISOString(),
        player_won: !playerLost,
        batteries_used: batteriesUsed
    };
    return gameObject; 
}