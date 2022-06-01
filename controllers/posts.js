const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const Posts = require('../model/post');
const Users = require('../model/user');

const posts = {
  getPosts: handleErrorAsync(async (req, res, next) => {
    /* #swagger.tags = ['Posts - 貼文']
       #swagger.description = '取得全部貼文'
       #swagger.responses[200] = {
          description: 'some description...',
          schema: {
            "status": true,
            "data": [
              {
                "_id": "627619338c3106b48eb8028d",
                "name": "Leo",
                "tags": [ "LINE" ],
                "type": "person",
                "content": "測試關聯資料1",
                "image": "",
                "user": "6276188c96948611538e8ee6",
                "likes": 0,
                "createdAt": "2022-05-07T07:01:07.951+00:00",
                "__v": 0
              }
            ]
          }
        }
    */

    const timeSort = req.query.timeSort == 'asc' ? 'createdAt' : '-createdAt';
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const post = await Posts.find(q)
      .populate({
        path: 'user',
        select: 'name photo ',
      })
      .sort(timeSort);
    // asc 遞增(由小到大，由舊到新) createdAt ;
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    handleSuccess(res, post);
  }),
  createdPosts: handleErrorAsync(async (req, res, next) => {
    /* #swagger.tags = ['Posts - 貼文']
       #swagger.description = '取得全部貼文'
       #swagger.parameters['body'] = {
         in: "body",
         type: "object",
         description: '資料格式',
         schema: {
           "$user": '627d29fd00d50edee2ecbb34',
           "$content": '測試關聯資料1'
         }
        }
        #swagger.responses[200] = {
          description: 'some description...',
          schema: {
            "status": true,
            "data": [
              {
                "_id": "627d29fd00d50edee2ecbb34",
                "user": "627d29fd00d50edee2ecbb34",
                "content": "測試關聯資料1",
                "image": "",
                "likes": 0,
                "comments": "",
                "createdAt": "2022-05-07T07:01:07.951+00:00",
              }
            ]
          }
        }
    */

    let { user, content, image } = req.body;

    console.log(user);

    if (typeof user === undefined || user === null || user.trim() === '') {
      return next(appError(404, '查無此 id', next));
    }

    if (
      typeof content === undefined ||
      content === null ||
      content.trim() === ''
    ) {
      return next(appError(400, '你沒有填寫 content 資料', next));
    }

    try {
      const checkUser = await Users.findById(user);

      console.log(checkUser);
      if (!checkUser) {
        return next(appError(404, '查無此 id', next));
      }

      user = user.trim();
      content = content.trim();

      const newPost = await Posts.create({
        user,
        content,
        image,
      });

      handleSuccess(res, newPost);
    } catch (err) {
      next(appError(404, '查無此 id', next));
    }
  }),
};

module.exports = posts;
