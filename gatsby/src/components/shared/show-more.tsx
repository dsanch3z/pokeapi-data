import React, { Component } from "react"
import styled from "react-emotion"

interface IShowMoreProps {
  children: any
}

interface IShowMoreState {
  open: boolean
}

const Root = styled("div")({
  margin: "2rem 0",
})

const FlexContainer = styled("div")({
  display: "flex",
  alignItems: "center",
})

const HorizontalLine = styled("div")({
  flexGrow: 1,
  height: 1,
  backgroundColor: "rgb(234, 234, 234)",
})

const Button = styled("button")({
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 4px 4px",
  cursor: "pointer",
  fontSize: "12px",
  textTransform: "uppercase",
  color: "rgb(102, 102, 102)",
  height: 28,
  backgroundColor: "rgb(255, 255, 255)",
  borderWidth: 0,
  borderStyle: "initial",
  borderColor: "initial",
  borderImage: "initial",
  padding: "5px 15px",
  borderRadius: "100px",
  outline: 0,
  transition: "all 0.2s ease 0s",
  "& svg": {
    marginLeft: 10,
    transition: "stroke 0.2s ease 0s",
  },
  "&:hover": {
    color: "black",
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 5px 9px",
  },
  "&:hover svg": {
    stroke: "black",
  },
})

const Content = styled("div")({
  overflow: "hidden",
  height: "auto",
  transition: "max-height 0.2s ease-out",
  maxHeight: 1200,
  "&.collapsed": {
    maxHeight: 0,
  },
  marginTop: 15,
})

const ChevronDown = ({ className }: any) => (
  <svg
    className={className}
    width="13"
    height="6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#979797"
    fillRule="evenodd"
    strokeLinecap="square"
  >
    <path d="M1.367.375l5.185 5.303M11.685.375L6.5 5.678" />
  </svg>
)

const ChevronUp = styled(ChevronDown)({
  transform: "translateY(-1px) rotate(180deg)",
})

export default class ShowMore extends Component<
  IShowMoreProps,
  IShowMoreState
> {
  state = {
    open: false,
  }

  handleClick = () =>
    this.setState(state => ({
      open: !state.open,
    }))

  render() {
    const { children } = this.props
    const { open } = this.state

    return (
      <Root>
        <FlexContainer>
          <HorizontalLine />
          <Button onClick={this.handleClick}>
            {open ? "Show Less" : "Show More"}
            {open ? <ChevronUp /> : <ChevronDown />}
          </Button>
          <HorizontalLine />
        </FlexContainer>
        <Content className={open ? "" : "collapsed"}>{children}</Content>
      </Root>
    )
  }
}
