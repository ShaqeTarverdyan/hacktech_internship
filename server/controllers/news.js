const News = require('../models/news');
const Types = require('../models/types');
const Admin = require('../models/admin');
const { validationResult } = require('express-validator');

exports.getallNews = (req,res,next) => {
    News
        .findAll()
        .then(allNews => {
            res.status(200).json({
              message: 'Fetched all news successfuly.',
              allNews: allNews
            })
        })
        .catch(err => {
          if(!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        })
};

exports.addNews = (req,res,next) => {
    const { title, content, typeId, admin_id } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation Failed!.entered data is not correct!')
        error.statusCode = 422;
        throw error;
    } 
    News.create({
        title: title,
        content: content,
        typeId: typeId,
    })
    .then(result => {
        res.status(200).json({
            message: 'successfuly added !',
            news: result
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.updateNews = (req,res,next) => {
  const newsId = req.params.newsId;
  const { title, content, newsType, admin_id  } = req.body;
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Validation Failed!.entered data is not correct!')
      error.statusCode = 422;
      throw error;
      
    }
  News.findOne({
    where: {
      id: newsId
    }
  })
  .then(news => {
    if(!news) {
      const error = new Error('Could not find admin !');
      error.statusCode = 404;
      throw error;
    }
    news.title = title,
    news.content = content,
    news.newsType = newsType,
    news.admin_id = admin_id
    return news.save();
  })
  .then(updatedNews => {
    res.status(200).json({
      message: 'News updated successfuly !',
      news: updatedNews
    })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.deleteNews = (req,res,next) => {
  const newsId = req.params.newsId;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  }
  News
    .destroy({
      where: {
        id: newsId
      }
    })
    .then(result => {
      res.status(200).json({
          message: 'Successfuly deleted!',
          isDeleted: result
        });
    })
    .catch(err => {
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
};

exports.getCurrentNews = (req,res, next) => {
  const newsId = req.params.newsId;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  };
  News.findOne({
    where: {
      id: newsId
    }
  })
  .then(news => {
    if(!news) {
      const error = new Error('Could not find current news !');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({news: news})
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.getTypes = (req, res, next) => {
  Types
  .findAll()
  .then(types => {
      res.status(200).json({
        message: 'Fetched Types successfuly.',
        types: types
      })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}