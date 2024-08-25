// import React from 'react'

const ArticleList = ({ items }) => (
  <ul>
    {items.map(({ item }) => (
      <li key={item.id}>
        <img src={item.urls.small} alt={item.description} />
      </li>
    ))}
  </ul>
);

export default ArticleList;
