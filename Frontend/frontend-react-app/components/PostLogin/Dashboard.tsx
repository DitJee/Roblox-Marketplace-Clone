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
    setGameInfo(_gameInfo);
    const _categoryInfo = await gameCategoryService.getAllGameCategories();
    setCategoryInfo(_categoryInfo);

    //replace id category with string category
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
      {[
        'Fighting & Battle',
        'Role-Playing',
        'Action',
        'Adventure',
        'Collector Simulator',
        'Tycoon',
        'Tycoon & Strategy',
      ].map((context) => {
        return (
          <div key={context}>
            <h4 className="mt-8 text-3xl font-normal leading-normal  mb-2 dark:text-gray-900">
              {context}
            </h4>
            <div
              className="grid grid-cols-4 gap-12
                    sm:grid-cols-5 
                    lg:grid-cols-6
                    xl:grid-cols-8 
                    "
            >
              {gameInfo.map((info, index) => {
                if (index < 5)
                  // ! hardcoded
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
      })}
    </div>
  );
};

export default Dashboard;
