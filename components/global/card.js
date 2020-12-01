import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

let StyledCard = styled(Card)`
  border-radius: 15px;
  margin: 0 !important;
  width: 100%;
`;

let StyledImg = styled(Card.Img)`
  border-radius: 15px 15px 0 0;
`;

let StyledTitle = styled(Card.Title)`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 426px) {
    font-size: 18px;
  }
`;

let StyledText = styled(Card.Text)`
  font-size: 17px;
  font-weight: lighter;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 426px) {
    font-size: 15px;
  }
`;

let StyledBadge = styled(Badge)`
  display: ${(props) => props.display};
  bottom: 0;
  font-size: 15px;
  color: white;
  background-color: ${(props) => props.color};
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  @media (max-width: 426px) {
    font-size: 10px;
  }
`;

const ImageContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const StyledDiv = styled.div`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

let LikeButton = styled(Button)`
  float: right;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
  border: none;
  position: absolute;
  right: 0;
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
  let router = useRouter();
  let urlPath = router.pathname;
  const [like, setLike] = useLocalStorage(`${props.name}`, "🤍");
  const [clubType, setClubType] = useState(checkPath());

  function checkPath() {
    if (urlPath.includes("central-clubs")) {
      return "central-clubs";
    } else if (urlPath.includes("independent-clubs")) {
      return "independent-clubs";
    } else {
      return "groups";
      return "groups";
    }
  }

  return (
    <div>
      <StyledCard>
        <Link
          category1={props.category1}
          href={`/${clubType}/${props.campusData}/${props.id}`}
        >
          <StyledDiv>
            <ImageContainer>
              <StyledBadge
                display={
                  props.category1 === "준중앙동아리" ? "absolute" : "none"
                }
                color={props.campus === "명륜" ? "green" : "#4d5dff"}
                variant="warning"
              >
                {props.category1}
              </StyledBadge>
              <StyledImg
                variant="top"
                src={`https://admin.skklub.com/img/logo/${props.logoPath}`}
                onError={(e) => {
                  e.target.src = "../alt.jpg";
                }}
              />
            </ImageContainer>

            <Card.Body>
              <StyledTitle>{props.name}</StyledTitle>

              <StyledText>
                {(props.category2 === " ")?<br></br>:props.category2}
                <br></br>
                {(props.category3 === " ")?<br></br>:props.category3}
              </StyledText>
            </Card.Body>
          </StyledDiv>
        </Link>
      </StyledCard>
    </div>
  );
}

export default ClubCard;
