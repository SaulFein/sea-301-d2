(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // TODO: Middleware for grabbing one article by ID:
  articlesController.loadById = function(ctx, next) { //creating loadById method on ariclesController object that takes a ctx object and a next function as params
    var articleData = function(article) { //declaring articleData function that takes article as a param. The article param is the id field and data vaule grabbed from findWhere.
      ctx.articles = article; //ctx.articls(Article.all) is set = article.
      next();// moves to the next function in routes.js
    };

    Article.findWhere('id', ctx.params.id, articleData); //grabs article from the DB with a field of id and its data value (ctx.params.id) and then runs the callback function articleData.
  };

  // TODO: Middleware for loading up articles by a certain author:
  articlesController.loadByAuthor = function(ctx, next) { //creating loadByAuthor method on ariclesController object that takes a ctx object and a next function as params
    var authorData = function(articlesByAuthor) { //declaring articleData function that takes articlesByAuthor as a param. The articlesByAuthor param is the author field and data vaule grabbed from findWhere.
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData); //grabs the Article by author from the webDB and its data value grabbed from findWhere method.
  };

  // TODO: Middleware for grabbing all articles with a certain category:
  articlesController.loadByCategory = function(ctx, next) {//creating loadByCategory method on ariclesController object that takes a ctx object and a next function as params
    var categoryData = function(articlesInCategory) { //declaring categoryData function that takes articlesInCategory as a param. The articlesInCategory param is the category field and data vaule grabbed from findWhere.
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData); //grabs the Article by category from the webDB and its data value(ctx.params.categoryName) grabbed from findWhere method.
  };

  // TODO: Middleware for grabbing ALL articles:
  articlesController.loadAll = function(ctx, next) { //creating loadAll method on ariclesController object that takes a ctx object and a next function as params
    var articleData = function(allArticles) { //declaring articleData function that takes allArticles as a param.
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) { //if there is anything in the Article.all array set ctx.artcles = to Article.all then move to next function
      ctx.articles = Article.all;
      next();
    } else { //if there is nothing in the Article.all array run Article.fetchAll with the funtion articleData as its parameter. Fetching all the artcles because they have not been populated yet.
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
