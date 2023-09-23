import axios from "axios";
import React, { useState } from "react";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  console.log(article._id);

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editContent ? editContent : article.content,
      date: article.date,
      updatedDate: Date.now(),
    };

    axios
      .put(`http://localhost:5000/articles/${article._id}`, data)
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'article :", error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/articles/${article._id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'article :", error);
      });
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : article.content}
          autoFocus
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button
          onClick={() => {
            if (window.confirm("Voulez-vous vraiment supprimer le message")) {
              handleDelete();
            }
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Article;
