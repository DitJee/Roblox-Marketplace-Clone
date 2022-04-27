import React, { useEffect, useState } from 'react';
import { CategoryInfo, GameInfo } from '../../interfaces';
import gameCategoryService from '../../Services/game/gameCategory.service';
import gameService from '../../Services/game/games.service';
import Card from './Card';

const Dashboard = () => {
  const [gameInfo, setGameInfo] = useState([]);
  const [gameCategoryInfo, setCategoryInfo] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);

  const getInfo = async () => {
    const _gameInfo = await gameService.getAllGames();
    console.log(_gameInfo);
    setGameInfo(_gameInfo);
    console.log(gameInfo);
    // const _categoryInfo = await gameCategoryService.getAllGameCategories();
    // setCategoryInfo(_categoryInfo);

    // replace id category with string category
    // gameInfo.forEach((game) => {
    //   gameCategoryInfo.forEach((cat: CategoryInfo) => {
    //     if (game.category === cat.id) {
    //       let tempInfo = game;
    //       tempInfo.category = cat.category;
    //     }
    //   });
    // });
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
      <div
        className="grid grid-cols-4 gap-12
          sm:grid-cols-5 
          lg:grid-cols-6
          xl:grid-cols-8 
          "
      >
        {/* {gameCategoryInfo.map((info) => {
          switch (info.id) {
            case 1:
              gameInfo.map((info) => {});
              return;
              break;
            case 2:
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
              break;
            case 7:
              break;
            default:
              break;
          }
        })} */}
        {gameInfo.map((info) => {
          return (
            <Card
              thumbnail={info.thumbnail}
              name={info.name}
              likePercentage={info.likePercentage}
              viewCount={info.viewCount}
              category={info.category}
            ></Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
