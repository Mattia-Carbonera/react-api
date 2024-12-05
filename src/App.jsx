import { useState } from "react";
import "./css/App.css";
import articles from "./db/articles";

function App() {
  const filteredPublishedArticles = articles.filter((artic) => {
    return artic.published == "yes";
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

  // name editor articles
  const [inputChange, setInputChange] = useState("");

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

    // console.log(e.target.name, e.target.value);
    // console.log(newArticlesData);

    setArticleField(newArticlesData);
    console.log(articleField);
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
    // console.log("title: " + e.target.title.value);
    // console.log("published: " + e.target.value);

    const newArticleListFiltered = newArticleList.filter(
      (el) => el.published != "no"
    );

    setArticleList(newArticleListFiltered);
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

  // delete title handler
  const deleteItemHandler = (articleDeleted) => {
    const deletedArticles = articlesList.filter((article) => {
      return article != articleDeleted;
    });

    setArticleList(deletedArticles);
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
              <li key={index}>
                <div className="article-container">
                  <div className="article-content">
                    <img src={article.image} alt="Image" />
                    <h2>{article.title}</h2>
                    <span>{article.author}</span>
                    <span>{article.published}</span>
                    <span>{article.category}</span>
                    <span>{article.content}</span>
                  </div>
                  <button
                    onClick={() => deleteItemHandler(article)}
                    className="button"
                  >
                    <i className="fa-solid fa-trash trash"></i>
                  </button>

                  <div>
                    <button
                      onClick={() => editItem(article, index)}
                      className="button"
                    >
                      <i className="fa-solid fa-pen-to-square edit"></i>
                    </button>
                    <input
                      type="text"
                      onChange={handleInputChange}
                      name="modify"
                      placeholder="Modifica"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
