import React from "react"
import styled, { css, keyframes } from "react-emotion"

interface PlaceholderProps {
  width?: number
  className?: string
  style?: any
}

const animations = {
  blink: keyframes`
		from {
			background: #eee;
		}
		to {
			background: #e74c3c;
		}
	`,
  shake: keyframes`
		0 {
			transform: translate(0, 0) rotate(0);
		}
		20% {
			transform: translate(-10px, 0) rotate(-20deg);
		}
		30% {
			transform: translate(10px, 0) rotate(20deg);
		}
		50% {
			transform: translate(-10px, 0) rotate(-10deg);
		}
		60% {
			transform: translate(10px, 0) rotate(10deg);
		}
		100% {
			transform: translate(0, 0) rotate(0);
		}
	`,
  fall: keyframes`
		0% {
			top: -200px;
		}
		60% {
			top: 0;
		}
		80% {
			top: -20px;
		}
		100% {
			top: 0;
		}
	`,
}

const Pokeball = styled("div")`
  position: relative;
  margin: 0 auto;
  width: ${(props: PlaceholderProps) => props.width}px;
  height: ${(props: PlaceholderProps) => props.width}px;
  background: #fff;
  border: ${(props: PlaceholderProps) => props.width! / 20}px solid #000;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -${(props: PlaceholderProps) => props.width! / 20}px ${(
      props: PlaceholderProps
    ) => props.width! / 20}px 0 ${(props: PlaceholderProps) =>
      props.width! / 20}px #ccc;
  text-align: initial;
  animation: ${animations.fall} 0.25s ease-in-out,
    ${animations.shake} 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 3;

  &::before,
  &::after {
    content: "";
    position: absolute;
  }

  &::before {
    background: red;
    width: 100%;
    height: 50%;
  }

  &::after {
    top: calc(50% - ${(props: PlaceholderProps) => props.width! / 20}px);
    width: 100%;
    height: ${(props: PlaceholderProps) => props.width! / 10}px;
    background: #000;
  }
`

const PokeballButton = styled("div")`
  position: absolute;
  top: calc(
    50% - ${(props: PlaceholderProps) => props.width! / 3.333333 / 2}px
  );
  left: calc(
    50% - ${(props: PlaceholderProps) => props.width! / 3.333333 / 2}px
  );
  width: ${(props: PlaceholderProps) => props.width! / 3.333333}px;
  height: ${(props: PlaceholderProps) => props.width! / 3.333333}px;
  background: #7f8c8d;
  border: ${(props: PlaceholderProps) => props.width! / 20}px solid #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 ${(props: PlaceholderProps) => props.width! / 20}px black;
  animation: ${animations.blink} 0.5s alternate 7;
`

const Container = styled("div")`
  margin-top: ${({ width }: { width: number }) => width}px;
  margin-bottom: ${({ width }: { width: number }) => width}px;
`

const Placeholder = (
  { width = 50, className = "", style }: PlaceholderProps = {
    width: 50,
    className: "",
  }
) => (
  <Container
    className={className}
    width={width}
    title="Thumbnail not available"
  >
    <Pokeball width={width}>
      <PokeballButton width={width} />
    </Pokeball>
  </Container>
)

export default Placeholder
