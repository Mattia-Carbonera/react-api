import { useState, useEffect } from "react";
import "./css/App.css";

function App() {
  const [fetchDataPosts, setfetchDataPosts] = useState([]);

  const fetchPost = () => {
    fetch("http://127.0.0.1:3000/posts/")
      .then((res) => res.json())
      .then((data) => {
        const articlesArray = data[1];
        const publishedArticles = articlesArray.filter(
          (article) => article.published === "yes"
        );
        setfetchDataPosts(publishedArticles);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (fetchDataPosts.length > 0) {
      setArticleList(fetchDataPosts);
    }
  }, [fetchDataPosts]);

  const filteredPublishedArticles = fetchDataPosts.filter((artic) => {
    return artic.published === true;
  });

  const [articlesList, setArticleList] = useState(filteredPublishedArticles);

  // articles create
  const [articleField, setArticleField] = useState({
    title: "",
    author: "",
    published: "",
    image: "",
    category: "",
    content: "",
    tag: "tag prova",
  });

  // click handler
  const handleInputChange = (e) => {
    const newArticlesData = {
      ...articleField,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    };

    setArticleField(newArticlesData);
  };

  // submit handler fonm
  const articlesListSubmitHandler = (e) => {
    e.preventDefault();

    const newArticleList = [...articlesList];
    newArticleList.push({
      title: e.target.title.value,
      author: e.target.author.value,
      published: e.target.published.value,
      image: e.target.image.value,
      category: e.target.category.value,
      content: e.target.content.value,
    });

    const newArticleListFiltered = newArticleList.filter(
      (el) => el.published != "no"
    );

    setArticleList(newArticleListFiltered);
  };

  // delete post
  const deletePost = (id) => {
    fetch("http://127.0.0.1:3000/posts/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setArticleList(data);
      });
  };

  // handle publish article select
  const handlerPublishArticle = (e) => {
    console.log(e.target.value);
  };

  // edit item handler
  const editItem = (modifyArticle, index) => {
    // const modifyArticleList = [...articlesList];
    // const newModifyArray = modifyArticleList.map((articleItem) =>
    //   articleItem == modifyArticle
    //     ? {
    //         title: "a",
    //         author: "s",
    //         published: "yes",
    //         image: "d",
    //         category: "f",
    //         content: "g",
    //       }
    //     : articleItem
    // );
    // setArticleList(newModifyArray);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Form</h1>
        </div>

        <form onSubmit={articlesListSubmitHandler}>
          <input
            type="text"
            name="title"
            value={articleField.title}
            onChange={handleInputChange}
            placeholder="Titolo"
          />
          <input
            type="text"
            name="author"
            value={articleField.author}
            onChange={handleInputChange}
            placeholder="Autore"
          />
          <input
            type="text"
            name="image"
            value={articleField.image}
            onChange={handleInputChange}
            placeholder="image"
          />
          <input
            type="text"
            name="category"
            value={articleField.category}
            onChange={handleInputChange}
            placeholder="category"
          />
          <input
            className="content-input"
            type="text"
            name="content"
            value={articleField.content}
            onChange={handleInputChange}
            placeholder="content"
          />
          <select
            onChange={handleInputChange}
            name="published"
            id="select-published"
          >
            <option value="">Pubblicazione</option>
            <option value="no">Salva come bozza</option>
            <option value="yes">Pubblica Articolo</option>
          </select>

          <div className="checkbox-tag-container">
            <input
              key={1}
              onChange={handleInputChange}
              value={"tag1"}
              name="checkTag"
              type="checkbox"
              className="check-tag-uno"
            />
            <label htmlFor="check-tag-uno">Tag1</label>
            <input
              key={2}
              onChange={handleInputChange}
              value={"tag2"}
              name="checkTag"
              type="checkbox"
              className="check-tag-due"
            />
            <label htmlFor="check-tag-due">Tag2</label>
            <input
              key={3}
              onChange={handleInputChange}
              value={"tag3"}
              name="checkTag"
              type="checkbox"
              className="publish-control"
            />
            <label htmlFor="publish-control">Tag3</label>
          </div>

          <button>Crea</button>
        </form>

        <hr />

        <div className="articles-section">
          <ul>
            {articlesList.map((article, index) => (
              <div key={index} className="card">
                <li>
                  <div className="article-container">
                    <div className="article-content">
                      <img src={article.image} alt="Image" />
                      <h2>{article.title}</h2>
                      <span>{article.author}</span>
                      {/* <span>{article.published}</span> */}
                      <span>{article.tags}</span>
                      <span>{article.content}</span>
                    </div>
                    <div className="edit-card">
                      <div className="delete-button">
                        <button
                          className="button d-button"
                          onClick={() => deletePost(article.id)}
                        >
                          Elimina
                        </button>
                      </div>
                      {/* <div className="edit-button">
                        <button
                          onClick={() => deleteItemHandler(article)}
                          className="button"
                        >
                          <i className="fa-solid fa-trash trash"></i>
                        </button>
                        <button
                          onClick={() => editItem(article, index)}
                          className="button"
                        >
                          <i className="fa-solid fa-pen-to-square edit"></i>
                        </button>
                      </div>
                      <div>
                        <div className="edit-input">
                          <input
                            type="text"
                            onChange={handleInputChange}
                            name="modify"
                            placeholder="Modifica"
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
