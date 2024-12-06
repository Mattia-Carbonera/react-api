import { useState, useEffect } from "react";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
const serverHosting = import.meta.env.VITE_SERVER_HOSTING;

function App() {
  const [initialArticleArray, setInitialArticleArray] = useState([]);
  const [fetchDataPosts, setfetchDataPosts] = useState([]);

  const fetchPost = () => {
    fetch(`${serverHosting}/posts/`)
      .then((res) => res.json())
      .then((data) => {
        const articlesArray = data[1];
        const publishedArticles = articlesArray.filter(
          (article) => article.published === "yes"
        );
        setInitialArticleArray(articlesArray);
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

  let totalTags = [];
  initialArticleArray.forEach((article) => {
    article.tags.map((tag) => {
      if (!totalTags.includes(tag)) {
        totalTags.push(tag);
      }
    });
  });

  const filteredPublishedArticles = fetchDataPosts.filter((artic) => {
    return artic.published === "yes";
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
    tag: [],
  });

  // click handler
  const handleInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(e.target.checked);

    const newArticlesData = {
      ...articleField,
      [e.target.name]: e.target.checked,
      [e.target.name]: e.target.value,

      // [e.target.name]: e.target.checked,
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
      tags: checkedTags,
    });
    console.log(newArticleList);

    const newArticleListFiltered = newArticleList.filter(
      (el) => el.published != "no"
    );

    setArticleList(newArticleListFiltered);
  };

  // delete post
  const deletePost = (id) => {
    fetch(`${serverHosting}/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setArticleList(data);
      });
  };

  // handle publish article select
  const handlerPublishArticle = (e) => {
    // console.log(e.target.value);
  };

  // edit item handler
  const handleEditItem = (modifyArticle, index) => {
    const modifyArticleList = [...articlesList];
    const newModifyArray = modifyArticleList.map((articleItem) =>
      articleItem == modifyArticle
        ? {
            id: index,
            title: modifyTitle,
            content: articleItem.content,
            image: articleItem.image,
            tags: articleItem.tags,
            published: articleItem.published,
          }
        : articleItem
    );
    setArticleList(newModifyArray);
  };

  const [modifyTitle, setModifyTitle] = useState("");
  const handleTitleChange = (e) => {
    // console.log(e.target.value);
    setModifyTitle(e.target.value);
  };

  let checkedTags = [];

  const handleInputCheckbox = (e) => {
    console.log(e.target.name);
    console.log(e.target.checked);

    if (e.target.checked) checkedTags.push(e.target.value);

    return console.log(checkedTags);
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

          <h3 className="select-tag-name">Select Tags</h3>
          <div className="checkbox-tag-container">
            {totalTags.map((tag, index) => {
              return (
                <>
                  <div key={index} className={`checkbox checkbox-${index}`}>
                    <input
                      onChange={handleInputCheckbox}
                      value={tag}
                      name={`tag-${tag}`}
                      type="checkbox"
                      className={`check-tag-${index}`}
                    />
                    <label htmlFor={`check-tag-${index}`}>{tag}</label>
                  </div>
                </>
              );
            })}
          </div>

          <button className="btn btn-primary">Crea</button>
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
                      <ul>
                        {/* {article.tags.map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))} */}
                        <li>{article.tags}</li>
                      </ul>
                      <span>{article.content}</span>
                    </div>
                    <div className="edit-card">
                      <div className="delete-button">
                        <button
                          className="button d-button btn btn-danger"
                          onClick={() => deletePost(article.id)}
                        >
                          Elimina
                        </button>
                      </div>
                      <div className="edit-button">
                        <button
                          // onClick={() => editItem(article, index)}
                          onClick={() => handleEditItem(article, index)}
                          className="button"
                        >
                          <i className="fa-solid fa-pen-to-square edit"></i>
                        </button>
                      </div>
                      <div>
                        <div className="edit-input">
                          <input
                            type="text"
                            onChange={handleTitleChange}
                            name="modify"
                            placeholder="Modifica"
                          />
                          {/* MODAL */}

                          {/* _________ */}
                        </div>
                      </div>
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
