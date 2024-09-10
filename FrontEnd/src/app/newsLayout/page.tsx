"use client";

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Align content to fill the available space
    height: '100%', // Ensure the card takes full height of its container
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}));

const NewsLayout = () => {
  const classes = useStyles();
  const [cardHeights, setCardHeights] = useState({});

  // Sample news data
  const newsData = [
    { title: 'News 1', description: 'Description for News 1 Description for News 1Description for News 1Description for News 1for News 1 Description for News 1Description for News 1Description for News for News 1 Description for News 1Description for News 1Description for News ' },
    { title: 'News 2', description: 'Description for News 2' },
    { title: 'News 3', description: 'Description for News 3' },
    { title: 'News 1', description: 'Description for News 1 Description for News 1Description for News 1Description for News 1for News 1 Description for News 1Description for News 1Description for News for News 1 Description for News 1Description for News 1Description for News ' },
    { title: 'News 2', description: 'Description for News 2' },
    { title: 'News 3', description: 'Description for News 3' },
    { title: 'News 1', description: 'Description for News 1 Description for News 1Description for News 1Description for News 1for News 1 Description for News 1Description for News 1Description for News for News 1 Description for News 1Description for News 1Description for News ' },
    { title: 'News 2', description: 'Description for News 2' },
    { title: 'News 3', description: 'Description for News 3' },
    { title: 'News 1', description: 'Description for News 1 Description for News 1Description for News 1Description for News 1for News 1 Description for News 1Description for News 1Description for News for News 1 Description for News 1Description for News 1Description for News ' },
    { title: 'News 2', description: 'Description for News 2' },
    { title: 'News 3', description: 'Description for News 3' },
    // Add more news items as needed
  ];

  interface CardHeights {
    [key: number]: number;
  }
  

  useEffect(() => {
    const updatedCardHeights: CardHeights = {};
    newsData.forEach((news, index) => {
      const cardContent = document.getElementById(`card-content-${index}`);
      if (cardContent) {
        updatedCardHeights[index] = cardContent.clientHeight;
      }
    });
    setCardHeights(updatedCardHeights);
  }, [newsData]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {newsData.map((news, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={classes.card}>
              <CardContent id={`card-content-${index}`}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {news.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {news.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewsLayout;
