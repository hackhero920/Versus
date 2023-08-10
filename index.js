import React, { useEffect, useState } from 'react';

function Card({ title, text, linkTitle, href, linkClassName, target, rel, onClick }) {
  return (
    <div className={`card ${linkClassName && 'card--red'}`}>
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        href={href}
        target={target}
        rel={rel}
        onClick={() => onClick(href)}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        const jsonData = await response.json();

        const newData = jsonData.map(item => ({
          id: item.id,
          title: item.title,
          linkTitle: item.link_title,
          href: item.link,
          text: `${item.body.en.substr(0, 50)}...`,
          linkClassName: item.id === 1 ? 'card__link--red' : '',
          target: item.id === 1 ? '_blank' : '',
        }));

        setCards(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  function analyticsTrackClick(url) {
    // Send clicked link URL to analytics
    console.log('Clicked link:', url);
  }

  return (
    <div>
      {cards.map(item => (
        <Card
          key={item.id}
          title={item.title.en}
          linkTitle={item.linkTitle}
          href={item.href}
          text={item.text}
          linkClassName={item.linkClassName}
          target={item.target}
          rel="noopener noreferrer"
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}
