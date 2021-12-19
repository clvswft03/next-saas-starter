import React, { useState } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components';

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
// This is no longer required for the scrollOverflow option.

const pluginWrapper = () => {
  /*
   * require('../static/fullpage.scrollHorizontally.min.js'); // Optional. Required when using the "scrollHorizontally" extension.
   */
};

interface OriginalPage {
  text: string;

  // OPTIONAL
  id?: string;
}

const originalColors = [
    `#ff5f45`,
    `#0798ec`,
    `#fc6c7c`,
    `#435b71`,
    `orange`,
    `blue`,
    `purple`,
    `yellow`,
  ],
  originalPages: OriginalPage[] = [
    { text: `Section 1` },
    { text: `Section 2` },
    { text: `Section 3` },
  ];

const Hooks = () => {
  const [sectionsColor, setsectionsColor] = useState([...originalColors]),
    [fullpages, setfullpages] = useState([...originalPages]);

  const onLeave = (origin: unknown, destination: unknown, direction: unknown) => {
      console.log(`onLeave`, { origin, destination, direction });
      // arguments are mapped in order of fullpage.js callback arguments do something
      // with the event
    },
    handleChangeColors = () => {
      const newColors =
        sectionsColor[0] === `yellow` ? [...originalColors] : [`yellow`, `blue`, `white`];
      return setsectionsColor(newColors);
    },
    handleAddSection = () => {
      const { length } = fullpages;
      fullpages.push({
        text: `section ${length + 1}`,
        id: Math.random().toString(),
      });
      return setfullpages([...fullpages]);
    },
    handleRemoveSection = () => {
      const newPages = [...fullpages];
      newPages.pop();
      return setfullpages(newPages);
    },
    moveSectionDown = () => {
      return fullpage_api.moveSectionDown();
    };

  const Section = ({ text }: OriginalPage) => (
    <StyledSection>
      <h1>{text}</h1>
    </StyledSection>
  );

  const Menu = () => (
    <StyledMenu>
      <ul className="actions">
        <li>
          <button onClick={handleAddSection}> Add Section </button>
          <button onClick={handleRemoveSection}> Remove Section </button>
          <button onClick={handleChangeColors}> Change background colors </button>
          <button onClick={moveSectionDown}> Move Section Down </button>
        </li>
      </ul>
    </StyledMenu>
  );

  const Container = styled.div`
    display: relative;
    margin: 0;
    padding: 0;
  `;

  const StyledSection = styled.div.attrs(() => ({
    className: 'section',
  }))`
    text-align: center;
    font-size: 4em;
    color: #fff;
  `;

  const StyledMenu = styled.div.attrs(() => ({
    className: 'menu',
  }))`
    position: fixed;
    top: 100px;
    z-index: 100;

    ul {
      list-style-type: none;
    }

    button {
      padding: 0.93em 1.87em;
      background: #35495e;
      border-radius: 5px;
      border: 0;
      color: #fff;
      margin: 7px;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        background: #fff;
        color: #35495e;
      }
    }
  `;

  return (
    <div className="App">
      <Container>
        <Menu />
        <ReactFullpage
          navigation
          pluginWrapper={pluginWrapper}
          onLeave={onLeave}
          scrollHorizontally={true}
          sectionsColor={sectionsColor}
          render={
            () => (
              // console.log(`render prop change`) || (
              <ReactFullpage.Wrapper>
                {fullpages.map(({ text }) => (
                  <Section key={text} text={text} />
                ))}
              </ReactFullpage.Wrapper>
            )
            // )
          }
        />
      </Container>
    </div>
  );
};

export default Hooks;
