import { GameInfo } from "../interfaces";

class GameGenerator {
  public GenerateGameInfo = (numberToGenerate: number) => {
    const games: GameInfo[] = [];

    for (let index = 1; index < numberToGenerate; index++) {
      const randomViewCount = this.randomIntFromInterval(1, 50000);
      const randomLikePercentage = this.randomIntFromInterval(1, 100);
      const randomCategory = this.randomIntFromInterval(1, 7);
      const game: GameInfo = this.getGameInfo(
        index,
        randomLikePercentage,
        randomViewCount,
        randomCategory
      );
      games.push(game);
    }

    console.log(games);
  };

  private randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  private getGameInfo = (
    thumbnailId: number,
    _likePercentage: number,
    _viewCount: number,
    _category: number
  ): GameInfo => {
    return {
      thumbnail: `https://picsum.photos/id/${thumbnailId}/200/300`,
      name: `Game_${thumbnailId}`,
      likePercentage: _likePercentage,
      viewCount: _viewCount,
      category: _category,
    };
  };
}

// path to script src/scripts/gamesGenerator.script.ts
const gameGenerator = new GameGenerator();
gameGenerator.GenerateGameInfo(100);
