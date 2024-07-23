import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => {
        console.log(video);
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
