import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useLocalStorage } from "../hooks/useLocalStorage";

import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

let StyledCard = styled(Card)`
  border-radius: 15px;
  margin: 0 !important;
  width: 100%;
`;

let StyledImg = styled(Card.Img)`
  border-radius: 15px 15px 0 0;
`;

let StyledTitle = styled(Card.Title)`
  font-size: 1.2em;
  font-weight: bold;
  @media (max-width: 426px) {
    font-size: 1em;
  }
`;

let StyledText = styled(Card.Text)`
  font-size: 0.9em;
  font-weight: lighter;
`;

const StyledA = styled.div`
  text-decoration: none;
  &:hover ${StyledA} {
    cursor: pointer;
  }
`;

let LikeDiv = styled.div`
  
`;

let LikeButton = styled(Button)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  z-index: 100;
  border: none;
  position: absolute;
  background-color: transparent !important;
  font-size: 1.6em;
  &:hover {
    background-color: transparent !important;
    border: none;
  }
  &:focus {
    background-color: transparent !important;
    border: none;
    outline: none !important;
    outline-offset: none !important;
    box-shadow: none !important;
  }
  &:active {
    background-color: transparent !important;
    border: none !important;
    outline: none !important;
    outline-offset: none !important;
    box-shadow: none;
  }
`;

function ClubCard(props) {
  const [like, setLike] = useLocalStorage(`${props.name}`, "🤍");

  const router = useRouter();
  let univLocation;

  switch (router.pathname) {
    case "/seoul":
      univLocation = "seoul";
      break;
    case "/suwon":
      univLocation = "suwon";
      break;
    default:
      univLocation = "undefined";
  }

  return (
    <div>
      <StyledCard>
      <LikeButton
          onClick={() => {
            if (like === "❤️") {
              setLike("🤍");
              localStorage.removeItem(props.name);
            } else {
              setLike("❤️");
            }
          }}
          likeState={like}
        >
          {like}
        </LikeButton>
        <Link href={`/${univLocation}/${props.name}`}>
          <StyledA>
            <StyledImg
              variant="top"
              src={`../${univLocation}/${props.name}.jpg`}
              onError={(e) => {
                e.target.src = "../alt.jpg";
              }}
            />
            <Card.Body>
              <StyledTitle>{props.name}</StyledTitle>

              <StyledText>
                {props.category}
                <br></br>
                {props.campus}
              </StyledText>
            </Card.Body>
          </StyledA>
        </Link>
      </StyledCard>
    </div>
  );
}

console.log("initialized");

export default ClubCard;
