export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // Perist data in localStorage
    this.persitData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);

    // Perist data in localStorage
    this.persitData();

    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  } 

  getNumLikes() {
    return this.likes.length;
  }

  persitData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // Restoring likes from the localStorage
    if (storage) this.likes = storage;
  }
}
