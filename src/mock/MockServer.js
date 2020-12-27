import floors from './floors.json'
import remmonds from './remmonds.json'
import Rank from './Rank.json'
// import like from './findYouLike.json'
import link from './findYouLike.json'
import Mock from 'mockjs'

Mock.mock('/mock/remmonds',{code:200,data:remmonds})
Mock.mock('/mock/floors',{code:200,data:floors})
Mock.mock('/mock/Rank',{code:200,data:Rank})
Mock.mock('/mock/like',{code:200,data:link})


// mock 如果第二个值直接传入json文件 ,那么数据名就是传入的文件名