import React, { useState } from 'react';
import CustomSlider from "../../components/CustomSlider";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  border: 2px solid #333; /* Цвет бордера */
  border-radius: 20px;
  overflow: hidden;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 20px;
  border: none;
  background-color: ${({ active }) => (active ? '#fff' : '#000')}; /* Цвет фона вкладки */
  color: ${({ active }) => (active ? '#000' : '#fff')}; /* Цвет текста вкладки */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-radius 0.3s, z-index 0.3s;
  font-size: 16px;
  font-weight: 500;
  border-radius: ${({ active }) => (active ? '50px' : '0')};
  z-index: ${({ active }) => (active ? 1 : 0)};

  &:not(:first-child) {
    margin-left: -2px; /* Убираем двойной бордер между кнопками */
  }

  &:focus {
    outline: none; /* Убираем стандартную подсветку при фокусе */
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#fff' : '#000')}; /* Цвет фона при наведении */
  }
`;

const TabSwitcher: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Доклады и сообщения');

  const tabs = ['Доклады и сообщения', 'Техника', 'Закрытый раздел'];

  return (
    <div className="products" id="products">
        <Container>
        <TabContainer>
            <Tab
            active={activeTab === 'Доклады и сообщения'}
            onClick={() => setActiveTab('Доклады и сообщения')}
            >
            Доклады и сообщения
            </Tab>
            <Tab
            active={activeTab === 'Техника'}
            onClick={() => setActiveTab('Техника')}
            >
            Техника
            </Tab>
            <Tab
            active={activeTab === 'Закрытый раздел'}
            onClick={() => setActiveTab('Закрытый раздел')}
            >
            Закрытый раздел
            </Tab>
        </TabContainer>
        </Container>
        <h2>
            Вавилонская библиотека
        </h2>
        <CustomSlider />
    </div>
  );
};

export default TabSwitcher;