import React from "react"
import styled from "styled-components"
import { theme } from "../theme"
import pokeball from "../assets/icons/pokeball.png"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { energyImageMap } from "../helpers/imageMap"
import { IconImageMap } from "./IconImageMap"
import { IoIosStar as Rare } from "react-icons/io"
import { FaCircle as Common } from "react-icons/fa"
import { FaDiamond as Uncommon } from "react-icons/fa6"
import { TbStarsFilled as HyperRare } from "react-icons/tb"
import { TbStars as SuperRare } from "react-icons/tb"
import { BsStars as Special } from "react-icons/bs"

const Card = styled.div`
  height: 85%;
  width: 80%;
  border: 8px solid ${theme.lightBg};
  border-radius: 15px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const Image = styled.div`
  width: 80%;
  border: 4px solid ${theme.lightBg};
  border-radius: 15px;
  margin: auto;
  height: 35%;
`

const Details = styled.div`
  width: 80%;
  border: 1px dotted ${theme.primaryText};
  border-radius: 15px;
  margin: auto;
  height: 45%;
`

const MainImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TypeImageContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  width: 80%;
  display: flex;
  height: auto;
  justify-content: space-between;
  margin: 0px auto;
  align-items: flex-end;
`

const SubHeader = styled.div`
  width: 80%;
  display: flex;
  height: auto;
  justify-content: space-between;
  margin: 0px auto;
  align-items: flex-end;
`

const Footer = styled.div`
  width: 80%;
  display: flex;
  height: auto;
  justify-content: space-between;
  margin: 0px auto;
  align-items: flex-end;
`

const Name = styled.div`
  font-weight: 800;
  font-family: ${theme.fontFamily};
  text-transform: capitalize;
  width: auto;
  height: auto;
`

const TypeImage = styled.img`
  width: 25px;
  height: 25px;
`

const LeftContent = styled.div``
const MiddleContent = styled.div``
const RightContent = styled.div`
  display: flex;
`

const StockImage = styled.img<{ isCardImage: boolean }>`
  width: ${({ isCardImage }) => (isCardImage ? "150px" : "100px")};
  height: ${({ isCardImage }) => (isCardImage ? "150px" : "100px")};
  ${({ isCardImage }) =>
    !isCardImage &&
    "filter: brightness(0) saturate(100%) invert(34%) sepia(10%) saturate(0%) hue-rotate(134deg) brightness(97%) contrast(92%)"};
  opacity: 0.8;
`

export const CardPreview = () => {
  const { tempCard, tempSets } = useSelector((state: RootState) => state.root)

  const rarityImageMap: Record<string, any> = {
    common: <Common />,
    rare: <Rare />,
    uncommon: <Uncommon />,
    "hyper rare": <HyperRare />,
    "super rare": <SuperRare />,
    special: <Special />,
  }

  return (
    <>
      <Card>
        <Header>
          <Name>{tempCard.name ?? <></>}</Name>
          <TypeImageContainer>
            {tempCard.type && <TypeImage src={energyImageMap(tempCard.type)} />}
          </TypeImageContainer>
        </Header>
        <Image>
          <MainImageContainer>
            <StockImage
              isCardImage={tempCard.image}
              src={tempCard.image ?? pokeball}
            />
          </MainImageContainer>
        </Image>
        <Details>
          <p>{tempCard.set ?? <></>}</p>
          <p>{tempCard.setNumber ?? <></>}</p>
          <p>{tempCard.year ?? <></>}</p>
          <p>{tempCard.quantity ?? <></>}</p>
          <p>{tempCard.attribute ?? <></>}</p>
          <p>{tempCard.rarity ?? <></>}</p>
        </Details>
        <Footer>
          <SubHeader>
            <LeftContent></LeftContent>
            <MiddleContent>{tempCard.year ?? <></>}</MiddleContent>
            <RightContent>
              <SubHeader>
                {`${tempCard.setNumber ?? ""}${
                  "/" + Object.values(tempSets)[tempCard.set]?.totalCards ?? ""
                }`}
              </SubHeader>
              <SubHeader>
                {(tempCard.rarity && rarityImageMap[tempCard.rarity]) ?? ""}
              </SubHeader>
            </RightContent>
          </SubHeader>
        </Footer>
      </Card>
    </>
  )
}
