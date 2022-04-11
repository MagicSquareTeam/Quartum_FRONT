import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://quartum.herokuapp.com/api/test/';
const API_URL_ARTICLE_DEBUG = 'http://localhost:8080/api/articles/';
const API_URL_PUBLIC_DEBUG = 'http://localhost:8080/api/public/';

export class ArticleService {
  publicNewArticle(article) {
    return axios.post(API_URL_ARTICLE_DEBUG + 'addNewArticle', article, {headers: authHeader()})
  }

  getAllArticles() {
    return axios.get(API_URL_PUBLIC_DEBUG + 'getAllArticles',{headers: authHeader()})
  }

  getUserArticles(id){
    return axios.get(API_URL_ARTICLE_DEBUG + 'getUserArticles/' + id,{headers: authHeader()})
  }
}

export default new ArticleService();
