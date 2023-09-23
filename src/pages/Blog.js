import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [valider, setValider] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setBlogData(res.data.articles.map((article) => article)))
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    if (content.length < 2) {
      setError(true);
    } else {
      axios.post("http://localhost:5000/articles", {
        author: author,
        content: content,
        date: Date.now(),
      });
      setError(false);
      setValider(true);
      setAuthor("");
      setContent("");
      getData();
    }
  };

  return (
    <div className="blog-container">
      <Logo />
      <Navigation />
      <h1>Ecris ton idée</h1>
      <h1>↓</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Nom"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractère</p>}
        {valider && <p className="valider">Le message à bien été poster</p>}
        <input type="submit" value="envoyer" />
      </form>
      <h1>Nos idée</h1>
      <h1>↓</h1>
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article._id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default Blog;
